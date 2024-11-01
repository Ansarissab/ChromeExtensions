// CSS to blur messages, images, and documents
const blurCSS = `
  .blurred-content {
    filter: blur(8px);
    transition: filter 0.05s;
  }
  .blurred-content:hover {
    filter: none;
  }
`;

// Add style element to the page
const style = document.createElement("style");
style.innerHTML = blurCSS;
document.head.appendChild(style);

// Function to apply or remove the blur class based on user settings
function toggleBlur(settings) {
  const { blurMessagesEnabled, blurImagesEnabled, blurDocumentsEnabled, blurSidebarEnabled } = settings;

  const messages = document.querySelectorAll("[data-pre-plain-text]");
  const chatImages = document.querySelectorAll("img[src^='blob:']");
  const documents = document.evaluate("//div[starts-with(@title, 'Download')]/parent::div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  const sidebarMessages = document.querySelectorAll("#pane-side span[dir='ltr'], #pane-side span[dir='auto']:not([title])");

  messages.forEach((msg) => {
    if (blurMessagesEnabled) msg.classList.add("blurred-content");
    else msg.classList.remove("blurred-content");
  });

  chatImages.forEach((img) => {
    if (blurImagesEnabled) img.classList.add("blurred-content");
    else img.classList.remove("blurred-content");
  });

  for (let i = 0; i < documents.snapshotLength; i++) {
    const doc = documents.snapshotItem(i);
    if (blurDocumentsEnabled) doc.classList.add("blurred-content");
    else doc.classList.remove("blurred-content");
  }

  sidebarMessages.forEach((msg) => {
    if (blurSidebarEnabled) msg.classList.add("blurred-content");
    else msg.classList.remove("blurred-content");
  });
}

// Function to observe the sidebar container once it’s available
function observeSidebar() {
  const sidebarContainer = document.querySelector("#pane-side");

  if (sidebarContainer) {
    const sidebarObserver = new MutationObserver(() => {
      chrome.storage.sync.get(["blurMessagesEnabled", "blurImagesEnabled", "blurDocumentsEnabled", "blurSidebarEnabled"], toggleBlur);
    });
    sidebarObserver.observe(sidebarContainer, { childList: true, subtree: true });
  } else {
    // Retry if sidebar is not yet loaded
    setTimeout(observeSidebar, 500);
  }
}

// Observe for changes in the chat container
const chatObserver = new MutationObserver(() => {
  chrome.storage.sync.get(["blurMessagesEnabled", "blurImagesEnabled", "blurDocumentsEnabled", "blurSidebarEnabled"], toggleBlur);
});

const chatContainer = document.querySelector("#pane-side") || document.body;
chatObserver.observe(chatContainer, { childList: true, subtree: true });
observeSidebar();

// Apply initial blur setting
chrome.storage.sync.get(["blurMessagesEnabled", "blurImagesEnabled", "blurDocumentsEnabled", "blurSidebarEnabled"], toggleBlur);
