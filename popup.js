// document.getElementById('run').addEventListener('click', function() {
//   var code = document.getElementById('code').value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, { code: code });
//   });
// });

// Retrieve the stored code and set it in the textarea on popup open
// chrome.storage.sync.get(['code'], function(result) {
//   if (result.code) {
//     document.getElementById('code').value = result.code;
//   }
// });

// // Save the entered code to storage
// document.getElementById('run').addEventListener('click', function() {
//   var code = document.getElementById('code').value;
//   chrome.storage.sync.set({ 'code': code });
//   executeCode(code);
// });

// // Execute the code in the currently active tab
// function executeCode(code) {
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.executeScript(tabs[0].id, { code: code });
//   });
// }
// Retrieve the stored code and auto-run status
chrome.storage.sync.get(["code", "autoRun"], function (result) {
  if (result.code) {
    document.getElementById("editing").value = result.code;
    update(result.code)
  }
  document.getElementById("autoRun").checked = result.autoRun || false;
  if (result.autoRun) {
    executeCode(result.code);
  }
});

// Save the entered code and auto-run status to storage
document.getElementById("run").addEventListener("click", function () {
  var code = document.getElementById("editing").value;
  var autoRun = document.getElementById("autoRun").checked;
  chrome.storage.sync.set({ code: code, autoRun: autoRun });
  if (autoRun) {
    executeCode(code);
  }
});

document.getElementById("save").addEventListener("click", function () {
  var code = document.getElementById("editing").value;
  var autoRun = document.getElementById("autoRun").checked;
  chrome.storage.sync.set({ code: code, autoRun: autoRun });
});

// Execute the code in the currently active tab
function executeCode(code) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { code: code });
  });
}

var editingTextarea = document.getElementById("editing");

editingTextarea.addEventListener("input", function () {
  update(this.value);
  sync_scroll(this);
});

editingTextarea.addEventListener("scroll", function () {
  sync_scroll(this);
});

editingTextarea.addEventListener("keydown", function (event) {
  check_tab(this, event);
});

function update(text) {
  let result_element = document.querySelector("#highlighting-content");
  // Handle final newlines (see article)
  if (text[text.length - 1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text
  // Syntax Highlight
  Prism.highlightElement(result_element);
}

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector("#highlighting");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
  let code = element.value;
  if (event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}
