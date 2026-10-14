# Chrome Web Store Submission

This document contains the dashboard values for GenerateMyPassword v1.2.0. Keep these answers aligned with the packaged extension and the published privacy policy.

## Package

- Version: `1.2.0`
- Release ZIP: `generatemypassword-extension-v1.2.0.zip`
- GitHub release: <https://github.com/ian-bishop/generatemypassword-extension/releases/tag/v1.2.0>
- SHA-256: `f2bc516519a9dc778ac199651e36872387d33fb955eb64cec0db39a70d988375`

## Store listing

### Item title

GenerateMyPassword - Secure Password Generator

### Summary

Generate secure random passwords and EFF passphrases locally, with no tracking, accounts, or password history.

The summary is 110 characters, below the Chrome Web Store's 132-character limit.

### Detailed description

GenerateMyPassword creates secure random passwords and EFF Diceware passphrases directly on your device. Open the extension from the Chrome toolbar, choose your settings, and generate a new value without sending it to a server.

Features:

- Generate random passwords from 8 to 128 characters
- Choose lowercase letters, uppercase letters, numbers, and symbols
- Exclude ambiguous characters such as 0, O, 1, l, and I
- Generate four-, five-, six-, or eight-word passphrases
- Use the bundled 7,776-word EFF Large Wordlist
- View an entropy estimate and strength indicator
- Copy a generated value directly to the clipboard
- Remember generator preferences locally between uses

Privacy by design:

- Passwords and passphrases are generated locally with the Web Crypto API
- Generated values are not transmitted or saved
- No password history, account, analytics, advertising, or browsing tracking
- No extension permissions or host permissions requested
- No remotely hosted code or runtime dependencies

GenerateMyPassword is a generator, not a password manager. Save each generated credential in a trusted password manager and use a unique password for every account.

### Category and language

- Category: Productivity
- Language: English
- Mature content: No

### URLs

- Homepage: <https://generatemypassword.com/>
- Privacy policy: <https://generatemypassword.com/privacy/>
- Support: <https://unitedinternetventures.com/#contact>
- Official URL: `https://generatemypassword.com/` after domain ownership is verified in Google Search Console

### Graphic assets

- Store icon: `icons/icon128.png`
- Screenshot 1: `store-assets/screenshots/password-generator-1280x800.png`
- Screenshot 2: `store-assets/screenshots/passphrase-generator-1280x800.png`
- Small promo tile: `store-assets/promotional/small-promo-440x280.png`
- Promotional video: none
- Marquee image: none; optional

## Privacy practices

### Single purpose description

Generate secure random passwords and passphrases locally on the user's device.

### Permissions justification

The extension requests no Chrome permissions, optional permissions, or host permissions. The dashboard should therefore show no permission-justification fields.

### Remote code

Select: **No, I am not using remote code.**

All executable JavaScript is included in the uploaded extension package. The extension does not download or execute remote scripts, WebAssembly, or other remote code.

### Data usage

Select no collected-data categories.

The extension does not collect, transmit, sell, or share user data. It generates passwords and passphrases in the popup and does not send or save generated values. It stores only generator preferences—such as password length, character options, passphrase settings, and mode—in local extension storage on the user's device. Those preferences do not leave the device and do not contain generated passwords, passphrases, or clipboard contents.

Complete all required policy certifications truthfully. The implementation satisfies the certifications because it does not sell or transfer user data, use data for unrelated purposes, use data for creditworthiness or lending, or permit human access to user data.

### Privacy policy URL

<https://generatemypassword.com/privacy/>

The relevant section is **Chrome Extension Privacy**.

## Distribution

- Visibility: Public
- Regions: All supported regions
- Pricing: Free

## Test instructions

No account, credentials, special hardware, or external service is required.

1. Install the extension and pin it to the Chrome toolbar if desired.
2. Open the extension popup. Confirm that a password is generated.
3. Change the length or character options and confirm that the result updates.
4. Select the Passphrase tab and confirm that a six-word passphrase is generated from the bundled wordlist.
5. Select Copy and confirm that the generated value is copied.
6. Close and reopen the popup. Confirm that generator preferences remain selected and that the previous generated value is not restored.

Network access is not required for password or passphrase generation. The Website link is the only external navigation and opens only after a user selects it.

## Submission checklist

- Upload the ZIP from the v1.2.0 GitHub release.
- Confirm the detected version is `1.2.0`.
- Paste the listing text exactly as reviewed above.
- Upload the 128-pixel icon, both screenshots, and the small promo tile.
- Complete the Privacy practices fields using the answers above.
- Confirm the public privacy-policy URL loads successfully.
- Choose public, free, worldwide distribution.
- Add the test instructions if the dashboard requests them.
- Review the draft listing for consistency before selecting **Submit for Review**.
