// Background script - background.js

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Check if the clicked menu item is the one we added
    if (info.menuItemId === "searchOnWikipedia") {
      // Open a new tab with the Wikipedia page for the highlighted text
      chrome.tabs.create({ url: "https://en.wikipedia.org/wiki/" + encodeURIComponent(info.selectionText) });
    }
  });
  
  // Create context menu item
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "searchOnWikipedia",
      title: "Search on Wikipedia",
      contexts: ["selection"] // Show menu item only when text is selected
    });
  });
  