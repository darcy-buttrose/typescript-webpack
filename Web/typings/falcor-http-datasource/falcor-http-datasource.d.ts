interface FalcorHttpDatasourceFactory {
    new (url: string): any;
}
declare module "falcor-http-datasource" {
    export default falcorHttpDatasource;
}
declare var falcorHttpDatasource: FalcorHttpDatasourceFactory;