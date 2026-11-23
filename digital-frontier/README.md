# DIGITAL FRONTIER

A futuristic technology discovery dashboard built with React + Vite.

## Features
- Live technology stories from the Hacker News Algolia Search API
- Search stories by keyword
- Filter stories by topic
- Story details modal
- Save and remove bookmarks
- Bookmarks persist using browser LocalStorage
- Loading, empty, and error states
- Responsive layout for desktop and mobile

## Requirements
- Node.js (LTS recommended)
- npm
- VS Code (recommended)

## Run locally
1. Extract the ZIP file.
2. Open the `digital-frontier` folder in VS Code.
3. Open the terminal in that folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown in the terminal (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## API
This project uses the public Hacker News Algolia Search API:
https://hn.algolia.com/api

Example endpoint:
https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=30

No API key is required for this demo. API availability and rate limits are controlled by the service.

## Tech stack
- React
- Vite
- JavaScript
- CSS
- Hacker News Algolia Search API
- LocalStorage

## Notes
- Bookmarks are stored in the current browser only.
- The feed contains Hacker News community submissions, not a complete feed from every technology publisher.
- The Google Fonts import requires an internet connection; the app falls back to system fonts if unavailable.
