document.getElementById("downloadBtn").addEventListener("click", () => {
  // Send a message to the active tab to download the image
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "downloadProfileImage" });
  });
});
