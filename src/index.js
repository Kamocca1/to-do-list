import Project from "./model/project.js";
import ToDo from "./model/todo.js";

// ===== APPLICATION LOGIC (CONTROLLER & VIEW) =====
const App = {
    // --- STATE ---
    projects: [],
    currentProjectId: null,
    editingTodoId: null,

    // --- DOM ELEMENTS ---
    elements: {
        projectsList: document.getElementById("projects-list"),
        newProjectForm: document.getElementById("new-project-form"),
        newProjectName: document.getElementById("new-project-name"),
        projectDetails: document.getElementById("project-details"),
        currentProjectTitle: document.getElementById("current-project-title"),
        todosContainer: document.getElementById("todos-container"),
        addTodoBtn: document.getElementById("add-todo-btn"),
        todoModal: document.getElementById("todo-modal"),
        todoForm: document.getElementById("todo-form"),
        modalTitle: document.getElementById("modal-title"),
        modalCloseBtn: document.getElementById("modal-close-btn"),
        todoIdInput: document.getElementById("todo-id"),
        todoTitleInput: document.getElementById("todo-title"),
        todoDescriptionInput: document.getElementById("todo-description"),
        todoDueDateInput: document.getElementById("todo-due-date"),
        todoPriorityInput: document.getElementById("todo-priority"),
        todoProjectInput: document.getElementById("todo-project"),
        todoNoteInput: document.getElementById("todo-note"),
    },

    // --- INITIALIZATION ---
    init() {
        this.loadData();
        this.bindEvents();
        this.render();
    },

    // --- DATA HANDLING ---
    loadData() {
        // Try to load from localStorage, otherwise create default data
        const savedProjects = localStorage.getItem("todoAppProjects");
        if (savedProjects) {
            const parsedData = JSON.parse(savedProjects);
            Project.projectsArray = parsedData.map((projData) => {
                const project = new Project(
                    projData.name,
                    projData._Project__isRemovable
                );
                project.id = projData.id;
                project.todos = projData._Project__todos.map((todoData) => {
                    const todo = new ToDo(
                        todoData.title,
                        todoData.description,
                        todoData.dueDate,
                        todoData.priority,
                        todoData.note
                    );
                    todo.id = todoData.id;
                    todo.isComplete = todoData.isComplete;
                    return todo;
                });
                return project;
            });
        }

        this.projects = Project.getAll();
        if (this.projects.length === 0) {
            const defaultProject = Project.createDefault("Inbox");
            const todo1 = ToDo.create(
                "Welcome!",
                "This is your first to-do.",
                new Date().toISOString().split("T")[0],
                "medium",
                "You can edit or delete this."
            );
            defaultProject.addToDo(todo1);
            this.projects = Project.getAll();
        }

        const savedCurrentProjectId = localStorage.getItem(
            "todoAppCurrentProjectId"
        );
        this.currentProjectId =
            savedCurrentProjectId && Project.getById(savedCurrentProjectId)
                ? savedCurrentProjectId
                : this.projects[0].id;
    },

    saveData() {
        // Using private fields in JSON.stringify needs a replacer or manual object creation.
        // It's simpler to create plain objects for serialization.
        const serializableProjects = this.projects.map((p) => ({
            id: p.id,
            name: p.name,
            _Project__isRemovable: p.isRemovable,
            _Project__todos: p.todos.map((t) => ({ ...t })),
        }));
        localStorage.setItem(
            "todoAppProjects",
            JSON.stringify(serializableProjects)
        );
        localStorage.setItem("todoAppCurrentProjectId", this.currentProjectId);
    },

    // --- EVENT BINDING ---
    bindEvents() {
        this.elements.newProjectForm.addEventListener(
            "submit",
            this.handleNewProject.bind(this)
        );
        this.elements.projectsList.addEventListener(
            "click",
            this.handleProjectListClick.bind(this)
        );
        this.elements.addTodoBtn.addEventListener(
            "click",
            this.handleOpenModalForNew.bind(this)
        );
        this.elements.modalCloseBtn.addEventListener("click", () =>
            this.elements.todoModal.close()
        );
        this.elements.todoForm.addEventListener(
            "submit",
            this.handleTodoFormSubmit.bind(this)
        );
        this.elements.todosContainer.addEventListener(
            "click",
            this.handleTodoActions.bind(this)
        );
    },

    // --- EVENT HANDLERS ---
    handleNewProject(e) {
        e.preventDefault();
        const name = this.elements.newProjectName.value.trim();
        if (name) {
            // Actually create the project and update both Project.projectsArray and this.projects
            const newProject = Project.create(name);
            this.projects = Project.getAll();
            this.currentProjectId = newProject.id;
            this.elements.newProjectName.value = "";
            this.render();
        }
    },

    handleProjectListClick(e) {
        // Handle project selection
        const projectItem = e.target.closest("[data-project-id]");
        if (projectItem && !e.target.closest(".delete-project-btn")) {
            this.currentProjectId = projectItem.dataset.projectId;
            this.render();
            return;
        }

        // Handle project deletion
        if (e.target.closest(".delete-project-btn")) {
            const projectItem = e.target.closest("[data-project-id]");
            if (!projectItem) return;
            const projectId = projectItem.dataset.projectId;
            const project = Project.getById(projectId);
            if (!project || !project.isRemovable) {
                // Should not be possible to delete default project
                return;
            }
            if (
                confirm(
                    `Are you sure you want to delete the project "${project.name}" and all its to-dos?`
                )
            ) {
                // Remove from Project.projectsArray directly, since Project.delete is not a function
                if (Array.isArray(Project.projectsArray)) {
                    const idx = Project.projectsArray.findIndex(
                        (p) => p.id === projectId
                    );
                    if (idx !== -1) {
                        Project.projectsArray.splice(idx, 1);
                    }
                }
                // Remove from this.projects
                this.projects = this.projects.filter((p) => p.id !== projectId);
                // If the deleted project was selected, switch to the first available project
                if (this.currentProjectId === projectId) {
                    this.currentProjectId =
                        this.projects.length > 0 ? this.projects[0].id : null;
                }
                this.render();
            }
        }
    },

    handleOpenModalForNew() {
        this.editingTodoId = null;
        this.elements.modalTitle.textContent = "New To-Do";
        this.elements.todoForm.reset();
        this.elements.todoIdInput.value = "";
        this.populateProjectSelector(this.currentProjectId);
        this.elements.todoModal.showModal();
    },

    handleTodoFormSubmit(e) {
        e.preventDefault();
        const formData = {
            title: this.elements.todoTitleInput.value,
            description: this.elements.todoDescriptionInput.value,
            dueDate: this.elements.todoDueDateInput.value,
            priority: this.elements.todoPriorityInput.value,
            note: this.elements.todoNoteInput.value,
        };
        const targetProjectId = this.elements.todoProjectInput.value;

        if (this.editingTodoId) {
            // Update existing ToDo
            const sourceProject = this.findProjectByTodoId(this.editingTodoId);
            const todo = sourceProject.getToDoById(this.editingTodoId);
            todo.update(formData);

            // Move ToDo if project changed
            if (sourceProject.id !== targetProjectId) {
                sourceProject.removeToDo(this.editingTodoId);
                const targetProject = Project.getById(targetProjectId);
                targetProject.addToDo(todo);
            }
        } else {
            // Create new ToDo
            const newTodo = ToDo.create(
                formData.title,
                formData.description,
                formData.dueDate,
                formData.priority,
                formData.note
            );
            const project = Project.getById(targetProjectId);
            project.addToDo(newTodo);
        }

        this.elements.todoModal.close();
        this.render();
    },

    handleTodoActions(e) {
        const todoCard = e.target.closest(".todo-card");
        if (!todoCard) return;

        const todoId = todoCard.dataset.todoId;
        const project = this.findProjectByTodoId(todoId);

        // Handle Delete
        if (e.target.closest(".delete-todo-btn")) {
            if (confirm("Are you sure you want to delete this to-do?")) {
                project.removeToDo(todoId);
                this.render();
            }
        }

        // Handle Edit
        if (e.target.closest(".edit-todo-btn")) {
            this.editingTodoId = todoId;
            const todo = project.getToDoById(todoId);
            this.elements.modalTitle.textContent = "Edit To-Do";
            this.elements.todoIdInput.value = todo.id;
            this.elements.todoTitleInput.value = todo.title;
            this.elements.todoDescriptionInput.value = todo.description;
            this.elements.todoDueDateInput.value = todo.dueDate;
            this.elements.todoPriorityInput.value = todo.priority;
            this.elements.todoNoteInput.value = todo.note;
            this.populateProjectSelector(project.id);
            this.elements.todoModal.showModal();
        }

        // Handle Toggle Complete
        if (e.target.closest(".toggle-complete-btn")) {
            const todo = project.getToDoById(todoId);
            todo.toggleComplete();
            this.render();
        }

        // Handle Expand/Collapse
        if (e.target.closest(".todo-header")) {
            const details = todoCard.querySelector(".todo-details");
            if (details) details.classList.toggle("hidden");
        }
    },

    // --- UTILITY METHODS ---
    findProjectByTodoId(todoId) {
        return this.projects.find((p) => p.getToDoById(todoId));
    },

    populateProjectSelector(selectedProjectId) {
        this.elements.todoProjectInput.innerHTML = "";
        this.projects.forEach((p) => {
            const option = document.createElement("option");
            option.value = p.id;
            option.textContent = p.name;
            if (p.id === selectedProjectId) {
                option.selected = true;
            }
            this.elements.todoProjectInput.appendChild(option);
        });
    },

    // --- RENDER METHODS ---
    render() {
        this.renderProjects();
        this.renderTodos();
        this.saveData();
    },

    renderProjects() {
        this.elements.projectsList.innerHTML = "";
        this.projects.forEach((project) => {
            const isActive = project.id === this.currentProjectId;
            const activeClasses = isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "hover:bg-slate-100";
            const projectEl = document.createElement("li");
            projectEl.dataset.projectId = project.id;
            projectEl.className = `p-2 rounded-md cursor-pointer transition-colors flex items-center justify-between gap-2 ${activeClasses}`;
            // Project name span for click selection
            const nameSpan = document.createElement("span");
            nameSpan.textContent = project.name;
            nameSpan.className = "flex-1";
            projectEl.appendChild(nameSpan);

            // Add delete button if project is removable (not default)
            if (project.isRemovable) {
                const deleteBtn = document.createElement("button");
                deleteBtn.className =
                    "delete-project-btn ml-2 p-1 text-slate-400 hover:text-red-600 transition-colors";
                deleteBtn.title = "Delete project";
                deleteBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                    </svg>
                `;
                projectEl.appendChild(deleteBtn);
            }

            this.elements.projectsList.appendChild(projectEl);
        });
    },

    renderTodos() {
        const project = Project.getById(this.currentProjectId);
        if (!project) {
            this.elements.currentProjectTitle.textContent =
                "No Project Selected";
            this.elements.todosContainer.innerHTML =
                '<p class="text-slate-500">Select a project to see your to-dos.</p>';
            return;
        }

        this.elements.currentProjectTitle.textContent = project.name;
        this.elements.todosContainer.innerHTML = "";

        if (project.getToDoAll().length === 0) {
            this.elements.todosContainer.innerHTML =
                '<p class="text-slate-500 text-center mt-8">No to-dos in this project. Add one!</p>';
            return;
        }

        project
            .getToDoAll()
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .forEach((todo) => {
                const priorityClasses = {
                    high: "border-red-400",
                    medium: "border-yellow-400",
                    low: "border-green-400",
                };
                const isOverdue =
                    !todo.isComplete &&
                    todo.dueDate &&
                    new Date(todo.dueDate) < new Date();
                const overdueClass = isOverdue ? "bg-red-50" : "";
                const completedClass = todo.isComplete
                    ? "opacity-60 line-through"
                    : "";

                const todoCard = document.createElement("div");
                todoCard.className = `todo-card border-l-4 p-4 rounded-md bg-white shadow-sm transition-all ${
                    priorityClasses[todo.priority]
                } ${overdueClass}`;
                todoCard.dataset.todoId = todo.id;

                let formattedDate = "No due date";
                if (todo.dueDate) {
                    try {
                        formattedDate = window.dateFns.format(
                            new Date(todo.dueDate),
                            "MMM dd, yyyy"
                        );
                    } catch (e) {
                        console.error("Could not format date:", todo.dueDate);
                    }
                }

                todoCard.innerHTML = `
                        <div class="todo-header flex justify-between items-start cursor-pointer">
                            <div class="flex items-center gap-3">
                                <button class="toggle-complete-btn text-xl">${
                                    todo.isComplete ? "✅" : "🔲"
                                }</button>
                                <div class="${completedClass}">
                                    <h4 class="font-semibold text-lg">${
                                        todo.title
                                    }</h4>
                                    <p class="text-sm text-slate-500">${formattedDate}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <button class="edit-todo-btn p-1 text-slate-500 hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg>
                                </button>
                                <button class="delete-todo-btn p-1 text-slate-500 hover:text-red-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>
                        <div class="todo-details hidden mt-4 pl-10 border-t pt-4">
                             <p class="text-slate-600 mb-2">${
                                 todo.description || "No description."
                             }</p>
                             ${
                                 todo.note
                                     ? `<p class="text-sm bg-yellow-100 p-2 rounded-md"><strong>Note:</strong> ${todo.note}</p>`
                                     : ""
                             }
                        </div>
                    `;
                this.elements.todosContainer.appendChild(todoCard);
            });
    },
};

// --- Start the application ---
App.init();
