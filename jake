#! /bin/sh

ORIG="`pwd`"
cd "$(dirname $0)/protozen-js"
FRONTEND_ROOT="`pwd`"
test -e "`yarn bin jake 2>/dev/null`" -a -f "$FRONTEND_ROOT/packages/service/dist/proto.js" || ( \
  echo "Installing dependencies on the first run..."; \
  npm install --global yarn; \
  yarn install; \
  JAKE="`yarn bin jake`"; \
  NODE_PATH="$FRONTEND_ROOT/node_modules" FRONTEND_ROOT="$FRONTEND_ROOT" $JAKE protoc --jakefile "$FRONTEND_ROOT/Jakefile" \
  )
JAKE="`yarn bin jake`"
cd "$ORIG"
NODE_PATH="$FRONTEND_ROOT/node_modules" FRONTEND_ROOT="$FRONTEND_ROOT" $JAKE $@ --jakefile "$FRONTEND_ROOT/Jakefile"
