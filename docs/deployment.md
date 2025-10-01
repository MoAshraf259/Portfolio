# Deployment Guide (Static Hosting)

With the backend removed, the portfolio can be deployed anywhere that serves static files. GitHub Pages is the primary target, but the same build works on Netlify, Vercel (static export), Cloudflare Pages, or an S3 bucket.

## 1. Build the site
```bash
cd frontend
VITE_BASE_PATH=/Portfolio/ npm run build
```
- Set `VITE_BASE_PATH` to the sub-path where the site will be hosted. For GitHub Pages the pattern is `/repository-name/`.
- The compiled assets land in `frontend/dist`.
- Copy `dist/index.html` to `dist/404.html` so React Router handles deep links on refresh.

## 2. Publish to GitHub Pages
1. Commit the new `dist` contents to a deployment branch (`gh-pages` is conventional). A simple option from the repo root:
   ```bash
   git subtree push --prefix frontend/dist origin gh-pages
   ```
2. In the GitHub UI, go to **Settings → Pages**, choose "Deploy from a branch", select `gh-pages`, and use the `/ (root)` folder.
3. Wait for the Pages job to finish, then visit `https://moashraf259.github.io/Portfolio/`.

## 3. Alternative hosts
- **Netlify**: drag the `dist` folder into the Netlify dashboard or link the repo and set the build command to `npm run build` with `VITE_BASE_PATH=/`.
- **Vercel**: create a project from the `frontend` directory, disable serverless functions, and enable "static export".
- **S3/CloudFront**: upload the `dist` folder to an S3 bucket configured for static website hosting and point CloudFront at it.

## 4. Updating content
Edit `frontend/src/content/portfolio-data.ts`, commit, rebuild, and redeploy. No databases or environment variables are required.

## 5. Returning to the API version
The `fullstack-backup` branch retains the Express/Prisma backend and Docker workflows. Merge or cherry-pick from that branch if you need to reintroduce dynamic data in the future.
