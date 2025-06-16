#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-27990-1a47e4f8/webtictactoe_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

