// Helper function to create a project card element
function createProjectCard(project) {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.dataset.projectId = project.id;

    const title = document.createElement("h2");
    title.textContent = project.name;
    card.appendChild(title);

    if (project.countToDo() > 0) {
        const toDoList = document.createElement("ol");
        toDoList.classList.add("to-do-list");
        project.getToDoAll().forEach((item) => {
            const todo = document.createElement("li");
            todo.classList.add("todo-item");
            todo.textContent = `${item.title}`;
            toDoList.appendChild(todo);
        });
        card.appendChild(toDoList);
        console.log(toDoList);
    }
    // Optionally, add more project info here (e.g., number of todos, etc.)

    // If the project is removable, add a remove button
    if (project.isRemovable) {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove Project";
        removeBtn.classList.add("remove-project-btn");
        removeBtn.addEventListener("click", () => {
            project.remove();
            renderProjects();
        });
        card.appendChild(removeBtn);
    }

    return card;
}

// Function to render all projects as cards in a container
export function renderProjects(container, projects) {
    container.innerHTML = "";

    projects.forEach((project) => {
        const card = createProjectCard(project);
        container.appendChild(card);
    });
}
