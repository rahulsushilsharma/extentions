# Custom Code Runner Chrome Extension

Custom Code Runner is a Chrome extension that allows you to run custom JavaScript code on web pages. You can save your code and choose to run it manually or automatically on every page load.

## Features

- **Run Custom Code:** Enter and execute your JavaScript code in the context of the active tab.
- **Save Code:** Save your code using `chrome.storage` for future use.
- **Auto-Run on Page Load:** Toggle the auto-run feature to execute the saved code automatically on every page load.

## Getting Started



### Installation

1. Clone this repository.

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode."

4. Click "Load unpacked" and select the cloned repository folder.

### Usage

1. Click on the extension icon in the Chrome toolbar.

2. Enter your JavaScript code in the provided textarea.

3. (Optional) Check the "Auto Run" checkbox if you want the code to execute automatically on every page load.

4. Click "Run Code" to execute the code manually.

## Folder Structure

- `icon.png`: Icon for the extension.
- `manifest.json`: Manifest file containing extension details.
- `popup.html`: HTML file for the extension popup.
- `popup.js`: JavaScript file for the extension popup logic.
- `content.js`: JavaScript file injected into web pages to execute code.
- `background.js`: Background script handling auto-run and communication between components.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
