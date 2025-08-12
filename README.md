
# Apple Auth POC

This project demonstrates how to implement Apple authentication in a Bun + Elysia server, including generating a client secret and validating tokens as described in the following Apple documentation:

- [Creating a Client Secret](https://developer.apple.com/documentation/accountorganizationaldatasharing/creating-a-client-secret)
- [Generate and Validate Tokens](https://developer.apple.com/documentation/signinwithapplerestapi/generate_and_validate_tokens)

## Checklist

- [x] Bun + Elysia server setup
- [x] Apple client secret generation utility
- [ ] Apple Sign In endpoint implementation
- [ ] Token validation logic
- [ ] Error handling and logging
- [ ] Example usage and test cases

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Open [http://localhost:3000/](http://localhost:3000/) in your browser.

## Apple Client Secret Generation

The utility in `src/utils/appleAuth.ts` generates a JWT client secret required for Apple authentication. See [Apple docs](https://developer.apple.com/documentation/accountorganizationaldatasharing/creating-a-client-secret) for details.

## Token Validation

To validate tokens received from Apple, follow the steps in [Apple docs](https://developer.apple.com/documentation/signinwithapplerestapi/generate_and_validate_tokens). This POC will include:

- Sending the authorization code to Apple’s token endpoint
- Verifying the identity token signature and claims

## Next Steps

- Implement the Sign In endpoint to handle Apple authentication requests
- Add token validation logic
- Improve error handling and add logging
- Provide example requests and test cases