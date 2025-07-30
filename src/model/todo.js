import { format } from "date-fns";

export default class ToDo {
    #checklist = [];
    static create(title, description, dueDate, priority, note) {
        if (!title || typeof title !== "string" || title.trim() === "") {
            throw new Error("ToDo title must be a non-empty string");
        }
        const toDo = new ToDo(
            title.trim(),
            description,
            dueDate,
            priority,
            note
        );
        return toDo;
    }
    constructor(title, description, dueDate, priority, note) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
        this.note = note;
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
    addDueDate(year, month, day) {
        const dueDate = new Date(year, --month, day);
        if (!dueDate || !(dueDate instanceof Date)) {
            throw new Error("ToDo due date must be a non-empty date");
        }
        const formattedDate = format(dueDate, "yyyy-MM-dd");
        this.dueDate = formattedDate;
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
    addNote(note) {
        if (typeof note !== "string") {
            throw new Error("ToDo note must be a string");
        }
        this.note = note.trim();
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
    getChecklist() {
        return this.checklist;
    }
    setChecklist(checklist) {
        this.checklist = checklist;
    }
    rename(title) {
        if (!title || typeof title !== "string" || title.trim() === "") {
            throw new Error("ToDo title must be a non-empty string");
        }
        this.title = title.trim();
    }
}
