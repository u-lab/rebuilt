# 初回は手動で.envを作成する
#!/bin/bash
cd /home/ec2-user/rebuilt
sudo rm -rf node_modules
sudo rm -f package-lock.json
npm install
npm run build
npm run start &
