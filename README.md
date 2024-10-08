# WhatsApp Links Extension

This Chrome and Brave extension helps you find and verify WhatsApp group links on any webpage, and it can also be configured to work with other platforms like Telegram and Discord.

## Installation

### Clone the Repository:

```bash
git clone https://github.com/MrPenguine/whatsapp-links-extension.git
```

## Load the Extension in Chrome or Brave:

1. Open Chrome or Brave browser.
2. Go to `chrome://extensions/` for Chrome or `brave://extensions/` for Brave.
3. Enable Developer mode by toggling the switch in the top right corner.
4. Click on the **Load unpacked** button.
5. Select the folder where you cloned the `whatsapp-links-extension` repository.

## Start Using the Extension:

1. Refresh any webpage that you want to scan for WhatsApp group links.
2. The extension will automatically detect and verify the links.
3. Start using the extension!

## How It Works

- **Content Script (content.js)**: Scans webpages for WhatsApp group links and sends them for verification.
- **Background Script (background.js)**: Handles the verification process and manages communication between different parts of the extension.

## Enabling on Other Platforms

To enable the extension to work on platforms like Telegram or Discord:

1. Open the `manifest.json` file in a text editor.
2. Update the `matches` field under `content_scripts` to include the desired URLs. For example:

```json
"matches": ["<all_urls>"]
```

Or for specific platforms:

```json
"matches": ["https://web.whatsapp.com/*", "https://chat.whatsapp.com/*", "https://*.telegram.org/*", "https://*.discord.com/*"]
```
