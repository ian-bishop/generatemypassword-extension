# Contributing

Thanks for helping improve GenerateMyPassword.

## Issues and proposals

Before opening a new issue, search [existing issues](https://github.com/ian-bishop/generatemypassword-extension/issues). Include browser version, extension version, steps to reproduce, expected behavior, and observed behavior. **Never include real passwords, recovery codes, or sensitive personal data.**

For larger features, open a discussion through an issue before implementing a change.

## Local checks

1. Clone the repository and install it as an unpacked extension from `chrome://extensions`.
2. Make a focused change. Keep generation entirely local and preserve the minimal-permissions design.
3. Run `npm test` (no npm dependencies are needed).
4. Test both random-password and passphrase modes manually.
5. Submit a pull request explaining what changed and how it was tested.

Code changes should use `crypto.getRandomValues()` for secure randomness, avoid introducing external network dependencies or tracking, and keep the EFF wordlist validation intact.

For potential vulnerabilities, follow [SECURITY.md](SECURITY.md) rather than opening a public issue.
