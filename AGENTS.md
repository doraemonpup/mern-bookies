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
  index.js          — entry; connects Mongo (mongoose.connect(DB_URI) with NO legacy
                      driver options — flags like useNewUrlParser are hard errors on
                      Mongoose 7+), listens on APP_PORT (default 4000)
  models/book.js    — title, description (max 1000), author, rating (1-10), pages (min 1), imageUrl, timestamps
  controllers/books.js — CRUD with duplicate-title check (409), plus toggleFavorite
  routers/books.js  — GET /books, GET /books/:id, POST /books, DELETE /books/:id,
                      PATCH /books/:id, PATCH /books/:id/favorite

client/
  src/index.jsx     — mounts App inside BooksContextProvider + ThemeProvider with CssBaseline;
                      fonts come from the system font stack (SF Pro on macOS), no @fontsource packages
  src/theme.js      — Apple-style tokens: white/#f5f5f7 palette, #1d1d1f text, #0071e3 accent,
                      pill buttons, 18px cards, component style overrides
  src/App.jsx       — BrowserRouter; routes nested under the AppShell layout element
  src/components/AppShell.jsx   — sticky frosted nav (48px) + Container + Outlet; uses React Router Link
  src/components/PageHeader.jsx — centered hero headline (title ends with a period)
  src/components/ConfirmDeleteDialog.jsx — shared delete confirmation
  src/components/books/BookCard.jsx     — grid card; opens BookDetailDialog
  src/components/books/BookRow.jsx      — compact list row
  src/components/books/GalleryCard.jsx  — cover-dominant tile with hover actions (Favorites)
  src/components/books/BookDetailDialog.jsx — product-page dialog (cover, specs, actions)
  src/components/books/BookmarkButton.jsx, RatingBadge.jsx
  src/components/books/NewBookForm.jsx  — add/edit form with live cover preview panel + 1-10 star Rating
  src/pages/        — HomePage (hero + featured newest book + search/sort/view toolbar),
                      NewBookPage, EditBookPage, FavoritesPage (fan collage + gallery grid), AboutPage (bento grid)
  src/context/BookContext.jsx — useReducer with SET_BOOKS, DELETE_BOOK actions (ADD_BOOK commented out)
  src/hooks/useBooksContext.js — context consumer with guard
  src/helper.js     — axios wrappers: fetchData, addData, deleteData, updateData
  src/helpers/favorites.js — toggleFavorite (PATCH /books/:id/favorite)
```

API base URL is hardcoded as `http://localhost:4000/books` in pages that call it.

## Notable quirks

- `server/` is ESM (`"type": "module"` in package.json); all imports/exports use ES module syntax.
- Uses `express.Router()` with named function imports from controllers.
- Express 5.x — `app.listen` may behave slightly differently from Express 4.
- Client uses Vite with React plugin, no proxy config; hits server directly at localhost:4000.
- Two helper files exist (`src/helper.js` and `src/helpers/favorites.js`) — consolidation is a known deferred refactor.
- `ADD_BOOK` reducer case is commented out; new books appear via navigation/refetch, not context.
- `.env` is gitignored; always copy `.env.example` and fill in `DB_URI`.
