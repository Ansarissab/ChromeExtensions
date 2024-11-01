// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImage") {
    const imageUrl = request.imageUrl;
    const username = request.username; // Assuming you are sending the username along with the imageUrl

    // Get the current date and time in a human-readable format: "DD-MM-YYYY_HH-MM-SS"
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // Format: "username_25-09-2024_14-30-15_profile_image.jpg"
    const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}-${seconds}`;

    // Create the filename with username, date, and profile_image
    const filename = `${username}_${formattedDate}_profile_image.jpg`;

    // Download the image with the generated filename
    chrome.downloads.download(
      {
        url: imageUrl,
        filename: filename,
        saveAs: true,
      },
      () => {
        console.log("Download started with filename:", filename);
      }
    );
  }
});
