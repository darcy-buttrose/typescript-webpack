﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Falcor;
using Falcor.Server.Routing;
using NUnit.Framework;
using Types;
using Newtonsoft.Json;

namespace Routes.Tests
{
    [TestFixture]
    public class TodoRouterTests
    {
        private TodoRouter _routerUnderTest;

        [SetUp]
        public void Setup()
        {
            _routerUnderTest = new TodoRouter();
        }

        [Test]
        public void ShouldReturnListOfTodoItems()
        {
            //var request = FalcorRequest.Get("todos", new NumberRange(0, 2), "name");
            var request = FalcorRequest.Get("todos", new NumberRange(0, 2), new KeySet("done","name"));
            var response = _routerUnderTest.RouteAsync(request).Result;
            var todos = JsonConvert.SerializeObject(response);

            Assert.That(todos, Is.Not.ContainsSubstring("error"));
        }
    }
}
