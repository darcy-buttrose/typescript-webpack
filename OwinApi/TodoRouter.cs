using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Falcor;
using Falcor.Server;
using Falcor.Server.Routing;

namespace OwinApi
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
            Get["todos[{integers:ids}].['name','done']"] = async parameters =>
            {
                List<int> ids = parameters.ids;

                var result = await Task.FromResult(ids.Select(id =>
                {
                    var pathValueDefinedResult = Path("todos", id)
                        .Key("name").Atom(todos[id].name)
                        .Key("done").Atom(todos[id].done);
                    return pathValueDefinedResult;
                }));
                return Complete(result);
            };
        }
    }

    internal class TodoItem
    {
        public string name { get; set; }
        public bool done { get; set; }
    }
}