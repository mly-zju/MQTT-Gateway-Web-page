# -*- coding: utf-8 -*-
import socket,threading
from fileHandler import fileReader
import json
import urllib2
from sgmllib import SGMLParser
import os
from datetime import datetime
import paho.mqtt.client as mqtt

class ListName(SGMLParser):
	def __init__(self):
		SGMLParser.__init__(self)
		self.is_td = 0
		self.name = []
	def start_td(self, attrs):
		self.is_td += 1
	def end_td(self):
		self.is_td -= 1
	def handle_data(self, text):
		if self.is_td == 2:
			self.name.append(text)

nameReq=ListName()
deviceFile=fileReader('deviceInfo.txt')
deviceDataFile=fileReader('deviceData.txt')
now=datetime.now()
mqttClient=mqtt.Client()

def on_connect(client, userdata, rc):
    mqttClient.subscribe('post_data')

def on_message(client, userdata, msg):
	if(msg.topic=='post_data'):
		deviceInfo=json.loads(msg.payload)
		deviceFile.write(deviceInfo)
		print 'hello!!'

mqttClient.on_connect=on_connect
mqttClient.on_message=on_message
mqttClient.connect('127.0.0.1')
t=threading.Thread(target=mqttClient.loop_forever,args=())
t.start()
# mqttClient.loop_forever()

def tcplink(sock,addr):
    print 'accept new connection from ',addr
    data=sock.recv(1024)
    flag=False
    deviceInfo=deviceFile.read()
    deviceId=0;
    for device in deviceInfo:
        if(addr[0]==device['deviceIp']):
            flag=True
            deviceId=device['deviceId']
            break
    #如果设备是全新的，尚未记录到文件中：
    if not flag:
        deviceId=len(deviceInfo)
        cmd='arp -a '+'192.168.1.1'  #这条命令仅仅作测试用，实际部署应该改为addr[0]
        mac_string=os.popen(cmd,'r').read()
        mac_index= mac_string.index('at')
        mac_addr=mac_string[mac_index+3:mac_index+20]
        content=urllib2.urlopen('http://mac.51240.com/'+mac_addr+'__mac/').read()
        nameReq.feed(content)
        deviceManufac=nameReq.name[3]
        #下面是dataInfo的数据结构
        deviceInfo.append({'topic':'','deviceName':'','scale':'/','currentTime':'','deviceId':deviceId,'deviceIp':addr[0],'deviceMac':mac_addr,'deviceManufac':deviceManufac})
        deviceFile.write(deviceInfo)
        dataLine=[]
        dataLine.append(addr[0])
        dataLine.append(int(data))
        deviceDataFile.addData(dataLine)
    else:
		topic=deviceInfo[deviceId]['topic']
		scale=deviceInfo[deviceId]['scale']
		scaleX=scale[scale.index('/')+1:]
		if scaleX!='' and topic!='':
			if scaleX=='day':
				cacheLimit=7
			else:
				cacheLimit=24
			cacheData=deviceDataFile.readData(deviceId)
			mqttClient.publish(topic,data)
			deviceDataFile.writeDataLimit(int(data),deviceId, scaleX)
			#更新最新时间
			if scaleX=='day':
				deviceInfo[deviceId]['currentTime']=now.weekday()
			elif scaleX=='hour':
				deviceInfo[deviceId]['currentTime']=now.hour
			deviceFile.write(deviceInfo)
		else:
			deviceDataFile.writeData(int(data),deviceId)
    sock.close()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('127.0.0.1',9999))
s.listen(5)
print 'waitting for connection...'
while True:
    sock,addr=s.accept()
    t=threading.Thread(target=tcplink,args=(sock,addr))
    t.start()
