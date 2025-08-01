import { format } from "date-fns";

export default class ToDo {
    #checklist = [];
    static create(title, description, dueDate, priority, note) {
        if (!title || typeof title !== "string" || title.trim() === "") {
            throw new Error("ToDo title must be a non-empty string");
        }
        return new ToDo(title.trim(), description, dueDate, priority, note);
    }

    constructor(title, description, dueDate, priority, note) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description || "";
        this.dueDate = dueDate || "";
        this.priority = priority || "low";
        this.isComplete = false;
        this.note = note || "";
    }

    toggleComplete() {
        this.isComplete = !this.isComplete;
    }

    update(data) {
        this.title = data.title || this.title;
        this.description = data.description || this.description;
        this.dueDate = data.dueDate || this.dueDate;
        this.priority = data.priority || this.priority;
        this.note = data.note || this.note;
    }
}
