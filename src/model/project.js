import ToDo from "./todo.js";
/**
 * Represents a project in the to-do list application.
 * Each project contains a unique ID, a name, and a list of todos.
 */
export default class Project {
    /**
     * ===========================
     *  Static properties
     * ===========================
     *
     * The following section contains static and/or private properties for the Project class.
     */
    /**
     * Holds all Project instances in memory.
     * @type {Project[]}
     * @private
     */
    static #projects = [];
    /**
     * ===========================
     *  Static getters and setters
     * ===========================
     *
     * The following section contains getters and setters
     */
    /**
     * Gets the array of all Project instances.
     * @returns {Project[]}
     */
    static get projectsArray() {
        return this.#projects;
    }
    /**
     * Sets the array of all Project instances.
     * @param {Project[]} value - Array of Project instances
     * @throws {Error} If value is not an array of Project instances
     * @returns {void}
     */
    static set projectsArray(value) {
        if (value instanceof Array === false) throw new Error("Not an array!");
        if (!value.every((item) => item instanceof Project)) {
            throw new Error("Array must contain only Project objects!");
        }
        this.#projects = value;
    }
    /**
     * ===========================
     *  Static Methods
     * ===========================
     *
     * The following section contains static methods for the Project class.
     * These methods operate on the collection of all Project instances.
     */
    /**
     * ---- CREATE Operations ----
     * Methods for creating new Project instances and adding them to the collection.
     */
    /**
     * Creates a new project and adds it to the projects array.
     * @param {string} name - The name of the project
     * @returns {Project} New instance of Project
     * @throws {Error} If name is invalid or empty
     */
    static create(name) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        const project = new Project(name.trim());
        Project.projectsArray = [...Project.projectsArray, project];
        return project;
    }
    /**
     * ---- READ Operations ----
     * Methods for retrieving Project instances from the collection.
     */
    /**
     * Gets all projects from the projects array.
     * @returns {Project[]} Array of all projects
     */
    static getAll() {
        return Project.projectsArray;
    }
    /**
     * Gets a project by its ID.
     * @param {string} id - The ID of the project to find
     * @returns {Project|null} The found project or null if not found
     * @throws {Error} If ID is invalid
     */
    static getById(id) {
        if (!id || typeof id !== "string") {
            throw new Error("Project ID must be a valid string");
        }
        return Project.getAll().find((project) => project.id === id) || null;
    }
    /**
     * Checks if a project exists by ID.
     * @param {string} id - The ID of the project to check
     * @returns {boolean} True if project exists, false otherwise
     */
    static exists(id) {
        return Project.getById(id) !== null;
    }
    /**
     * Gets the total number of projects.
     * @returns {number} The count of projects
     */
    static count() {
        return Project.getAll().length;
    }
    /**
     * ===========================
     *  Project Class Constructor
     * ===========================
     *
     * The following section defines the constructor for the Project class,
     * specifying the properties that each Project instance will have.
     */
    /**
     * Constructor for a new Project instance.
     * @param {string} name - The name of the project.
     */
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        // this.todos = [];
    }
    /**
     * Holds project instance's todos in memory.
     * @type {ToDo[]}
     * @private
     */
    #todos = [];
    /**
     * Gets the array of project instance's todos.
     * @returns {ToDo[]}
     */
    get todos() {
        return this.#todos;
    }
    /**
     * Sets the array of project instance's todos.
     * @param {ToDo[]} value - Array of ToDo instances
     * @throws {Error} If value is not an array of ToDo instances
     * @returns {void}
     */
    set todos(value) {
        if (value instanceof Array === false) throw new Error("Not an array!");
        if (!value.every((item) => item instanceof ToDo)) {
            throw new Error("Array must contain only ToDo objects!");
        }
        this.#todos = value;
    }
    /**
     * ===========================
     *  Instance Methods
     * ===========================
     *
     * The following section contains instance methods for new instances of the Project class.
     */
    // ---- READ Operations ----
    /**
     *  Gets an array of ToDo objects
     * @returns {ToDo[]} The array of todos
     */
    getToDoAll() {
        return this.todos;
    }
    /**
     * Gets a todo by its ID.
     * @param {string} id - The ID of the todo to find
     * @returns {ToDo|null} The found todo or null if not found
     * @throws {Error} If ID is invalid
     */
    getToDo(todo) {
        if (!todo.id || typeof todo.id !== "string") {
            throw new Error("ToDo ID must be a valid string");
        }
        return this.getToDoAll().find((item) => item.id === todo.id) || null;
    }
    /**
     * Checks if a todo exists by ID.
     * @param {string} id - The ID of the todo to check
     * @returns {boolean} True if todo exists, false otherwise
     */
    toDoExists(todo) {
        return this.getToDoById(todo.id) !== null;
    }
    /**
     * Gets the total number of todos in a project.
     * @returns {number} The count of todos in the project
     */
    toDoCount() {
        return this.getToDoAll().length;
    }
    // ---- UPDATE Operations ----
    /**
     * Updates the name of this project instance.
     * @param {string} name - The new name for the project
     * @throws {Error} If name is invalid
     * @returns {void}
     */
    rename(name) {
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("Project name must be a non-empty string");
        }
        // Since 'this' refers to the current Project instance, and the array holds references to these instances,
        // updating 'this.name' will automatically update the name in the array as well.
        this.name = name.trim();
        // No need to return anything; the update is done in-place.
    }
    /**
     * Adds a ToDo instance tp a projects intance's todo array.
     * @param {id} id -  A Todo instance's id
     * @throws {Error} If value is not a valid id of a ToDo instance
     * @returns {void}
     */
    addToDo(todo) {
        if (!todo || !(todo instanceof ToDo)) {
            throw new Error("todo must be an instace of ToDo");
        }
        this.todos = [...this.todos, todo];
    }
    // removeToDoFromProject = (project) => {
    //     Project.toDoArray = [
    //         ...Project.toDoArray,
    //         project.toDoArray.filter((toDo) => toDo.id === this.id),
    //     ];
    //     project.toDoArray = project.toDoArray.filter(
    //         (toDo) => toDo.id !== this.id
    //     );
    // };
    /**
     * ---- DELETE Operations ----
     */
    /**
     * Removes this project instance from the projects array.
     * @returns {void}
     */
    remove() {
        Project.projectsArray = Project.projectsArray.filter(
            (project) => project.id !== this.id
        );
        // No need to return anything; the project is removed from the array.
    }
    /**
     * Removes todo instance from the project's todos array.
     * @returns {void}
     */
    removeToDo(todo) {
        this.todos = this.getToDoAll().filter((item) => item.id !== todo.id);
    }
}
