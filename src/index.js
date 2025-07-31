import Project from "./model/project.js";
import ToDo from "./model/todo.js";
import { renderProjects } from "./view/renderProjects.js";

// Project module testing

// Create the single, non-removable default project.
const defaultProject = Project.createDefault("Default Project");
console.log(
    `Created default project: "${defaultProject.name}" (Removable: ${defaultProject.isRemovable})`
);
console.log(
    "Current projects:",
    Project.getAll().map((p) => p.name)
);
console.log("\n");

const project1 = Project.create("Complete Odin Project");
console.log(project1);
const project2 = Project.create("Project 2");
console.log(project2);
console.log(Project.getAll());

// defaultProject.remove();
project2.remove();
console.log(Project.getAll());

const project3 = Project.create("Project 3");
console.log(project3);
console.log(Project.getAll());

project3.rename("Get Money (Updated Project 3)");
console.log(project3);
console.log(Project.getAll());

console.log(Project.getById(project3.id));
console.log(Project.exists(project2.id));
console.log(Project.exists(project3.id));
console.log(Project.count());

// To-Do module testing
const todo1 = ToDo.create(
    "To do 1",
    "The first brief description." /*, dueDate, priority, notes*/
);
console.log(todo1);
const todo2 = ToDo.create(
    "To do 2",
    "The second brief description." /*, dueDate, priority, notes*/
);
console.log(todo2);

todo2.addDescription("New second brief description");
console.log(todo2);

todo2.addDueDate(2005, 7, 25);
console.log(todo2);

todo2.addPriority("High");
console.log(todo2);

todo2.addNote("This is a new note");
console.log(todo2);

todo2.toggleComplete();
console.log(todo2);

const checklist = ["run", "jump", "jog"];
todo2.setChecklist(checklist);

console.log(todo2.getChecklist());
console.log(todo2);

todo2.rename("Renamed To Do 2");
console.log(todo2);

// Testing project and todo integration
project3.addToDo(todo1);
console.log([...project3.todos]);

project3.addToDo(todo2);
console.log([...project3.todos]);

console.log(project3.getToDoAll());

console.log(project3.getToDo(todo2));

console.log(project3.toDoExists(todo2));

console.log(project3.countToDo());

project3.removeToDo(todo1);
console.log([...project3.todos]);

// Testing home page rendering
const content = document.querySelector(".main-content");

renderProjects(content, Project.getAll());
