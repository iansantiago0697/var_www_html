#!/bin/sh
git status | grep -i '.DS_Store' | awk '{print $1}' | xargs rm
