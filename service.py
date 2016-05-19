# -*- coding: utf-8 -*-
import web
from fileHandler import fileReader
import json

urls=(
    '/','loginHandler',
    '/index','indexHandler',
    '/check','checkHandler'
)
render = web.template.render('templates/')

deviceFile=fileReader('deviceInfo.txt')
deviceDataFile=fileReader('deviceData.txt')

def Authenticate(func):
    def wrapper(*args,**kw):
        flag=web.cookies().get('username')
        if flag==None:
            raise web.seeother('/')
        else:
            return func(*args,**kw)
    return wrapper


class loginHandler:
    def GET(self):
        if web.cookies().get('username')!=None:
            raise web.seeother('/index')
        else:
            return render.login(error='false')

    def POST(self):
        account=web.input()
        username=account.get('username')
        password=account.get('password')
        if password=='admin':
            web.setcookie('username','admin',3600)
            raise web.seeother('/index')
        else:
            return render.login(error='true')

class indexHandler:
    @Authenticate
    def GET(self):
        deviceInfo=deviceFile.read()
        return render.index(deviceInfo)

    @Authenticate
    def POST(self):
        info=web.input()
        deviceId=int(info.get('deviceId'))
        deviceName=info.get('deviceName')
        topic=info.get('topic')
        xscale=info.get('xscale')
        yscale=info.get('yscale')
        scale=yscale+'/'+xscale
        deviceInfo=deviceFile.read()
        deviceInfo[deviceId]['deviceName']=deviceName
        deviceInfo[deviceId]['topic']=topic
        deviceInfo[deviceId]['scale']=scale
        deviceFile.write(deviceInfo)
        return render.index(deviceInfo)

    @Authenticate
    def PUT(self):
        info=json.loads(web.data())
        deviceInfo=deviceFile.read()
        for item in info:
            tmpIndex=int(item['deviceId'])
            deviceInfo[tmpIndex]['topic']=item['topic']
            deviceInfo[tmpIndex]['scale']=item['scale']
        deviceFile.write(deviceInfo)
        return

class checkHandler:
    @Authenticate
    def GET(self):
        tmp=web.input()
        deviceId=int(tmp.get('deviceId'))
        deviceInfo=json.dumps(deviceFile.read()[deviceId])
        deviceData=json.dumps(deviceDataFile.readData(deviceId))
        return render.data(deviceInfo,deviceData)

if __name__=='__main__':
    app=web.application(urls,globals())
    app.run()
