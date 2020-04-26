#!/bin/bash +x
sudo cp -r /home/ec2-user/rebuilt/components/ /home/ec2-user/
sudo chown -R ec2-user:ec2-user /home/ec2-user
sudo chown -R ec2-user:ec2-user /home/ec2-user/components
sudo chmod -R 755 /home/ec2-user/components
sudo service nginx restart
