using System;
using System.Threading.Tasks;
using Falcor.Server.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(OwinApi.Startup))]

namespace OwinApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.UseFalcor("/model.json", routerFactory: config => new TodoRouter());
        }
    }
}
