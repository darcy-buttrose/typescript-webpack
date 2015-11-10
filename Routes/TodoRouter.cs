using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Falcor;
using Falcor.Server;
using Falcor.Server.Routing;
using Types;

namespace Routes
{
    public class TodoRouter : FalcorRouter
    {
        static List<TodoItem> todos = new List<TodoItem>
        {
            new TodoItem
            {
                name = "get milk from corner store",
                done = false
            },
            new TodoItem
            {
                name= "froth milk",
                done= false
            },
            new TodoItem
            {
                name= "make coffee",
                done= false
            }
        }; 

        public TodoRouter()
        {
            Get["todos.length"] = parameters =>
            {
                var result = Path("todos").Key("length").Atom(todos.Count());
                return Complete(result);
            };
            Get["todos[{ranges:ids}].name"] = parameters =>
            {
                NumberRange ids = parameters.ids;

                var result = ids.Select(id => new PathValue(FalcorPath.From("todos", id), new[]
                {
                    new PathValue(FalcorPath.From(id,"name"), todos[id].name), 
                    new PathValue(FalcorPath.From(id,"done"), todos[id].done) 
                }));
                return Complete(result);
            };
        }
        // Test helper methods
        public static Task<RouteHandlerResult> Complete(params PathValue[] values) => Complete(values.ToList());

        public static Task<RouteHandlerResult> Complete(IEnumerable<PathValue> values) => Task.FromResult(FalcorRouter.Complete(values.ToList()));
    }
}