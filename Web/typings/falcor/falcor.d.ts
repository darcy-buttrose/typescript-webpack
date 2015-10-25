interface ModelFactory {
    new (any): any;
}
declare module "falcor" {
    var Model: ModelFactory;
}