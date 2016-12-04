# external-video

## Requirements

* mpv < [https://mpv.io](https://mpv.io/) >
* youtube-dl < [https://rg3.github.io/youtube-dl/](https://rg3.github.io/youtube-dl/)>

and Python probably 

## Setup

You need to copy `mpv.json` and `mpv.py` so the addon can use the [Native Messaging API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging)

`mpv.json` is a manifest to tell Firefox where the python script is located.

`mpv.py` is a dumb script that just launch `mpv` with some args

I made a small bash script to make things easier :

`git clone https://github.com/vayan/external-video`

`cd external-video/app`

`./install.sh`

## Todo

see https://github.com/vayan/external-video/issues

## Downloads

Available on Firefox: https://addons.mozilla.org/en-US/firefox/addon/external-video/
