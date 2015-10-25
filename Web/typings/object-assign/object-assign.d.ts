interface AssignStatic {
    (...args: Array<any>): any;
}
declare module "object-assign" {
    export default assign;
}
declare var assign: AssignStatic;