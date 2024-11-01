// Function to sort the table by a specific column index
function sortTableByColumn(table, columnIndex, header) {
  const rows = Array.from(table.querySelectorAll("tbody tr"));
  const isNumericColumn = checkIfNumericColumn(rows, columnIndex);

  const sortedRows = rows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll("td")[columnIndex].innerText.trim();
    const cellB = rowB.querySelectorAll("td")[columnIndex].innerText.trim();

    // Sorting based on the type of column (numeric or text)
    if (isNumericColumn) {
      const numA = parseFloat(cellA.replace(/[%$,]/g, "")) || 0;
      const numB = parseFloat(cellB.replace(/[%$,]/g, "")) || 0;
      return numA - numB;
    } else {
      return cellA.localeCompare(cellB);
    }
  });

  // Toggle sort direction
  if (header.classList.contains("ascending")) {
    sortedRows.reverse();
    header.classList.remove("ascending");
    header.classList.add("descending");
  } else {
    header.classList.remove("descending");
    header.classList.add("ascending");
  }

  // Append sorted rows back to the table
  const tbody = table.querySelector("tbody");
  sortedRows.forEach((row) => tbody.appendChild(row));
}

// Check if the column is numeric by looking at the content of the first row
function checkIfNumericColumn(rows, columnIndex) {
  const firstCell = rows[0].querySelectorAll("td")[columnIndex].innerText.trim();
  return !isNaN(parseFloat(firstCell.replace(/[%$,]/g, "")));
}

// Function to add click events to table headers for sorting
function addTableSorting(table) {
  const headers = table.querySelectorAll("th");
  headers.forEach((header, index) => {
    header.addEventListener("click", () => {
      sortTableByColumn(table, index, header); // Pass header to sortTableByColumn
    });
  });
}

// Use MutationObserver to wait for the table to load
const observer = new MutationObserver(() => {
  const tableDiv = document.getElementById("portfolioTableTabs");

  if (tableDiv) {
    const table = tableDiv.querySelector("table");

    if (table) {
      // Once the table is found, add sorting functionality and stop observing
      addTableSorting(table);
      observer.disconnect(); // Stop observing since we found the table
    }
  }
});

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
