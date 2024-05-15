// Background script - background.js

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Check if the clicked menu item is the one we added
    if (info.menuItemId === "addToQuoteList") {
      // Open a new tab with the Wikipedia page for the highlighted text
      chrome.tabs.sendMessage(tab.id, {action: "addQuote", selection: info.selectionText});
    }
  });
  
  // Create context menu item
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "addToQuoteList",
      title: "Add to Quote List",
      contexts: ["selection"],
    });
  });
