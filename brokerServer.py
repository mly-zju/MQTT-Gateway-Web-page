# -*- coding: utf-8 -*-
import json
import os
from datetime import datetime
import paho.mqtt.client as mqtt
from fileHandler import fileReader

brokerManager=mqtt.Client()
deviceFile=fileReader('deviceInfoServer.txt')
deviceDataFile=fileReader('deviceDataServer.txt')

def on_connect(client, userdata, rc):
    brokerManager.subscribe('pull_data')
    brokerManager.subscribe('change_data')
    brokerManager.subscribe('change_data2')
    brokerManager.subscribe('pull_single_data')
    print 'connected!'

def on_message(client, userdata, msg):
    if(msg.topic=='pull_data'):
        print "pull_data!"
        deviceInfo=deviceFile.read()
        brokerManager.publish('post_data',json.dumps(deviceInfo))
    elif(msg.topic=="change_data"):
        # device info change
        print 'change_data'
        deviceInfo=json.loads(msg.payload)
        deviceFile.write(deviceInfo)
        brokerManager.publish('post_data',json.dumps(deviceInfo))
    elif(msg.topic=="change_data2"):
        # device data change
        print 'change_data2'
        myData=json.loads(msg.payload)
        deviceDataFile.clear()
        length=len(myData)
        i=0
        while i<length:
            deviceDataFile.addData(myData[i])
            i=i+1
    elif(msg.topic=='pull_single_data'):
        print 'pull_single_data!'
        deviceId=msg.payload
        print deviceId
        brokerManager.publish('post_single_data', json.dumps(deviceDataFile.readData(int(deviceId))))

brokerManager.on_message=on_message
brokerManager.on_connect=on_connect
brokerManager.connect('127.0.0.1')
brokerManager.loop_forever()
