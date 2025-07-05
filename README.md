# Fullstack Task Manager

A modern, fullstack task management application built with Next.js, React, TypeScript, and styled-components. Features a responsive, mobile-friendly UI, user authentication, and persistent task storage.

---

## 🚀 Features

- **User Authentication** (Clerk)
- **Task CRUD**: Create, read, update, delete tasks
- **Mark as Important** and **Complete/Incomplete**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Sidebar Navigation** with hamburger menu on mobile
- **Consistent Card Layout** for all tasks and the add-task card
- **Top-right + Button** for quick task creation
- **Modern UI/UX**: Smooth transitions, accessible buttons, and clear visual hierarchy

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: styled-components, Tailwind CSS (for globals)
- **Auth**: Clerk
- **State Management**: React Context
- **Backend**: API routes (Next.js), Prisma, MongoDB

---

## 📁 Folder Structure

```
app/
  components/
    Sidebar/         # Sidebar navigation (responsive)
    TaskItem/        # Individual task card (responsive)
    Tasks/           # Task list/grid and add-task button
    Modals/          # Modal dialogs for editing/creating tasks
  context/           # Global state/context
  utils/             # Icons, helpers, menu config
  globals.css        # Global styles (Tailwind base)
PROBLEMS.md          # Project issues, solutions, and change log
README.md            # This file
```

---

## 📱 Responsive Design

- **Desktop**: Multi-column task grid, sidebar always visible
- **Tablet**: 2-column grid, sidebar collapses to hamburger
- **Mobile**: 1-column grid, floating hamburger, top + button for new tasks
- **Consistent Card Sizing**: All cards (including add-task) are visually and dimensionally aligned
- **No Redundant Add Button**: Only the top + button is used for adding tasks

---

## 🧑‍💻 Usage

1. **Install dependencies:**
   ```bash
   npm install
   # or yarn install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Troubleshooting & Change Log

See [`PROBLEMS.md`](./PROBLEMS.md) for a detailed log of issues, solutions, and major UI/UX changes.

---

## 🤝 Contributing

Pull requests and issues are welcome! Please document any major changes in `PROBLEMS.md` for future reference.

---

## 📄 License

MIT
