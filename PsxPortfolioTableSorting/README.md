### Pakistan Stock Exchange PSX Portfolio Table Sorter Chrome Extension

---

#### Description

This Chrome extension enhances the user experience on the **PSX Portfolio** page by adding sorting functionality to the table. Users can easily sort each column in ascending or descending order with just a click. The extension works for all column types, whether they contain text, numbers, or percentages.

---

#### Features

- **Seamless Sorting**: Adds sorting functionality to all columns (text, numbers, percentages) of the portfolio table.
- **Automatic Detection**: Automatically detects when the table is loaded and enables sorting without any user intervention.
- **Easy to Use**: Just click on any table header to sort that column. Click again to toggle between ascending and descending order.

---

#### How It Works

1. **No Popup**: This extension does not require any popup or interaction from the user. It silently waits for the portfolio table to load.
2. **Automatic Column Type Detection**: The extension intelligently detects whether a column contains text, numbers, or percentages and sorts accordingly.
3. **Table Monitoring**: The extension uses a `MutationObserver` to detect when the portfolio table becomes available and automatically enables the sorting functionality.
4. **Interactive Sorting**: Click any header in the table to sort by that column. The table content will be sorted either numerically or lexicographically depending on the data type in that column.

---

#### Installation

1. Download the source code of the extension.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode** (top right corner).
4. Click on **Load Unpacked** and select the folder containing the extension files.
5. The extension will be installed and automatically start working on `https://dps.psx.com.pk/portfolio`.

---

#### How to Use

1. Visit the **Portfolio** page on [PSX DPS](https://dps.psx.com.pk/portfolio).
2. Once the page fully loads, click on any column header in the portfolio table to sort the data.
   - **Ascending Sort**: Click once to sort the column in ascending order.
   - **Descending Sort**: Click again to toggle sorting to descending order.

---

#### Technical Details

- **Content Script**: The extension runs a `content.js` file that:

  - Waits for the portfolio table to load using a `MutationObserver`.
  - Adds click event listeners to all table headers, enabling column sorting.
  - Detects whether the column contains text, numbers, or percentages and sorts accordingly.

- **Sorting Logic**: The sorting function checks the content type of the cells in the column (e.g., numeric values are sorted numerically, text values alphabetically). The table is re-rendered after sorting to ensure the data is displayed correctly.

---

#### License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details. [Meet The Author](https://github.com/Ansarissab)

---
