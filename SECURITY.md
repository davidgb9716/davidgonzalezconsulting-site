# Security & Best Practices
# Security & Best Practices

This repo is a static HTML/CSS/JS site intended for GitHub Pages. Below are the practical, low-risk measures I've applied and recommended next steps to keep the site secure in production.

What I already added in the repository
- `README.md` — deployment notes.
- `SECURITY.md` — this file (updated).
- `.nojekyll` — prevents GitHub Pages from ignoring files/folders that start with an underscore.
- `robots.txt` — default allow all (adjust if you want to restrict crawling).

Quick checks performed
- Scanned the repository for obvious secrets (API keys, private keys, tokens) — no matches found.

Pinned third-party libraries and SRI
- I pinned `marked` to version `4.3.0` and added Subresource Integrity (SRI) to `post.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js"
        integrity="sha384-QsSpx6a0USazT7nK7w8qXDgpSAPhFsb2XtpoLFQ5+X2yFN6hvCKnwEzN8M5FWaJb"
        crossorigin="anonymous"></script>
```

- Why: SRI ensures the browser will refuse to run the script if the CDN-served file is modified or corrupted.
- Note: If you update `marked` or switch the CDN, regenerate the SRI hash.

Content Security Policy (CSP)
- I added a meta CSP to `post.html` as a pragmatic step for GitHub Pages (server headers are preferable when available):

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline';">
```

- Recommendation: Move inline CSS into `css/` and remove `'unsafe-inline'` from the policy; consider nonce-based script whitelisting if you need inline scripts.

Robots and indexing
- `robots.txt` currently allows all crawlers. Adjust if you want to prevent indexing of staging branches or sensitive folders.

Deployment & CI recommendations
- Use GitHub Actions for reproducible builds and deployments to GitHub Pages. Store any deploy token as a GitHub Secret.
- Example CI checks to add:
  - Validate HTML & JS (linting).
  - Download CDN assets and compute SRI to verify they match the committed integrity values (pre-deploy check).
  - Optional: run a tiny headless smoke test (open homepage / fetch a known post) before promoting to Pages.

Operational suggestions
- Keep an eye on pinned dependencies (Dependabot or manual monthly checks).
- Do not commit secrets; use GitHub Secrets or external secret stores.

Optional automated step (I can add this)
- Add a GitHub Actions workflow that:
  1. Runs linters/tests.
  2. Fetches third-party files used by the site, computes their SHA-384 and compares with the repository SRI values (fails on mismatch).
  3. Deploys to GitHub Pages on `main` (or `gh-pages`) when checks pass.

Next steps I can take for you (pick any):
- Add the CI workflow that validates SRI and deploys to Pages.
- Replace inline styles to allow a stricter CSP (remove `'unsafe-inline'`).
- Pin and add SRI for any additional CDN assets you use.

If you want the automated SRI/CI workflow, tell me which branch you want to deploy from (e.g., `main` or `gh-pages`) and I’ll add a minimal GitHub Actions file that performs the checks and deploys.
