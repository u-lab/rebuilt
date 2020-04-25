# 初回は手動で.envを作成する
#!/bin/bash
cd /home/ec2-user/rebuilt
sudo rm -rf node_modules
sudo rm -f package-lock.json
npm install
npm run build

result=`ps aux | grep forever | head -n 1`
list=(${result// / })
num=${list[1]}
kill -9 $num
result=`ps aux | grep node | head -n 1`
list=(${result// / })
num=${list[1]}
kill -9 $num

forever start -c "npm run start" ./
