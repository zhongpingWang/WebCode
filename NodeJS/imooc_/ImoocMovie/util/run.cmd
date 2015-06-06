cd ..

:start "" "c:\Program Files\MongoDB 2.6 Standard\bin\mongod.exe" --dbpath d:\Data\mongodb --rest
:start "" "c:\Program Files\MongoDB 2.6 Standard\bin\mongo.exe"

start util\mongod.cmd
start util\mongo.cmd
start node-inspector
start nodemon --debug app