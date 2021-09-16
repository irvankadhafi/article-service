#!/bin/sh


dirName=volumes
if [ -d "$dirName/db" ] || [ -d "$dirName/elasticsearch" ]; then
echo "Directory already exists" ;
else
`mkdir -p $dirName/db`;
`mkdir -p $dirName/elasticsearch`;
echo "$dirName directory is created"
fi
