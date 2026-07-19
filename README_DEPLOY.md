# Portfolio Deployment

This folder is generated from the portfolio source. Do not edit files here directly.
The build copies only referenced assets, removes local-machine paths, and creates
web-ready WebP images while leaving the source portfolio untouched.

## Regenerate After Editing

From the parent workspace, run:

```powershell
& 'C:\Users\ROG\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\tools\build-netlify-package.cjs'
```

The command refreshes this folder while preserving a future `.git` directory.
It also rewrites image references and updates `build-manifest.json`, so later
portfolio edits do not require manual path repair inside the deployment folder.

## Preview Locally

From this folder, run:

```powershell
& 'C:\Users\ROG\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8790 --bind 127.0.0.1
```

Open `http://127.0.0.1:8790/` and inspect Profile, Works, and several project-detail views.

## Publish With Netlify Drop

1. Sign in to Netlify.
2. Open `https://app.netlify.com/drop`.
3. Drag the complete `portfolio-netlify` folder into the upload area.
4. Keep the generated `netlify.app` URL or configure a custom domain.
5. To update the site, regenerate this folder and upload the refreshed folder from the site's Deploys page.

Netlify notes that drag-and-drop deploys work best below 50 MB and that individual files over 10 MB can stall browser uploads. This image-rich portfolio is intentionally prepared for Git-connected deployment; use Netlify Drop only for a temporary preview.

## Publish Through GitHub And Netlify

1. Install Git for Windows and create an empty GitHub repository.
2. Initialize Git inside this generated folder. The packager preserves its `.git` directory on later rebuilds.
3. Commit and push the generated files to GitHub.
4. In Netlify, choose **Add new project** > **Import an existing project** and connect the repository.
5. Leave the build command empty and set the publish directory to `.`.
6. After later edits, regenerate the package, commit the changes, and push. Netlify will deploy the new commit automatically.

## Source Of Truth

- Source page: `../portfolio_company_site_apple_draft.html`
- Build script: `../tools/build-netlify-package.cjs`
- Image optimizer: `../tools/optimize-netlify-images.py`
- Generated entry: `index.html`

Official references:

- Netlify Drop: https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/
- Deploy from a repository: https://docs.netlify.com/start/quickstarts/deploy-from-repository/
- File-based configuration: https://docs.netlify.com/build/configure-builds/file-based-configuration/
