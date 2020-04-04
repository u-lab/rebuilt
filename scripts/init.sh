#!/bin/bash
sudo chown ec2-user:ec2-user /home/ec2-user/rebuilt
cp -r /home/ec2-user/rebuilt/components/ /home/ec2-user/
cd /home/ec2-user/rebuilt
cp .env.example .env
result=`ps aux | grep node | head -n 1`
list=(${result// / })
num=${list[1]}
echo `kill -9 $num`
echo `npm install`
echo `npm run dev`
