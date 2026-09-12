# React + TypeScript + Vite — Learning Guide

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Folder Structure](#2-folder-structure)
3. [Tailwind CSS Setup](#3-tailwind-css-setup)
4. [React Router Setup](#4-react-router-setup)
6. [Components & Props](#6-components--props)
7. [Layout & Navbar](#7-layout--navbar)
8. [useState](#8-usestate)

## 1. Project Setup

### Install Node.js

### Windows
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** installer (`.msi`)
3. Run it → accept all defaults → Finish
4. **Close and reopen** your terminal (PATH only updates in new terminals)

### macOS
**Option A — installer (simplest):**
1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** installer (`.pkg`) → run it → accept defaults

### Verify
```bash
node -v
```
Expected: `v22.x.x` or higher.


### Install pnpm

```bash
npm install -g pnpm
```

### Verify
```bash
pnpm -v
```
Expected: `10.x.x` or higher.

## Install Git

### Windows
1. Download from [git-scm.com](https://git-scm.com)
2. Run the installer → **accept every default** (the defaults are correct for this course)
3. Reopen your terminal

### macOS
Run this in Terminal:
```bash
git --version
```

## Install VS Code

1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install it

### Windows — during install, check these boxes
- ✅ Add "Open with Code" action to file context menu
- ✅ Add "Open with Code" action to directory context menu
- ✅ Add to PATH (checked by default — leave it)

### macOS — enable the `code` command
1. Drag VS Code into **Applications**
2. Open VS Code
3. Press `Cmd + Shift + P`
4. Type: `Shell Command: Install 'code' command in PATH` → press Enter

### Verify
```bash
code -v
```
Expected: a version number like `1.10x.x`.

## Prerequisites Check

Run all four. Every one must print a version number.

```bash
node -v
```

```bash
pnpm -v
```

```bash
git --version
```

```bash
code -v
```

## Scaffold the Project

Navigate to where you keep your projects, then:

```bash
pnpm create vite@latest .
# Select: React → TypeScript + SWC or TypeScript
```

for learning, choose typescript without react compiler.


### Key files created
| File | Purpose |
|---|---|
| `index.html` | Single HTML file — entry point for the browser |
| `src/main.tsx` | React entry — mounts `<App />` into `#root` |
| `src/App.tsx` | Root component |
| `vite.config.ts` | Vite configuration |
| `tsconfig.app.json` | TypeScript config for source files |

### Boot sequence
```
index.html → main.tsx → App.tsx → your components
```

### `main.tsx` — set once, rarely touched
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

> **StrictMode** — in development only, renders components twice to catch bugs. No effect in production.

## 2. Folder Structure

### Recommended structure
```
src/
  assets/           ← images, fonts, static files
  components/
    ui/             ← reusable generic UI (Button, Card, Modal)
    layout/         ← Header, Sidebar, Footer
  context/          ← React Context files
  hooks/            ← custom hooks
  pages/
    landing/           ← public landing pages
    auth/           ← login, register, forgot password
  routes/           ← route definitions
  services/         ← API call functions
  types/            ← shared TypeScript types
  utils/            ← pure helper functions
  App.tsx
  main.tsx
  index.css
```

### Rules
- `components/` — reusable, not tied to any page
- `pages/` — tied to a route, composed of components
- Start minimal, add folders only when you need them
- File naming: `LoginPage.tsx`, `CustomButton.tsx` — PascalCase for components


## 3. Tailwind CSS Setup

### Install (Tailwind v4 + Vite)
```bash
npm install tailwindcss @tailwindcss/vite
```

### `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### `src/index.css` — replace everything with:
```css
@import "tailwindcss";
```

### Verify
Add a Tailwind class to any component:
```tsx
<h1 className="text-3xl font-bold text-blue-500">Hello</h1>
```

> **Note:** Remove all Vite scaffold CSS from `index.css` and `App.css` — they override Tailwind classes.


## 4. React Router Setup

### Install
```bash
npm install react-router@latest
```

### File: `src/main.tsx`
Wrap app with `BrowserRouter`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

### File: `src/routes/index.tsx`
```tsx
import { Routes, Route } from 'react-router'
import LandingPage from '../pages/home/LandingPage'
import LoginPage from '../pages/auth/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
```

### File: `src/App.tsx`
```tsx
import AppRoutes from './routes'

const App = () => {
  return <AppRoutes />
}

export default App
```


## 6. Components & Props

A component is a function that returns JSX. Props are arguments passed to it.

### Standard component boilerplate
```tsx
// file: src/components/ui/Button.tsx

type ButtonProps = {
  label: string
  onClick: () => void
  disabled?: boolean  // optional prop
}

const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button
```

### Using it
```tsx
<Button label="Submit" onClick={handleSubmit} />
<Button label="Delete" onClick={handleDelete} disabled />
```

## 7. Layout & Navbar

A **layout** is a shell that wraps multiple pages — navbar, sidebar, footer. You write it once instead of importing a `<Navbar />` into every page.

### File: `src/layouts/MainLayout.tsx`
```tsx
import { Outlet } from 'react-router'
import Navbar from '../components/layout/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
```

> **`<Outlet />`** — the placeholder where the current page gets injected. Whichever child route matches the URL renders here.

### File: `src/components/layout/Navbar.tsx`
```tsx
import { Link, NavLink } from 'react-router'

const Navbar = () => {
  return (
    <header className="flex items-center px-6 py-3 border-b bg-white">
      <Link to="/" className="text-xl font-bold text-blue-500">
        MyLogo
      </Link>

      <nav className="ml-auto flex items-center gap-4">
        <NavLink to="/about" className="text-gray-700 hover:text-blue-500">
          About
        </NavLink>
        <NavLink to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
```

`ml-auto` on the `<nav>` pushes it to the far right — logo left, links right.

| Element | Use it for |
|---|---|
| `<a href>` | External sites only — causes a full page reload |
| `<Link>` | Internal navigation — no reload |
| `<NavLink>` | Same as `Link`, but knows when it's the active route |

### File: `src/routes/index.tsx` — nest the pages
```tsx
import { Routes, Route } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../pages/landing/LandingPage'
import AboutPage from '../pages/about/AboutPage'
import LoginPage from '../pages/auth/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
```

### Rules
- The parent `<Route>` has **no `path`** — it's a layout route, it only provides the shell
- Every child route renders inside that layout's `<Outlet />`
- **Your page files don't change at all** — they never import the Navbar
- Routes placed *outside* the wrapper render bare — used here for `/login`
- Need a different shell later? Make `DashboardLayout.tsx` and add a second wrapper route

### Login page — a bare layout example

```tsx
// file: src/pages/auth/LoginPage.tsx

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log({ email, password })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full p-2 border rounded outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full p-2 border rounded outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-gray-500 hover:text-blue-500"
        >
          ← Back to landing page
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
```

## 8. useState

Tracks data that changes over time. When state changes, React re-renders the component.

### Syntax
```tsx
const [value, setValue] = useState(initialValue)
```

### TypeScript inference
```tsx
useState(0)           // inferred: number
useState('')          // inferred: string
useState(false)       // inferred: boolean
useState<User[]>([])  // explicit: needed for empty arrays/objects
```

### Multiple state values
```tsx
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isLoading, setIsLoading] = useState(false)
```

### Common mistake — state is async
```tsx
const handleClick = () => {
  setCount(count + 1)
  console.log(count)  // still shows OLD value — state updates on next render
}
```

### Functional update — when next state depends on previous
```tsx
setCount(prev => prev + 1)
setShowPassword(prev => !prev)
```
