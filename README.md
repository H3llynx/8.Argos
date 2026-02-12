# Sprint 8 - Argos 🐾

<div align="center">

**Dashboard admin of a digital platform for animal welfare organizations keep track of their rescuesa and shelter events such as food recollection, vet visits, adoption visits....**

[![Live Demo](https://img.shields.io/badge/demo-live-00ffff?style=for-the-badge)](https://h3llynx.github.io/7.Star-Wars/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Supabase-242424?style=for-the-badge&logo=supabase)](https://firebase.google.com/)

</div>

---

## Features

- **CRUD Operations** - View and manage (admin-only) information about the shelter's rescues with data stored in Supabase
- **Smart Filtering** - Real-time search to quickly locate animals by name
- **Interactive Map** - Visualize animal locations with possibility to filter by species
- **Event Calendar** - Track adoption events, vet appointments, and important dates
- **Secure Authentication** - Supabase-powered login and registration system
- **Protected Routes** - Authenticated access using React Router
- **Responsive Design** - Fully adaptive UI that works seamlessly across devices

---

## Project Goals

This project helped me learn || improve my knowledge on:

- Building full-stack applications with React and Supabase
- Implementing role-based authentication and authorization
- Managing complex state and real-time data updates
- Creating responsive, user-friendly interfaces

---

## Preview

**Live demo** : https://h3llynx.github.io/8.Argos/

<img src="./public/screens/desktop.png" height="300px">
<img src="./public/screens/mobile.png" height="300px">

---

## Quick Start

1. Clone the repository
```bash
   git clone https://github.com/H3llynx/8.Argos.git
```

2. Install dependencies
```bash
   npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory:
```
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_default_key
```

4. Set up the database
   Run the SQL schema file to create the necessary tables:
```bash
   # Import schema.sql into your Supabase project
   # (See /database/schema.sql for the complete schema)
```

4. Run the development server
```bash
   npm run dev
```

---

## 📁 Project Structure
```
8.Argos/
┣ 📂 src/
┃  ┣ 📂 assets/           # Images and SVGs
┃  ┣ 📂 components/       # Shared UI components
┃  ┣ 📂 features/         # Feature-based modules
┃  ┃  ┣ 📂 animals        # Animal data fetch and display
┃  ┃  ┣ 📂 auth           # Authentication (login, register)
┃  ┃  ┗ 📂 calendar       # Calendar and event management
┃  ┃  ┣ 📂 home           # Landing page
┃  ┃  ┣ 📂 map            # Map
┃  ┃  ┗ 📂 stats          # Animal-related stats
┃  ┣ 📂 router/           # Route configuration & ProtectedRoute
┃  ┣ 📂 services/         # Reusable data fetch and management functions
┃  ┣ 📂 styles/           # Shared CSS
┃  ┣ 📂 test/             # Vitest test files
┃  ┣ 📂 utils/            # Shared helper functions
┃  ┣ 📄 App.tsx
┃  ┣ 📄 config.ts         # Central configuration (table names, form fields, dropdown options)
┃  ┗ 📄 main.tsx
┣ 📄 vite.config.ts       
┣ 📄 tsconfig.json        
┗ 📄 package.json
```
---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind |
| **Backend** | Supabase (PostgreSQL database, authentication) |
| **Routing** | React Router |
| **Authentication** | Supabase Auth |
| **Build Tool** | Vite |
| **Testing** | Vitest |
| **Key Libraries** | FullCalendar (event scheduling), Leaflet (interactive maps), Chart.js (data visualization) |

---

## 🧪 Testing
```bash

npm run test

```

---

## 🤝 Contributions

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: git checkout -b feature/NewFeature
3. Make your changes and commit them: git commit -m 'Add New Feature'
4. Push the changes to your branch: git push origin feature/NewFeature
5. Open a pull request

---

<div align="center">

🐾 **Inspired by Sasha 🐶 and Pixie 😺**

Made with 💙 by [H3llynx](https://github.com/H3llynx)

</div>
