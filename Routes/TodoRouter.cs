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
            Get["todos.length"] = async parameters =>
            {
                var result = await Task.FromResult(Path("todos").Key("length").Atom(todos.Count()));
                return Complete(result);
            };
            Get["todos[{ranges:ids}][{keys:props}]"] = async parameters =>
            {
                NumberRange ids = parameters.ids;
                KeySet props = parameters.props;

                //var result = await Task.FromResult(ids.Select(id => new PathValue(FalcorPath.From("todos", id,"name"),todos[id].name)));
                //var result = await Task.FromResult(ids.Select(id => Path("todos", id).Key("name").Atom(todos[id].name)));
                var result = await Task.FromResult(ids.Select(id => Path("todos", id).Key("name").Atom(todos[id].name).Key("done").Atom(todos[id].done)));
                return Complete(result);
            };
        }
    }
}