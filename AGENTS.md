# Bookies – MERN Stack

Two separate packages, no root workspace or lockfile.

## Commands

```sh
# server (Express 5, ESM, MongoDB via Mongoose)
cd server && cp .env.example .env   # edit DB_URI; APP_PORT defaults to 4000
npm install && npm run dev           # nodemon index.js

# client (Vite + React 19 + MUI 9 + SCSS)
cd client && npm install && npm run dev   # vite --port 3000
```

No tests, linting, typecheck, or formatter configured anywhere.

## Architecture

```
server/
  index.js          — entry; connects Mongo, listens on APP_PORT (default 4000)
  models/book.js    — title, description (max 1000), author, rating (1-10), pages (min 1), imageUrl, timestamps
  controllers/books.js — CRUD with duplicate-title check (409)
  routers/books.js  — GET /books, GET /books/:id, POST /books, DELETE /books/:id, PATCH /books/:id

client/
  src/index.jsx     — mounts App inside BooksContextProvider + ThemeProvider with CssBaseline; imports @fontsource/roboto (4 weights)
  src/theme.js      — MUI createTheme with pastel palette
  src/App.jsx       — BrowserRouter with routes: /, /new-book, /favorites, /about
  src/context/BookContext.jsx — useReducer with SET_BOOKS, DELETE_BOOK actions (ADD_BOOK commented out)
  src/hooks/useBooksContext.js — context consumer with guard
  src/helper.js     — axios wrappers: fetchData, addData, deleteData
```

API base URL is hardcoded as `http://localhost:4000/books` in pages that call it.

## Notable quirks

- `server/` is ESM (`"type": "module"` in package.json); all imports/exports use ES module syntax.
- Uses `express.Router()` with named function imports from controllers.
- Express 5.x — `app.listen` may behave slightly differently from Express 4.
- Client uses Vite with React plugin, no proxy config; hits server directly at localhost:4000.
- FavoritesPage.jsx is a stub (returns `<div>My Favorites</div>`).
- `.env` is gitignored; always copy `.env.example` and fill in `DB_URI`.
