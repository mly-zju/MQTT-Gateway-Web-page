# -*- coding: utf-8 -*-
import json
import os
from datetime import datetime
import paho.mqtt.client as mqtt
from fileHandler import fileReader

brokerManager=mqtt.Client()
deviceFile=fileReader('deviceInfo.txt')

def on_connect(client, userdata, rc):
    brokerManager.subscribe('pull_data')
    print 'connected!'

def on_message(client, userdata, msg):
    if(msg.topic=='pull_data'):
        print "pull_data!"
        deviceInfo=deviceFile.read()
        brokerManager.publish('post_data',json.dumps(deviceInfo))

brokerManager.on_message=on_message
brokerManager.on_connect=on_connect
brokerManager.connect('127.0.0.1')
brokerManager.loop_forever()