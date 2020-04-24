#!/bin/bash
sudo chown ec2-user:ec2-user /home/ec2-user/rebuilt
sudo cp -r /home/ec2-user/rebuilt/components/ /home/ec2-user/

result=`ps aux | grep node | head -n 1`
list=(${result// / })
num=${list[1]}
kill -9 $num

sudo service nginx restart
