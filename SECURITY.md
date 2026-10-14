# Security policy

## Reporting a suspected vulnerability

**Do not disclose an exploitable vulnerability in a public issue.** Check the repository's **Security** tab for a private vulnerability reporting option, if enabled. Otherwise, use the project's [official support contact form](https://unitedinternetventures.com/#contact) to request a private reporting channel. Do not include passwords, recovery codes, or other secrets in the initial message.

Please provide the affected extension version, a minimal reproduction, potential impact, and relevant browser/environment details.

## Design boundaries

- Passwords and passphrases are generated locally within the extension popup.
- The extension does not request host permissions.
- The bundled EFF wordlist supports offline passphrase generation.
- Generated values must not be added to telemetry, logs, or persistent storage.

These properties are design goals and implementation claims, **not a claim of formal security certification or an external audit**. For details, see the [README](README.md) and the [published privacy policy](https://generatemypassword.com/privacy/).
