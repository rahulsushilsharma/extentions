// Execute the code in the content script context
function executeCode(code) {
  eval(code);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'executeCode') {
    chrome.storage.sync.get('code', function(result) {
      if (result.code) {
        executeCode(result.code);
      }
    });
  }
});
// Retrieve the stored code and auto-run status
chrome.storage.sync.get(['code', 'autoRun'], function(result) {
  if (result.autoRun && result.code) {
    executeCode(result.code);
  }
});
