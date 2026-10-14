# GenerateMyPassword Chrome Extension

Generate secure random passwords and EFF Diceware passphrases directly in a Chrome extension popup. Generation happens locally with the Web Crypto API; the extension has no accounts, analytics, advertisements, network services, or password history.

## Features

- Cryptographically secure password generation from 8 to 128 characters
- Lowercase, uppercase, number, symbol, and ambiguous-character controls
- Four-, five-, six-, or eight-word passphrases
- Bundled 7,776-word [EFF Large Wordlist](https://www.eff.org/dice)
- Local preference storage without storing generated values
- Manifest V3 with no requested extension permissions

## Install for development

1. Clone or download this repository.
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose this repository's root directory.

## Validate

The validation script checks the manifest, required assets, wordlist integrity, and privacy-sensitive configuration.

```sh
npm test
```

No npm dependencies are required.

## Create a release ZIP

From the repository root:

```sh
zip -r generatemypassword-extension-v1.2.0.zip \
  manifest.json popup.html popup.js style.css words.json icons
```

Do not include development tools or repository metadata in the Chrome Web Store upload.

## Privacy

Generated passwords and passphrases remain on the device. Generator preferences are stored locally between uses, but generated values and clipboard contents are not saved. See the published [GenerateMyPassword privacy policy](https://generatemypassword.com/privacy/).

Chrome Web Store listing copy, privacy answers, test instructions, and the submission checklist are maintained in [`store-listing/CHROME_WEB_STORE_SUBMISSION.md`](store-listing/CHROME_WEB_STORE_SUBMISSION.md).

## Wordlist

`words.json` is derived from the official EFF Large Wordlist. The source file can be revalidated and installed with:

```sh
python3 tools/install_eff_wordlist.py /path/to/eff_large_wordlist.txt
```

The installer rejects an unexpected code sequence, malformed word, duplicate, or entry count before changing `words.json`.
