import ToDo from "./todo.js";

export default class Project {
    // Private static field to hold all project instances.
    static #projects = [];
    // --- Static Properties for Project Management ---
    static get projectsArray() {
        return this.#projects;
    }
    static set projectsArray(value) {
        if (value instanceof Array === false) throw new Error("Not an array!");
        if (!value.every((item) => item instanceof Project)) {
            throw new Error("Array must contain only Project objects!");
        }
        this.#projects = value;
    }
    // --- Static Methods for Creating and Finding Projects ---
    static create(name) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        const project = new Project(name.trim(), true);
        Project.projectsArray = [...Project.projectsArray, project];
        return project;
    }
    static createDefault(name) {
        const hasDefault = Project.projectsArray.some(
            (project) => project.isRemovable === false
        );
        if (hasDefault) {
            throw new Error(
                "A default project already exists and cannot be created again."
            );
        }
        // Creates the special project that is NOT removable.
        const project = new Project(name.trim(), false);
        Project.projectsArray = [...Project.projectsArray, project];
        return project;
    }
    static getAll() {
        return Project.projectsArray;
    }
    static getById(id) {
        if (!id || typeof id !== "string") {
            throw new Error("Project ID must be a valid string");
        }
        return Project.getAll().find((project) => project.id === id) || null;
    }
    static exists(id) {
        return Project.getById(id) !== null;
    }
    static count() {
        return Project.getAll().length;
    }
    // --- Instance Properties and Methods ---
    #todos = [];
    #isRemovable = true;
    constructor(name, isRemovable) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.#isRemovable = isRemovable;
        // this.todos = [];
    }
    get isRemovable() {
        return this.#isRemovable;
    }
    rename(name) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        this.name = name.trim();
    }
    remove() {
        if (!this.#isRemovable) {
            throw new Error(
                `Project "${this.name}" is a default project and cannot be removed.`
            );
        }
        Project.projectsArray = Project.projectsArray.filter(
            (project) => project.id !== this.id
        );
    }
    // --- To-Do Management Methods ---
    get todos() {
        return this.#todos;
    }
    set todos(value) {
        if (value instanceof Array === false) throw new Error("Not an array!");
        if (!value.every((item) => item instanceof ToDo)) {
            throw new Error("Array must contain only ToDo objects!");
        }
        this.#todos = value;
    }
    getToDoAll() {
        return this.todos;
    }
    toDoExists(todo) {
        return this.getToDo(todo) !== null;
    }
    getToDo(todo) {
        if (!todo.id || typeof todo.id !== "string") {
            throw new Error("ToDo ID must be a valid string");
        }
        return this.getToDoAll().find((item) => item.id === todo.id) || null;
    }
    countToDo() {
        return this.getToDoAll().length;
    }
    addToDo(todo) {
        if (!todo || !(todo instanceof ToDo)) {
            throw new Error("todo must be an instace of ToDo");
        }
        this.todos = [...this.todos, todo];
    }
    removeToDo(todo) {
        this.todos = this.getToDoAll().filter((item) => item.id !== todo.id);
    }
}
