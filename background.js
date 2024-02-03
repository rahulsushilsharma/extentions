// Listen for changes in auto-run status
chrome.storage.onChanged.addListener(function(changes) {
  if (changes.autoRun) {
    // If auto-run is enabled, execute the code in the currently active tab
    if (changes.autoRun.newValue) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'executeCode' });
      });
    }
  }
});
