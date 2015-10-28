interface RouterSpec { }

interface Router { }

interface RouterClass {
    new (...args: Array<any>): Router;
}

declare namespace _falcorRouter {
    function createClass(spec: RouterSpec): RouterClass;
}

declare module "falcor-router" {
    export = _falcorRouter;
}