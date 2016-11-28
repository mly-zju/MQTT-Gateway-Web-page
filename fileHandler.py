# -*- coding: utf-8 -*-
import os
import json

class fileReader:
    def __init__(self,fileName):
        self.path=os.path.join(os.path.abspath('.'),fileName)
        self.content={}

    #读取全部文件数据
    def read(self):
        if not os.path.exists(self.path):
            f.write(self.path,'w')
            f.close()
        with open(self.path,'r') as f:
            self.content=json.loads(f.read())
        return self.content

    #写入全部文件数据
    def write(self,data):
        with open(self.path,'w') as f:
            f.write(json.dumps(data))

    def clear(self):
        with open(self.path,'w') as f:
            f.truncate()

    #读取某一行文件数据
    def readData(self,lineNum):
        with open(self.path,'r') as f:
            lineContents=f.readlines()
            line=lineContents[lineNum].strip()
            self.content=json.loads(line)
        return self.content

    #写入某一行文件数据
    def writeData(self,data,lineNum):
        with open(self.path,'r') as f:
            lineContents=f.readlines()
            line=self.readData(lineNum)
            line.append(data)
            lineContents[lineNum]=json.dumps(line)+'\n'
            tmp=''
            for ele in lineContents:
                tmp+=ele
        with open(self.path,'w') as f:
            f.write(tmp)

    #写入某一行文件数据（写入个数有限）
    def writeDataLimit(self,data,lineNum,xScale):
        # if xScale=='hour':
        #     limit=24
        # elif xScale=='day':
        #     limit=7
        limit=24
        with open(self.path,'r') as f:
            lineContents=f.readlines()
            line=self.readData(lineNum)
            newLine=[]
            if len(line)>=limit:
                lineData=line[-(limit-1):]
                newLine.append(line[0])
                newLine=newLine+lineData
                newLine.append(data)
            else:
                line.append(data)
                newLine=line
            lineContents[lineNum]=json.dumps(newLine)+'\n'
            tmp=''
            for ele in lineContents:
                tmp+=ele
        with open(self.path,'w') as f:
            f.write(tmp)


    def addData(self,data):
        with open(self.path,'a+') as f:
            tmp=json.dumps(data)+'\n'
            f.write(tmp)




if __name__=='__main__':
    # File=fileReader('deviceInfo.txt')
    # File.write([{'deviceId':3,'deviceName':'test','deviceIp':'192.168.2.1','topic':'hhh','scale':'tem/hour'}])
    # File.read()
    File=fileReader('deviceDataTest.txt')
    File.writeData(9999,1)
    File.writeDataLimit(9999,1,'day')
