var targetPages = ["https://www.youtube.com/watch*"];

function openInMpv(requestDetails) {
  if (requestDetails.type === "xmlhttprequest") {
    browser.runtime.sendNativeMessage("mpv", requestDetails.url);
    return { cancel: true };
  }
}

browser.webRequest.onBeforeRequest.addListener(openInMpv, { urls: targetPages }, ["blocking"]);
