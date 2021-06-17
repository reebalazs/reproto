# from bash:
#   source protozen-js/def-jake-helper.bash

function jake() {
  ORIG="`pwd`"
  while [ ! -f jake ]
  do
    cd ..
    if [ "`pwd`" == '/' ];
     then
      echo "Not in a jake working directory"
      cd "$ORIG"
      return
    fi
  done
  ROOT="`pwd`"
  cd "$ORIG"
  "$ROOT/jake" $@
}
