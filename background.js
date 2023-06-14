// background.js
chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
        if (changeInfo.url && changeInfo.url.includes('reddit.com')) {
            let redirectUrl = encodeURIComponent(changeInfo.url);
            chrome.tabs.update(tabId, {url: chrome.runtime.getURL('redirect.html?redirectUrl=' + redirectUrl)});
        }
    }
);
