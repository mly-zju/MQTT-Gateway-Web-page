import web

urls=(
    '/','loginHandler',
    '/index','indexHandler'
)
render = web.template.render('templates/')

class loginHandler:
    def GET(self):
        return render.login()

    def POST(self):
        account=web.input()
        username=account.get('username')
        password=account.get('password')
        if password=='admin':
            raise web.seeother('/index')

class indexHandler:
    def GET(self):
        return render.index()

if __name__=='__main__':
    app=web.application(urls,globals())
    app.run()
