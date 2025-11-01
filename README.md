🌌 Star Wars Character Explorer

A responsive React application to explore Star Wars characters using the SWAPI API, featuring authentication, search, filtering, and a sleek black-and-orange UI.

🚀 Features

Character Listing – Browse paginated Star Wars characters from SWAPI

Character Details Modal – View attributes, homeworld, and film appearances

Search & Filters – Real-time name search and advanced filtering by homeworld, species, or film

Pagination – Easy navigation between character pages

Authentication – Login/Signup system with JWT token persistence

Responsive Design – Works across desktop, tablet, and mobile

Loading & Error States – Skeleton screens and graceful error handling

Polished UI – Black background with orange (#d16014) Star Wars theme

🧰 Tech Stack

Framework: React 18 + Vite

Language: TypeScript

Styling: Tailwind CSS

Icons: Lucide React

Testing: Vitest + React Testing Library

API: SWAPI
 & mock authentication API

📂 Project Structure
src/
├── components/       # UI components (cards, modals, forms)
├── pages/            # Page components (LoginPage, etc.)
├── context/          # Auth context for login/logout
├── hooks/            # Data fetching and caching hooks
├── services/         # API & auth service calls
├── types/            # TypeScript type definitions
└── App.tsx           # Root component

⚙️ How to Run
Prerequisites

Node.js 18+

npm or yarn installed

Setup
# Clone repository
git clone <your-repo-link>
cd starwars-app

# Install dependencies
npm install

# Run development server
npm run dev


Then open → http://localhost:5173

Build for Production
npm run build && npm run preview

Run Tests
npm test

🎨 Design Choices & Trade-offs

Color Scheme: Orange (#d16014) and Black (#000000) — clean, high-contrast Star Wars feel

Pagination over Infinite Scroll: Matches SWAPI’s structure and improves UX

Client-side Search: SWAPI lacks full search API; implemented local filtering

Modal Details View: Keeps context and provides smoother UX

TypeScript Strict Mode: Ensures reliability and maintainability

💡 Future Enhancements

Infinite scrolling

Character favorites/bookmarks

React Query for data caching

Offline support with Service Workers

Light/Dark theme toggle

🧑‍💻 Author

Built by Aagman Nag
Technologies: React, TypeScript, Tailwind CSS, Vite