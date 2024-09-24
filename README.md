# Kanban Task Management Web App

This project is a Kanban-style task management web application built using Angular and NgRx for state management. It allows users to manage multiple boards, columns within boards, and tasks within columns. The data is stored in the browser's local storage using a JSON file for persistence.

## Features

- **Add New Boards**: Users can create new boards with a specified name.
- **Add New Columns**: Each board can have multiple columns, and users can add new columns to a board.
- **Display Boards and Columns**: Users can view all the existing boards and their respective columns.
- **Theme Switching**: A theme switching functionality is implemented, allowing users to switch between light and dark modes, but it is not applied throughout the entire application.

## Technologies Used

- **Angular**: Framework for building the user interface.
- **NgRx**: State management library for handling application state.
- **RxJS**: Reactive programming library used for handling asynchronous events.
- **Local Storage**: Used for data persistence with a JSON file structure.
- **Tailwind CSS**: CSS framework for styling components.
- **Eslint**
- **Prettier**

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ktscates/kanban-task-management.git
   cd kanban-task-management
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

    ```bash
    ng serve
    ```
    Open your browser and navigate to `http://localhost:4200/`.

## Known Issues

- **Editing Boards**: There is a known issue where editing boards or columns does not work as expected. Specifically, when editing columns, the existing tasks disappear. Boards failed to edit.
- **Incomplete Features**: The functionality for adding and editing tasks and subtasks within columns is not fully implemented yet. Only the basic structure for boards and columns is working.
- **Theme Implementation**: While theme switching is working, it is not implemented in all parts of the application, leading to inconsistent theming across different components.
- **Responsiveness**: The application is not fully responsive, meaning it may not display correctly on mobile or smaller screens.

## Challenges Faced

One of the significant challenges encountered was during the implementation of the editing functionality for boards and columns. The existing tasks in columns would disappear when editing columns, and properly syncing the columns and tasks proved to be difficult. Additionally, ensuring that changes are reflected correctly in local storage while maintaining the integrity of the nested structure (boards, columns, tasks, subtasks) presented complexities.

## Future Improvements

- Complete the functionality for adding and editing tasks and subtasks within columns.
- Fix the issue with disappearing tasks when editing columns.
- Implement theme switching throughout the entire application for a more consistent user experience.
- Make the application fully responsive for better display on various screen sizes.

## Live Link

You can access the deployed application at [Kanban Task Management](https://ktscates-kanban-task-management.netlify.app/).
