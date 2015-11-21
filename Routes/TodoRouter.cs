using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
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
                done= true
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
            Set["todos[{integers:ids}].done"] = async parameters =>
            {
                try
                {
                    NumericSet ids = parameters.ids;
                    dynamic jsonGraph = parameters.jsonGraph;

                    ids.ToList().ForEach(id =>
                    {
                        todos[id].done = (bool)jsonGraph["todos"][id.ToString()]["done"];
                    });

                    var result = await Task.FromResult(ids.Select(id => Path("todos", id).Key("done").Atom(todos[id].done)));
                    return Complete(result);
                }
                catch(Exception ex)
                {
                    return null;
                }
            };
            Set["todos[{integers:ids}].name"] = async parameters =>
            {
                NumericSet ids = parameters.ids;
                dynamic jsonGraph = parameters.jsonGraph;

                ids.ToList().ForEach(id =>
                {
                    todos[id].name = jsonGraph.todos[id].name;
                });

                var result = await Task.FromResult(ids.Select(id => Path("todos", id).Key("name").Atom(todos[id].name)));
                return Complete(result);
            };
        }
    }
}