import Project from "./model/project.js";

// Project module testing
const project1 = Project.create("Project 1");
console.log(project1);
const project2 = Project.create("Project 2");
console.log(project2);
console.log(Project.getAll());

project2.remove();
console.log(Project.getAll());

const project3 = Project.create("Project 3");
console.log(project3);
console.log(Project.getAll());

project3.rename("Updated Project 3");
console.log(project3);
console.log(Project.getAll());

console.log(Project.getById(project3.id));
console.log(Project.exists(project2.id));
console.log(Project.exists(project3.id));
console.log(Project.count());

// To-Do module testing
