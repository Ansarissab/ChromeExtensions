// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadProfileImage") {
    // Extract the username from the URL
    const urlPath = window.location.pathname.split("/");
    const username = urlPath[1]; // assuming URL is like https://www.instagram.com/username/

    if (username) {
      // Use XPath to find the image
      const xpath = `//img[contains(@alt, '${username}')]`;
      const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
      const profileImage = result.singleNodeValue;

      if (profileImage) {
        const imageUrl = profileImage.src;
        // Send the image URL and username to the background script
        chrome.runtime.sendMessage({ action: "downloadImage", imageUrl, username });
      } else {
        alert("Profile image not found.");
      }
    } else {
      alert("Unable to extract username from the URL.");
    }
  }
});
