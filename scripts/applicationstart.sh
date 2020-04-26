# 初回は手動で.envを作成する
#!/bin/bash
result=`ps aux | grep forever | head -n 1`
list=(${result// / })
num=${list[1]}
kill -9 $num
result=`ps aux | grep node | head -n 1`
list=(${result// / })
num=${list[1]}
kill -9 $num

cd /home/ec2-user/rebuilt
npm install
