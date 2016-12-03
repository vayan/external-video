var targetPages = ["https://www.youtube.com/watch*"];
var settings = {};

function openOriginal(info, tab) {
  browser.tabs.create({
    url: info.linkUrl
  });
}

function restoreSettings() {
  function setSettings(data) {
    settings = data;
  }

  var getting = browser.storage.local.get();
  getting.then(setSettings);
}

function openInMpv(requestDetails) {
  function closeTab(data) {
    if (!data.active) {
      browser.tabs.remove(data.id);
    }
  }

  if (requestDetails.type === "main_frame" && requestDetails.originUrl != undefined) {
    var command = `${requestDetails.url} --force-window=immediate ${settings.args}`;

    browser.runtime.sendNativeMessage("mpv", command);

    var querying = browser.tabs.get(requestDetails.tabId);
    querying.then(closeTab);

    return { cancel: true };
  }
}

chrome.contextMenus.create({
  id: "open_original",
  title: "Open without MPV",
  onclick: openOriginal,
  contexts: ["link"]
});

browser.storage.onChanged.addListener(restoreSettings);
browser.webRequest.onBeforeRequest.addListener(openInMpv, { urls: targetPages }, ["blocking"]);

restoreSettings();
