# Chrome Extension: Input Attribute Modifier PSX

This Chrome extension automatically removes the `readonly` attribute from input fields on specific forms on a webpage, allowing users to edit fields that are otherwise disabled.

## Features

- Removes the `readonly` attribute from the `price` and `fee` inputs in a form with the ID `buyTrade`.
- Observes the DOM for changes and automatically applies the changes once the form is loaded.
- Also observes the form with the ID `createPortfolio` and modifies inputs as necessary.
- Includes error handling for missing elements and logs meaningful error messages to the console.

## How It Works

This extension leverages a `MutationObserver` to detect changes in the webpage's structure. Once the required forms (`buyTrade` and `createPortfolio`) are loaded, the extension removes the `readonly` attribute from specific input fields, making them editable.

### Key Points:

1. **Form Observing**: The extension continuously watches the DOM and waits for the forms to appear before making changes.
2. **Error Handling**: If the inputs or forms are not found, meaningful error messages are logged to the console to aid in debugging.

### Files:

- **content.js**: Contains the logic for observing DOM changes and removing the `readonly` attribute from input fields.
- **manifest.json**: Defines the extension's permissions, background scripts, and content scripts.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top-right corner).
4. Click on **Load unpacked** and select the folder containing the extension's files.
5. The extension is now installed and ready to use!

## Usage

Once the extension is installed and active:

- The extension automatically starts observing the webpage for the forms with IDs `buyTrade` and `createPortfolio`.
- Once these forms are loaded, the extension will remove the `readonly` attribute from the relevant inputs (`price`, `fee`, and `portfolioName` if applicable), allowing users to edit them.

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT). [Meet The Author](https://github.com/Ansarissab)

---
