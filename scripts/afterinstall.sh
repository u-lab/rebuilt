#!/bin/bash
sudo cp -r /home/ec2-user/rebuilt/components/ /home/ec2-user/
sudo chmod -R 755 /home/ec2-user/components

result=`ps aux | grep node | head -n 1`
list=(${result// / })
num=${list[1]}
kill -9 $num

sudo service nginx restart
