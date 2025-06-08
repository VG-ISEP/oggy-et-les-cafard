# Hingage - Frontend

This is the frontend for the **Hingage** application, a platform designed to connect people for friendship, mentorship, and support, with a strong focus on accessibility and user safety.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and built using **React** and **TypeScript**.

## Current State

The application is a **standalone frontend prototype**. It does not connect to a real backend database. Instead, it uses a mock API service (`src/services/api.ts`) that simulates network requests and interacts with a static data file (`src/data/db.ts`).

### Implemented Features

- **User Authentication:** Registration, Login, and Logout functionality. The session is persisted in Session Storage.
- **Profile Management (HIN-7, HIN-8, HIN-23):**
  - Create and view user profiles.
  - Edit profile information, including name, bio, photo, interests, accessibility needs, and preferences.
  - Toggle profile visibility.
- **Advanced Search & Filtering (HIN-9, HIN-10, HIN-24, HIN-30, HIN-34):**
  - Search for users by keyword.
  - Filter by role, interests, location, age, and relationship type.
  - Sort results by relevance, proximity (simulated), and popularity (simulated).
- **Event Participation (HIN-12, HIN-13, HIN-14):**
  - Browse a list of upcoming events.
  - Join and leave events.
- **Secure Messaging (HIN-16, HIN-17):**
  - View matches and conversations.
  - Send and receive messages in real-time (simulated).
- **User Safety:**
  - **SOS Button (HIN-20):** A visible SOS button in the navigation bar (currently a placeholder).
  - **Report User (HIN-19):** Ability to report users from their profile page.
- **Forgot Password UI (HIN-4):** A functional UI to request a password reset.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd oggy_et_les_cafards_front
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:
```sh
npm start
```
This will open the application in your default browser at [http://localhost:3000](http://localhost:3000).

### Test Credentials

You can use any of the users from the mock database (`src/data/db.ts`) to log in. For example:

-   **Email:** `heloise@example.com`
-   **Password:** Any password will work.

## Project Structure

```
oggy_et_les_cafards_front/
├── public/
└── src/
    ├── components/         # Reusable UI components (NavBar, UserList, forms, etc.)
    ├── contexts/           # React Context providers (e.g., AuthContext)
    ├── data/               # Mock database (db.ts)
    ├── pages/              # Top-level page components for each route
    ├── services/           # Mock API service (api.ts)
    ├── types/              # TypeScript type definitions
    ├── App.tsx             # Main application component with routing
    ├── index.tsx           # Application entry point
    └── ...
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
