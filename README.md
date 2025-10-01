# Mohamed Ashraf Shaaban Portfolio (Static SPA)

This branch contains a purely static React SPA that showcases Mohamed Ashraf Shaaban Aata's portfolio. All resume data now lives in the frontend (`frontend/src/content/portfolio-data.ts`), making the site easy to host on GitHub Pages or any static site provider.

## Tech stack
- React 19 + Vite 7 + TypeScript
- React Router 6, React Query 5 for state handling
- Custom CSS token system (no CSS framework dependencies)

## Local development
```bash
cd frontend
npm install
npm run dev
```
Vite serves the site on <http://localhost:5173>.

## Build & deploy
```bash
cd frontend
# Use the GitHub Pages base path when building for https://moashraf259.github.io/Portfolio/
VITE_BASE_PATH=/Portfolio/ npm run build
```
Copy the contents of `frontend/dist` to the GitHub Pages branch (e.g., `gh-pages`). To keep React Router working on hard refreshes, copy `dist/index.html` to `dist/404.html` before publishing.

## Portfolio content
The entire CV is defined in [`frontend/src/content/portfolio-data.ts`](frontend/src/content/portfolio-data.ts). Update that file to modify profile details, experiences, projects, skills, certifications, or courses.

## Contact form
Submitting the form now opens an email draft addressed to `mohamed.ashraf13998@gmail.com`. No server-side processing is required.

## Need the full-stack version?
The full API + admin CMS implementation still exists on the `fullstack-backup` branch if you ever want to return to the Express/Prisma backend.
