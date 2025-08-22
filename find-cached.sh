#!/bin/bash

COMMIT=$(git rev-parse HEAD | tr -d "\n")
CACHE_FILE=/tmp/$COMMIT.files
JUMP_FILE=/tmp/find-cached.file

FD_EXECUTABLE=fd
if ! command -v $FD_EXECUTABLE >/dev/null 2>&1
then
  FD_EXECUTABLE=fdfind
fi

if [ ! -f "$CACHE_FILE" ]; then
  $FD_EXECUTABLE -t f > "$CACHE_FILE"
fi

# "|| :" is used to return happy 0 return code, or else it spams vscode dialogs
fzf < "$CACHE_FILE" > "$JUMP_FILE" || :
