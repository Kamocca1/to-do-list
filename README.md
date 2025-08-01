# To-Do List App

## Overview

A modern, modular To-Do List web application built with JavaScript, featuring project-based organization, persistent storage, and a clean, interactive UI. The app demonstrates best practices in code structure, state management, and user experience, and is designed for easy extensibility.

## Features

-   **Project Organization**

    -   Todos are grouped into projects (lists).
    -   A default "Inbox" project is created on first load.
    -   Users can create, select, and delete projects.
    -   Projects (except the default) are removable.

-   **Object-Oriented Todos**

    -   Each todo is an object with:
        -   `title`
        -   `description`
        -   `dueDate`
        -   `priority`
        -   `note` (optional)
    -   Todos can be created, edited, deleted, and marked as complete/incomplete.
    -   Todos can be moved between projects.

-   **User Interface**

    -   Sidebar lists all projects; click to select.
    -   Main view shows todos for the selected project.
    -   Add, edit, or delete todos via modal dialog.
    -   Todos display title, due date, and priority (color-coded).
    -   Expand/collapse todos to view details and notes.
    -   Mark todos as complete/incomplete with a single click.

-   **Persistence**

    -   All data is saved to `localStorage` automatically on every change.
    -   Data is loaded from `localStorage` on app start.
    -   Handles missing or malformed data gracefully.

-   **Date Handling**
    -   Uses [date-fns](https://date-fns.org/) for formatting and parsing dates.

## Code Structure

-   **src/model/**
    -   `project.js`: Project class, manages todos and project state.
    -   `todo.js`: ToDo class, encapsulates todo properties and methods.
-   **src/index.js**
    -   Main application logic: state, event handling, rendering, and storage.
    -   All UI rendering and event binding is handled in a single controller object.
-   **Separation of Concerns**
    -   Application logic and DOM manipulation are organized for clarity and maintainability.
    -   ESM modules are used throughout.

## Getting Started

1. **Install dependencies**
    - Run `npm install` (requires Node.js and npm).
2. **Run the app locally**
    - Use `npm run dev` to start the development server.
3. **Build for production**
    - Run `npm run build` to generate a production build.
4. **Deploy**
    - Use `npm run deploy` to deploy the production build.

## Usage

-   On first load, you'll see a default "Inbox" project with a welcome todo.
-   Add new projects using the sidebar form.
-   Select a project to view or manage its todos.
-   Add, edit, or delete todos within any project.
-   Move todos between projects when editing.
-   All changes are saved automatically to your browser's localStorage.
-   Data is only available in the browser/device where it was created.

## Inspiration

-   [Todoist](https://todoist.com/)
-   [Things](https://culturedcode.com/things/)
-   [Any.do](https://www.any.do/)

## Resources

-   [date-fns documentation](https://date-fns.org/)
-   [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
-   [Web.dev: Storage for the web](https://web.dev/storage-for-the-web/)

## Notes

-   `localStorage` uses JSON for data storage. Methods are not stored; objects are rehydrated on load.
-   You can inspect and debug your data using the Application tab in browser DevTools.
-   The app is designed for learning and extensibility—feel free to add more features or refactor as needed!
