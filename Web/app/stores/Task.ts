export default class Task {
    id: string;
    name: string;
    done: boolean;
    constructor(id: string, name: string, done: boolean) {
        this.id = id;
        this.name = name;
        this.done = done;
    }
}