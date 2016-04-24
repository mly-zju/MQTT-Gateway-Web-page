# -*- coding: utf-8 -*-
import socket,threading
from fileHandler import fileReader
import json

deviceFile=fileReader('deviceInfo.txt')
deviceDataFile=fileReader('deviceData.txt')

def tcplink(sock,addr):
    print 'accept new connection from ',addr
    data=sock.recv(1024)
    print data
    flag=False
    deviceInfo=deviceFile.read()
    deviceId=0;
    for device in deviceInfo:
        if(addr[0]==device['deviceIp']):
            flag=True
            deviceId=device['deviceId']
            break
    if not flag:
        deviceId=len(deviceInfo)
        deviceInfo.append({'topic':'','deviceName':'','scale':'/','deviceId':deviceId,'deviceIp':addr[0]})
        deviceFile.write(deviceInfo)
        dataLine=[]
        dataLine.append(addr[0])
        dataLine.append(int(data))
        deviceDataFile.addData(dataLine)
    else:
        deviceDataFile.writeData(int(data),deviceId)
        print deviceId
    sock.close()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('127.0.0.1',9999))
s.listen(5)
print 'waitting for connection...'
while True:
    sock,addr=s.accept()
    t=threading.Thread(target=tcplink,args=(sock,addr))
    t.start()
