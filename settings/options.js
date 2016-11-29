function saveOptions(e) {
  browser.storage.local.set({
    args: document.querySelector("#args").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#args").value = result.args || "--pause --ytdl-format='bestvideo[height<=?1080]+bestaudio/best'";
  }

  var getting = browser.storage.local.get("args");
  getting.then(setCurrentChoice);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
