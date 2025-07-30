export default class ToDo {
    #checklist = [];
    static create(title) {
        if (!title || typeof title !== "string" || title.trim() === "") {
            throw new Error("ToDo title must be a non-empty string");
        }
        const toDo = new ToDo(title.trim());
        return toDo;
    }
    // static getToDos = () => {
    //     return Project.toDoArray;
    // };
    // static getToDoById = (id) => {
    //     if (!id || typeof id !== "string") {
    //         throw new Error("ToDo ID must be a valid string");
    //     }
    //     return Project.getToDos().find((toDo) => toDo.id === id) || null;
    // };
    // static toDoExists = (id) => {
    //     return Project.getToDoById(id) !== null;
    // };
    // static toDoCount = () => {
    //     return Project.getToDos().length;
    // };
    constructor(title, description, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
        this.notes = notes;
    }
    addDescription(description) {
        if (
            !description ||
            typeof description !== "string" ||
            description.trim() === ""
        ) {
            throw new Error("ToDo description must be a non-empty string");
        }
        this.description = description.trim();
    }
    addDueDate(dueDate) {
        if (!dueDate || !(dueDate instanceof Date)) {
            throw new Error("ToDo due date must be a non-empty date");
        }
        this.dueDate = dueDate;
    }
    addPriority(priority) {
        if (
            !priority ||
            typeof priority !== "string" ||
            priority.trim() === ""
        ) {
            throw new Error("ToDo priority must be a non-empty string");
        }
        this.priority = priority.trim();
    }
    addNotes(notes) {
        if (typeof notes !== "string") {
            throw new Error("ToDo notes must be a string");
        }
        this.notes = notes.trim();
    }
    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
    get checklist() {
        return this.#checklist;
    }
    set checklist(value) {
        if (value instanceof Array === false) throw new Error("Not an array!");
        this.#checklist = value;
    }
    rename(title) {
        if (!title || typeof title !== "string" || title.trim() === "") {
            throw new Error("ToDo title must be a non-empty string");
        }
        this.title = title.trim();
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
    // deleteToDo = (project) => {
    //     project.toDoArray = project.toDoArray.filter(
    //         (toDo) => toDo.id !== this.id
    //     );
    // };
}
