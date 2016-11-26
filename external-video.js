var targetPages = ["https://www.youtube.com/watch*"];

function closeTab(data) {
  if (!data.active) {
    browser.tabs.remove(data.id)
  }
}

function openInMpv(requestDetails) {
  if (requestDetails.type === "main_frame") {
    browser.runtime.sendNativeMessage("mpv", requestDetails.url + " --force-window=immediate --pause");

    querying = browser.tabs.get(requestDetails.tabId)
    querying.then(closeTab);

    return { cancel: true };
  }
}

browser.webRequest.onBeforeRequest.addListener(openInMpv, { urls: targetPages }, ["blocking"]);
