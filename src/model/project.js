/**
 * Represents a project in the to-do list application
 */
class Project {
    static #projects = [];

    /**
     * Creates a new Project instance
     * @param {string} name - The name of the project
     */
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }
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
}
/**
 * Adds a project to the projects array
 * @param {Project} project - The project to add
 * @private
 */
const addToArray = (project) => {
    Project.projectsArray = [...Project.projectsArray, project];
};

// CREATE Operations
/**
 * Creates a new project and adds it to the projects array
 * @param {string} name - The name of the project
 * @returns {Project} The newly created project
 * @throws {Error} If name is invalid or empty
 */
const create = (name) => {
    if (!name || typeof name !== "string" || name.trim() === "") {
        throw new Error("Project name must be a non-empty string");
    }
    const project = new Project(name.trim());
    addToArray(project);
    return project;
};

// READ Operations
/**
 * Gets all projects from the projects array
 * @returns {Project[]} Array of all projects
 */
const getAll = () => {
    return Project.projectsArray;
};

/**
 * Gets a project by its ID
 * @param {string} id - The ID of the project to find
 * @returns {Project|null} The found project or null if not found
 * @throws {Error} If ID is invalid
 */
const getById = (id) => {
    if (!id || typeof id !== "string") {
        throw new Error("Project ID must be a valid string");
    }
    return getAll().find((project) => project.id === id) || null;
};

/**
 * Checks if a project exists by ID
 * @param {string} id - The ID of the project to check
 * @returns {boolean} True if project exists, false otherwise
 */
const exists = (id) => {
    return getById(id) !== null;
};

/**
 * Gets the total number of projects
 * @returns {number} The count of projects
 */
const count = () => {
    return getAll().length;
};

// UPDATE Operations
/**
 * Updates the name of a project by ID
 * @param {string} id - The ID of the project to update
 * @param {string} name - The new name for the project
 * @returns {Project} The updated project
 * @throws {Error} If ID is invalid, name is invalid, or project not found
 */
const updateName = (id, name) => {
    if (!id || typeof id !== "string") {
        throw new Error("Project ID must be a valid string");
    }
    if (!name || typeof name !== "string" || name.trim() === "") {
        throw new Error("Project name must be a non-empty string");
    }

    const project = getAll().find((project) => project.id === id);
    if (!project) {
        throw new Error(`Project with ID ${id} not found`);
    }

    project.name = name.trim();
    return project;
};

// DELETE Operations
/**
 * Removes a project from the projects array by ID
 * @param {string} id - The ID of the project to remove
 * @returns {Project} The removed project
 * @throws {Error} If ID is invalid or project not found
 */
const remove = (id) => {
    if (!id || typeof id !== "string") {
        throw new Error("Project ID must be a valid string");
    }

    const project = getAll().find((project) => project.id === id);
    if (!project) {
        throw new Error(`Project with ID ${id} not found`);
    }

    Project.projectsArray = getAll().filter((project) => project.id !== id);
    return project;
};

export { create, getAll, getById, exists, count, updateName, remove };
