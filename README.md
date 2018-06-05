# external-video

![crappy demo gif](https://github.com/vayan/external-video/raw/master/demo.gif)

## Requirements

* mpv < [https://mpv.io](https://mpv.io/) >
* youtube-dl < [https://rg3.github.io/youtube-dl/](https://rg3.github.io/youtube-dl/)>

and Python probably

## Setup

You need to copy `mpv.json` and `mpv.py` so the addon can use the [Native Messaging API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging)

`mpv.json` is a manifest to tell Firefox where the python script is located.

`mpv.py` is a dumb script that just launch `mpv` with some args

### Linux

Copy `mpv.json` to `~/.mozilla/native-messaging-hosts/`
Copy `mpv.py` to `/opt/external-video`

### MacOSX

Copy `mpv.json` to `~/Library/Application Support/Mozilla/NativeMessagingHosts/`
Copy `mpv.py` to `/opt/external-video`



## Todo

see https://github.com/vayan/external-video/issues

## Downloads

Available on Firefox: https://addons.mozilla.org/en-US/firefox/addon/external-video/
