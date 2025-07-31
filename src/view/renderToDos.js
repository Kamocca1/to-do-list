// Helper function to create a to-do card element
function createToDoCard(todo, container, todos) {
    const card = document.createElement("div");
    card.classList.add("to-do-card");
    card.dataset.toDoId = todo.id;

    const title = document.createElement("h2");
    title.textContent = todo.title;
    card.appendChild(title);

    const description = document.createElement("p");
    description.textContent = todo.description;
    card.appendChild(description);

    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;
    card.appendChild(dueDate);

    const priority = document.createElement("p");
    priority.textContent = todo.priority;
    card.appendChild(priority);

    const note = document.createElement("p");
    note.textContent = todo.note;
    card.appendChild(note);

    const isComplete = document.createElement("p");
    isComplete.textContent = todo.isComplete;
    card.appendChild(isComplete);

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Complete";
    doneBtn.classList.add("to-do-toggle");
    doneBtn.addEventListener("click", (e) => {
        todo.toggleComplete();
        renderToDos(container, todos);
    });
    card.appendChild(doneBtn);

    return card;
}

// Function to render all to-dos as cards in a container
export function renderToDos(container, todos) {
    container.innerHTML = "";

    todos.forEach((todo) => {
        const card = createToDoCard(todo, container, todos);
        container.appendChild(card);
    });
}
