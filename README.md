# Pokemon Explorer

A React app built with Vite, TypeScript, SWC, and Jest for testing.  
This project follows a **Test-Driven Development (TDD)** approach and adheres to **Hexagonal Architecture, SOLID principles, and Clean Code**.

## 🛠 Tech Stack

- **Vite + React + TypeScript**
- **SWC** for fast builds
- **Styled-components** for component-based styling
- **Jest + React Testing Library** for unit and integration testing
- **Zustand** for state management
- **Hexagonal Architecture** for modular and scalable design
- **SOLID principles** to ensure maintainability and flexibility
- **Clean Code** best practices for readability and maintainability

## 🚀 Getting Started

**Install dependencies and run the development server**:

```sh
npm install
npm run dev
```

**Run tests**:

```sh
npm test
```

## 📂 Project Structure

```plaintext
The following is the directory structure of the **Pokemon Explorer** app:
pokemon-explorer-app/
├── node_modules/             # Dependencies
├── public/                   # Static assets
├── src/                      # Source code
│   ├── __tests__/            # Unit and integration tests
│   ├── application/          # Business logic (Services, Use Cases)
│   ├── assets/               # Static assets (images, icons, etc.)
│   ├── components/           # Reusable UI components
│   ├── infrastructure/       # API calls and repositories
│   ├── interfaces/           # TypeScript interfaces
│   ├── pages/                # Application pages (views)
│   ├── store/                # Zustand store (state management)
│   ├── styles/               # Global and component styles
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Entry point
├── test/                     # Jest and Testing Library configurations
├── .gitignore
├── eslint.config.js
├── index.html
├── jest.config.ts
├── jest.setup.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md                 # Project documentation
```

### Credits

The tab icon was created by [Freepik](https://www.flaticon.com/free-icons/pokemon) and obtained from Flaticon.
