# To-Do List App

## Introduction

This project is a feature-rich To-Do List web application designed to showcase organizing JavaScript code. It brings together various techniques such as modular JavaScript, object-oriented programming, DOM manipulation, and data persistence. The app is designed to be extensible, allowing for future enhancements and additional features.

## Features

-   **Object-Oriented Todos:** Todos are objects created using factories or classes. Each todo has the following properties:
    -   `title`
    -   `description`
    -   `dueDate`
    -   `priority`
    -   (Optional) `notes`, `checklist`
-   **Projects:**
    -   Organize todos into projects (separate lists)
    -   A default project is available for all users on first load
    -   Users can create new projects and assign todos to them
-   **User Interface:**
    -   View all projects
    -   View all todos in a project (displaying at least title and due date; color-coded by priority)
    -   Expand a todo to see or edit its details
    -   Delete a todo
-   **Persistence:**
    -   Uses the Web Storage API (`localStorage`) to save projects and todos
    -   Data is automatically saved on every change (add, update, delete)
    -   Loads saved data from `localStorage` on app start
    -   Handles missing or malformed data gracefully
-   **Date Handling:**
    -   Utilizes [date-fns](https://date-fns.org/) for date formatting and manipulation

## Project Structure & Organization

-   **Separation of Concerns:**
    -   Application logic (creating, updating, deleting todos/projects) is separated from DOM manipulation
    -   Uses ESM to organize code
-   **Modules:**
    -   Todo and Project management
    -   UI rendering and event handling
    -   Storage (localStorage) management

## Getting Started

1. **Install dependencies:**
    - This project uses npm and webpack. Run `npm install` to install dependencies.
2. **Run the app:**
    - Use `npm run dev` or the appropriate webpack dev server command to launch the app locally.
3. **Build for production:**
    - Run `npm run build` to create a production build.
4. **Deploy production build:**
    - Run `npm run deploy` to deploy the production build.

## Usage

-   On first load, a default project is created.
-   Add, edit, or delete todos within any project.
-   Create new projects and switch between them.
-   All changes are saved automatically to your browser's localStorage.
-   Data is only available on the device/browser where it was created.

## Inspiration

For ideas on UI/UX and features, check out:

-   [Todoist](https://todoist.com/)
-   [Things](https://culturedcode.com/things/)
-   [Any.do](https://www.any.do/)

## Additional Resources

-   [date-fns documentation](https://date-fns.org/)
-   [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
-   [Using local storage in modern applications](https://web.dev/storage-for-the-web/)

## Notes

-   localStorage uses JSON for data storage. Functions/methods are not stored, so objects need to be rehydrated after loading.
-   Inspect and debug your data using the Application tab in browser DevTools.
-   The app is designed for learning and extensibility—feel free to add more features!
