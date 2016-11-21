#!/usr/bin/env python

# and add mpv.json to ~/.mozilla/native-messaging-hosts
import sys, json, struct, subprocess

# Read a message from stdin and decode it.
def getMessage():
  rawLength = sys.stdin.read(4)
  if len(rawLength) == 0:
      sys.exit(0)
  messageLength = struct.unpack('@I', rawLength)[0]
  message = sys.stdin.read(messageLength)
  return json.loads(message)

# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
  encodedContent = json.dumps(messageContent)
  encodedLength = struct.pack('@I', len(encodedContent))
  return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout
def sendMessage(encodedMessage):
  sys.stdout.write(encodedMessage['length'])
  sys.stdout.write(encodedMessage['content'])
  sys.stdout.flush()

while True:
  mpv_args = getMessage()
  if (len(mpv_args) > 1):
      subprocess.call(["mpv", mpv_args])
