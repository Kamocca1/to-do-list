export default class Project {
    static #projects = [];
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
    static create = (name) => {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        const project = new Project(name.trim());
        Project.projectsArray = [...Project.projectsArray, project];
        return project;
    };
    static getAll = () => {
        return Project.projectsArray;
    };
    static getById = (id) => {
        if (!id || typeof id !== "string") {
            throw new Error("Project ID must be a valid string");
        }
        return Project.getAll().find((project) => project.id === id) || null;
    };
    static exists = (id) => {
        return Project.getById(id) !== null;
    };
    static count = () => {
        return Project.getAll().length;
    };
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }
    rename = (name) => {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        this.name = name.trim();
    };
    remove = () => {
        Project.projectsArray = Project.projectsArray.filter(
            (project) => project.id !== this.id
        );
    };
}
