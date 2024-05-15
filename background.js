chrome.runtime.onInstalled.addListener(() => {
  console.log('Quote Collector installed');
});

chrome.contextMenus.create({
  id: 'addQuote',
  title: 'Add to Quote List',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'addQuote') {
    saveQuote(info.selectionText);
  }
});

function saveQuote(quote) {
  chrome.storage.sync.get(['quotes'], (result) => {
    const quoteList = result.quotes || [];
    quoteList.push(quote);
    chrome.storage.sync.set({ 'quotes': quoteList }, () => {
      console.log('Quote added: ', quote);
    });
  });
}
