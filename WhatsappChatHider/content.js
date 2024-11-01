const sidebar = document.querySelector("div#side");
const buttonContainer = document.createElement("div");
const button = document.createElement("button");

buttonContainer.classList.add("sidebar-toggle-container");
button.classList.add("sidebar-toggle-button");

// Set initial button text and sidebar visibility based on preference (optional)
let isSidebarHidden = false; // Change to true to hide sidebar initially

if (isSidebarHidden) {
  sidebar.style.display = "none";
  button.textContent = ">";
} else {
  button.textContent = "<";
}

buttonContainer.appendChild(button);
document.body.appendChild(buttonContainer);

button.addEventListener("click", () => {
  const sidebar = document.querySelector("div#side");

  isSidebarHidden = !isSidebarHidden;
  if (isSidebarHidden) {
    sidebar.style.display = "none";
    sidebar.parentNode.style.display = "none";
    button.textContent = ">";
  } else {
    sidebar.style.display = ""; // Reset to default style
    sidebar.parentNode.style.display = "";
    button.textContent = "<";
  }
});
