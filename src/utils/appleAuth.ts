
import { SignJWT, jwtVerify, importPKCS8 } from "jose";
import { env } from "../../env";

async function generateClientSecret(): Promise<string> {
  const privateKey = env.APPLE_SIGN_IN_P8;
  const teamId = env.APPLE_TEAM_ID;
  const clientId = env.APPLE_CLIENT_ID; 
  const keyId = env.APPLE_SIGN_IN_KEY_ID;

  const cryptoKey = await importPKCS8(privateKey, 'ES256');

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: keyId })
    .setIssuer(teamId)
    .setAudience('https://appleid.apple.com')
    .setSubject(clientId)
    .setExpirationTime('7d')
    .sign(cryptoKey);

  return token;
}

interface AppleTokenPayload {
  sub: string;
  email: string;
  email_verified: 'true' | 'false';
  is_private_email: 'true' | 'false';
}

interface AppleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
}

export async function verifyAppleToken(code: string) {
  const clientSecret = await generateClientSecret();
  const clientId = env.APPLE_CLIENT_ID;

  try {
    const response = await fetch('https://appleid.apple.com/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
      }).toString(),
    });

    const data = await response.json() as AppleTokenResponse;

    if (!response.ok) {
      return null;
    }

    // Import the public key for verification
    const publicKey = await importPKCS8(env.APPLE_SIGN_IN_PUBLIC_KEY, 'ES256');
    const { payload } = await jwtVerify<AppleTokenPayload>(data.id_token, publicKey);

    return payload;
  } catch {
    return null;
  }
}
