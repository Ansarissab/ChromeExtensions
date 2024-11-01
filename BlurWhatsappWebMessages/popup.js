document.addEventListener("DOMContentLoaded", () => {
  const blurMessages = document.getElementById("blur-messages");
  const blurImages = document.getElementById("blur-images");
  const blurDocuments = document.getElementById("blur-documents");
  const blurSidebar = document.getElementById("blur-sidebar");
  const enableAllButton = document.getElementById("enable-all");

  // Load current settings
  chrome.storage.sync.get({ blurMessagesEnabled: false, blurImagesEnabled: false, blurDocumentsEnabled: false, blurSidebarEnabled: false }, (settings) => {
    blurMessages.checked = settings.blurMessagesEnabled;
    blurImages.checked = settings.blurImagesEnabled;
    blurDocuments.checked = settings.blurDocumentsEnabled;
    blurSidebar.checked = settings.blurSidebarEnabled;
  });

  // Add change event listener for all checkboxes
  [blurMessages, blurImages, blurDocuments, blurSidebar].forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateSettingsAndNotify();
    });
  });

  // Add click event listener for "Enable All" button
  enableAllButton.addEventListener("click", () => {
    blurMessages.checked = true;
    blurImages.checked = true;
    blurDocuments.checked = true;
    blurSidebar.checked = true;
    updateSettingsAndNotify();
  });

  // Function to update settings and notify content script
  function updateSettingsAndNotify() {
    const isEnabledMessages = blurMessages.checked;
    const isEnabledImages = blurImages.checked;
    const isEnabledDocuments = blurDocuments.checked;
    const isEnabledSidebar = blurSidebar.checked;

    chrome.storage.sync.set({
      blurMessagesEnabled: isEnabledMessages,
      blurImagesEnabled: isEnabledImages,
      blurDocumentsEnabled: isEnabledDocuments,
      blurSidebarEnabled: isEnabledSidebar,
    });

    // Send message to content script to apply changes
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          toggleBlur(isEnabledMessages, isEnabledImages, isEnabledDocuments, isEnabledSidebar);
        },
      });
    });
  }
});
