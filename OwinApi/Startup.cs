using System;
using System.Threading.Tasks;
using Falcor.Server;
using Falcor.Server.Owin;
using Falcor.Server.Routing;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using Routes;

[assembly: OwinStartup(typeof(OwinApi.Startup))]

namespace OwinApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
            app.UseFalcor("/model.json", (arg) =>
            {
                return new TodoRouter();
            });
        }
    }
}
