var targetPages = ["https://www.youtube.com/watch*"];
var settings = {};

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

  if (requestDetails.type === "main_frame") {
    var command = `${requestDetails.url} --force-window=immediate ${settings.args}`;

    browser.runtime.sendNativeMessage("mpv", command);

    var querying = browser.tabs.get(requestDetails.tabId);
    querying.then(closeTab);

    return { cancel: true };
  }
}

browser.storage.onChanged.addListener(restoreSettings);
browser.webRequest.onBeforeRequest.addListener(openInMpv, { urls: targetPages }, ["blocking"]);

restoreSettings();
