# -*- coding: utf-8 -*-
import os
import json

class fileReader:
    def __init__(self,fileName):
        self.path=os.path.join(os.path.abspath('.'),fileName)
        self.content={}

    def read(self):
        if not os.path.exists(self.path):
            f.write(self.path,'w')
            f.close()
        with open(self.path,'r') as f:
            self.content=json.loads(f.read())
        return self.content

    def write(self,data):
        with open(self.path,'w') as f:
            f.write(json.dumps(data))

    def readData(self,lineNum):
        with open(self.path,'r') as f:
            tmp=f.readlines()
            tmp2=tmp[lineNum].strip()
            self.content=json.loads(tmp2)
        return self.content


if __name__=='__main__':
    # File=fileReader('deviceInfo.txt')
    # File.write([{'deviceId':3,'deviceName':'test','deviceIp':'192.168.2.1','topic':'hhh','scale':'tem/hour'}])
    # File.read()
    File=fileReader('deviceData.txt')
    File.readData(1)
