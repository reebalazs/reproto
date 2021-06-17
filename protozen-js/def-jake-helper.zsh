# from zsh:
#   source protozen-js/def-jake-helper.zsh

function jake_func() {
  ORIG="`pwd`"
  while [[ ! -f jake ]]
  do
    cd ..
    if [[ "`pwd`" == '/' ]] then
      echo "Not in a jake working directory"
      cd "$ORIG"
      return
    fi
  done
  ROOT="`pwd`"
  cd "$ORIG"
  "$ROOT/jake" $@
}
alias jake='noglob jake_func'
