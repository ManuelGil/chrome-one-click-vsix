# One-Click VSIX

![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-One--Click%20VSIX-blue?style=for-the-badge&logo=googlechrome)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/chrome-one-click-vsix?style=for-the-badge&logo=github)](https://github.com/ManuelGil/chrome-one-click-vsix)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/chrome-one-click-vsix?style=for-the-badge&logo=github)](https://github.com/ManuelGil/chrome-one-click-vsix/blob/main/LICENSE)

## Overview

**One-Click VSIX** is a Chrome extension that streamlines the process of downloading `.vsix` packages from the VSCode Marketplace. By injecting a **Download Extension** button on each Marketplace page, it ensures the file is saved as `.vsix`, even if the server identifies it as `.zip`. This saves you from manually renaming files and helps you install extensions directly in VSCode without confusion.

## Index

- [One-Click VSIX](#one-click-vsix)
  - [Overview](#overview)
  - [Index](#index)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Download Button](#download-button)
    - [Renaming Zip to VSIX](#renaming-zip-to-vsix)
  - [Configuration](#configuration)
  - [Support](#support)
  - [Feedback](#feedback)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [License](#license)

## Features

- **One-Click Download:**
  Automatically injects a button labeled **Download Extension** on VSCode Marketplace pages.

- **Seamless Renaming:**
  Ensures `.zip` files are renamed to `.vsix`, preventing manual renaming.

- **Lightweight & Modular:**
  Uses minimal permissions, focusing solely on the Marketplace download flow.

- **Modern MV3 Compliance:**
  Built using Chrome Manifest V3 for better performance and security.

- **Zero External Dependencies:**
  Relies only on native browser APIs, no additional libraries required.

## Installation

1. **Download or Clone** this repository.
2. **Build** the extension (e.g., via a bundler or TypeScript compiler) to produce a `dist/` folder.
3. In Chrome, open the **Extensions** page: `chrome://extensions/`.
4. Enable **Developer Mode** (top-right corner).
5. Click **Load unpacked** and select the `dist/` folder.
6. The extension should now appear in your list of Chrome extensions.

## Usage

### Download Button

1. Navigate to any VSCode Marketplace extension page, for example:
   `https://marketplace.visualstudio.com/items?itemName=ms-python.python`
2. Look for the **Download Extension** button next to or below the standard **Install** button.
3. Click **Download Extension** to retrieve the `.vsix` file.

### Renaming Zip to VSIX

- If the Marketplace attempts to serve a `.zip` file, One-Click VSIX forces the download as `.vsix`.
- No manual renaming is required, just save the file and install it in VSCode as you normally would.

## Configuration

Currently, there is no user-facing configuration. All behavior is handled automatically:

- **Button Injection:** Runs on `marketplace.visualstudio.com` pages.
- **File Renaming:** Any `.zip` file recognized from the Marketplace is renamed to `.vsix`.

Future versions may introduce optional settings for advanced users.

## Support

If you experience any issues or have suggestions for improvements, please open an issue in this repository.

## Feedback

Enjoying **One-Click VSIX**? Feel free to leave a star on GitHub or share your feedback to help others discover it.

## Contributing

We welcome contributions from the community! To contribute:

1. **Fork** this repository.
2. **Create** a new branch: `git checkout -b feature/my-new-feature`.
3. **Commit** your changes: `git commit -am 'Add some feature'`.
4. **Push** to your branch: `git push origin feature/my-new-feature`.
5. **Open** a pull request.

Please see our [Contributing Guidelines](./CONTRIBUTING.md) for more details.

## Code of Conduct

We strive to maintain a welcoming and inclusive environment. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in this project.

## Changelog

See the [CHANGELOG.md](./CHANGELOG.md) for a complete list of changes.

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute according to the terms of the license.
