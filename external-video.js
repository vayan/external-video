var targetPages = [
  "*://*.youtube.com/watch*",
  "*://*.twitch.tv/*",
  "*://*.vimeo.com/*",
  "*://*.streamable.com/*",
  "*://*.liveleak.com/view*",
  "*://*.vid.me/*",
  "*://*.funnyordie.com/videos/*",
  "*://*.dailymotion.com/video/*"
];

var settings = {};
var tabsLock = [];

function openOriginal(info, tab) {
  function onCreated(tab) {
    tabsLock.push(tab.id);
    browser.tabs.update(tab.id, {
      url: info.linkUrl
    });
  }

  var creating = browser.tabs.create({});
  creating.then(onCreated);
}

function restoreSettings() {
  function setSettings(data) {
    settings = data;
  }

  var getting = browser.storage.local.get();
  getting.then(setSettings);
}

function onResponse(response) {
  console.log(`Received ${response}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function openInMpv(request) {
  var lockedTabIndex = tabsLock.lastIndexOf(request.tabId);

  function closeTab(data) {
    if (!data.active) {
      browser.tabs.remove(data.id);
    }
  }

  if (request.type === "main_frame" && lockedTabIndex === -1) {
    var command = `${request.url} --force-window=immediate ${settings.args}`;

    var sending = browser.runtime.sendNativeMessage("mpv", command);

    sending.then(onResponse, onError);

    var querying = browser.tabs.get(request.tabId);
    querying.then(closeTab);

    browser.history.addUrl({
      url: request.url
    });

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
