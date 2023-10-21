function handleClick(tab) {
    chrome.tabs.executeScript(null, { file: "jquery-1.8.2.min.js" }, function() {
        chrome.tabs.executeScript(null, { file: "content.js" });
    });
}

chrome.pageAction.onClicked.addListener(handleClick);