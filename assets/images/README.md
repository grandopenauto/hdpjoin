# HDPJoin Homepage Hero Images

The homepage is already configured to detect these optimized images and use them when they are present:

- `manifested-miracles-hero.webp` — desktop cloud-and-stairway background
- `manifested-miracles-mobile.webp` — portrait, mobile-focused background

Keep the filenames **exactly** as shown here. The main site's CSS and JavaScript are prewired to load both files from this directory. Until the files are uploaded, the existing illustrated hero remains the fallback.

## How to add them

1. From this folder's GitHub page choose **Add file → Upload files**.
2. Drag both `.webp` images from your computer into GitHub.
3. Commit the changes to `main`, then wait for the GitHub Pages deployment to finish.
4. Hard refresh `https://hdpjoin.com/` if the previous background is cached.

No HTML editing is needed. Both WebP files are visual assets only; keep the headline and call-to-action buttons as live text and links for mobile accessibility and SEO.

The desktop image was adapted from the approved third mockup, removing its navigation and headline. The mobile image uses a simplified portrait crop; adjust image positioning in `assets/site.css` if device testing reveals a better focal point.
