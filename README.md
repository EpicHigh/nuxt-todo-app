# Nuxt 3 Task Manager

This is a simple and intuitive task management application built using Nuxt 3 and json-server. It allows users to easily create, view, update, and delete tasks, giving them full control over their daily activities.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Features

- Create, update, and delete tasks
- View all tasks in a list format
- Sort tasks by priority or creation date
- REST API simulated with json-server
- Full test coverage using Vitest and Playwright

## Technologies

This application was created with:

- Nuxt 3
- json-server
- TypeScript
- CSS
- Pinia (for state management)
- Vitest (for unit and integration testing)
- Playwright (for E2E testing)

## Installation

Before starting, ensure that you have Node.js installed on your machine. If not, download it [here](https://nodejs.org/).

Additionally, this project uses pnpm for managing dependencies. If you don't have it installed, install it globally by running `npm install -g pnpm`.

1. Clone the repository:

```bash
git clone https://github.com/EpicHigh/nuxt-todo-app.git
```

2. Navigate into the project directory:

```bash
cd nuxt-todo-app
```

3. Install the project dependencies:

```bash
pnpm install
```

4. Start the json-server:

```bash
pnpm run db
```

Now, your backend is up and running on http://localhost:3001

## Usage

To start the application in development mode, run:

```bash
pnpm run dev
```

Your application is now available at http://localhost:3000.

## Testing

1. Run unit and integration tests:

```bash
pnpm run test
```

2. Run end-to-end tests:

```bash
pnpm run test:e2e
```

## Deployment

For a live demo of the application, visit [Nuxt Task Manager Demo]().
