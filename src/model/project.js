import ToDo from "./todo.js";

export default class Project {
    static #projects = [];
    #todos = [];
    #isRemovable = true;

    static get projectsArray() {
        return this.#projects;
    }
    static set projectsArray(value) {
        if (
            !Array.isArray(value) ||
            !value.every((item) => item instanceof Project)
        ) {
            throw new Error("Array must contain only Project objects!");
        }
        this.#projects = value;
    }

    static create(name) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        const project = new Project(name.trim(), true);
        this.projectsArray.push(project);
        return project;
    }

    static createDefault(name) {
        if (this.projectsArray.some((p) => !p.isRemovable)) {
            return this.projectsArray.find((p) => !p.isRemovable);
        }
        const project = new Project(name.trim(), false);
        this.projectsArray.push(project);
        return project;
    }

    static getAll() {
        return this.projectsArray;
    }
    static getById(id) {
        return this.getAll().find((p) => p.id === id) || null;
    }

    constructor(name, isRemovable) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.#isRemovable = isRemovable;
    }

    get isRemovable() {
        return this.#isRemovable;
    }
    get todos() {
        return this.#todos;
    }
    set todos(value) {
        if (
            !Array.isArray(value) ||
            !value.every((item) => item instanceof ToDo)
        ) {
            throw new Error("Array must contain only ToDo objects!");
        }
        this.#todos = value;
    }

    getToDoAll() {
        return this.todos;
    }
    getToDoById(todoId) {
        return this.todos.find((t) => t.id === todoId) || null;
    }
    addToDo(todo) {
        this.todos.push(todo);
    }
    removeToDo(todoId) {
        this.todos = this.todos.filter((t) => t.id !== todoId);
    }
}
