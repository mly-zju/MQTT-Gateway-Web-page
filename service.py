import web

urls=(
    '/','loginHandler',
    '/index','indexHandler',
    '/check','checkHandler'
)
render = web.template.render('templates/')

class loginHandler:
    def GET(self):
        return render.login(error='false')

    def POST(self):
        account=web.input()
        username=account.get('username')
        password=account.get('password')
        if password=='admin':
            raise web.seeother('/index')
        else:
            return render.login(error='true')

class indexHandler:
    def GET(self):
        return render.index()

class checkHandler:
    def GET(self):
        tmp=web.input()
        deviceId=tmp.get('deviceId')
        print deviceId
        return render.data()

if __name__=='__main__':
    app=web.application(urls,globals())
    app.run()
