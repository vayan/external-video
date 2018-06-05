#!/usr/bin/python

import sys
import json
import struct
import subprocess
import shlex

def sendMessage(encodedMessage):
    sys.stdout.write(encodedMessage['length'])
    sys.stdout.write(encodedMessage['content'])
    sys.stdout.flush()

def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent)
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

def getMessage():
    rawLength = sys.stdin.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.read(messageLength)
    return json.loads(message)

while True:
    try:
        mpv_args = getMessage()
        if len(mpv_args) > 1:
            args = shlex.split("/usr/local/bin/mpv " + mpv_args)
            sendMessage(encodeMessage("got message!: " + str(args)))
            subprocess.call(args)
    except Exception, ex:
        sendMessage(encodeMessage(str(ex)))
        sys.exit(0)
