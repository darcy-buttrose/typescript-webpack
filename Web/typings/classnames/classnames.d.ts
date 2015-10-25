interface classNamesStatic {
    (...args: Array<any>): string;
}
declare module "classnames" {
    export default classNames;
}
declare var classNames: classNamesStatic;
