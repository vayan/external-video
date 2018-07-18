#!/usr/bin/env python2

import sys
import json
import struct
import subprocess
import shlex


def getMessage():
    rawLength = sys.stdin.read(4)
    if len(rawLength) == 0:
        sys.exit(0)
    messageLength = struct.unpack('@I', rawLength)[0]
    message = sys.stdin.read(messageLength)
    return json.loads(message)


while True:
    mpv_args = getMessage()
    if len(mpv_args) > 1:
        args = shlex.split("mpv " + mpv_args)
        subprocess.call(args)
        sys.exit(0)
