# Task Management System

A simple, browser-based task management application that allows users to add, edit, delete, and mark tasks as complete. It also uses local storage so tasks persist between sessions. ***Here we have used Javascript, HTML and CSS.***

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Hosting on GitHub Pages](#hosting-on-github-pages)

---

## Features

- **Add New Tasks**: Enter a task name and description, then click **Add Task**.
- **Edit Existing Tasks**: Open the edit modal to update task details.
- **Delete Tasks**: Remove tasks permanently.
- **Mark Tasks as Complete**: Slash tasks when they are **complete**, Pending tasks show up in the **Task List**.
- **Local Storage**: All tasks are saved in the browser’s local storage, so they persist on page reload.
- **Responsive Design**: The layout is responsive and looks good on various screen sizes.
- **Dynamic Description**: Task Description box size can be edited by the user.
- **Reload task**: Reload task if scratched with the 🔁 option.

---

## Installation

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/reetshinde/Task-Management.git
2. **Open** the index.html file in your browser (e.g., double-click it or drag it into your browser window).

## Usage

1. **Add a Task**  
   - Enter a **Task Name** and **Task Description**.  
   - Click **Add Task**.

2. **Edit a Task**  
   - Click the **✏️ (Edit)** button next to the task you want to update.  
   - In the popup, modify the task name or description and click **Save Changes**.

3. **Delete a Task**  
   - Click the **❌ (Delete)** button to remove a task permanently.

4. **Mark as Complete**  
   - Click the **✔️ (Complete)** button to toggle the task status between pending and completed.
   - 
## Hosting on GitHub Pages

To host this project using GitHub Pages:

1. **Create a GitHub Repository** (if you haven’t already) and push your project code to it.
2. In your repository, navigate to **Settings** → **Pages**.
3. Under **Source**, select the branch (typically `main`) and set the folder to `/root`.
4. Click **Save**.
5. GitHub will generate a URL, such as:
   ```bash
   https://reetshinde.github.io/Task-Management/
6. Share this URL for others to view your live project.


## Navigation

- **Home:** Displays the Task Manager interface with options to add new tasks. The interface is aesthetic and user friendly.
- **Task List:** Shows all tasks with options to edit, delete, or mark them as complete, and reload them.
- **Edit Modal:** A popup window for editing task details, which overlays the main interface. User can edit and svae their changes (which is local storage).
