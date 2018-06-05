#!/bin/sh

mkdir -p ~/Library/Application Support/Mozilla/NativeMessagingHosts
cp mpv.json ~/Library/Application Support/Mozilla/NativeMessagingHosts

mkdir -p ~/.config/mozilla/mpv
cp mpv.py ~/.config/mozilla/mpv/
