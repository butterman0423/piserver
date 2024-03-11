# !/bin/bash

if [[ ! $# -eq 1 ]]; then
    echo "Usage: ./configure.sh <path>"
    exit 1
fi

if [[ ! $1 -d ]]; then
    echo "Error: ${1} must be a valid directory path"
    exit 1
fi

$(node --version)
if [[ $? -gt 0 ]]; then
    echo "Error: node is not found in PATH"
fi

find $1 | node $(pwd)/db_config.mjs