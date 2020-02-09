# from bash:
#   source protozen-js/def-jake-helper.bash

function jake() {
  ORIG="`pwd`"
  while [ ! -f jake ]
  do
    cd ..
    if [ "`pwd`" == '/' ];
     then
      echo "Not in a protozen working directory"
      return
    fi
  done
  ROOT="`pwd`"
  cd "$ORIG"
  "$ROOT/jake" $@
}
