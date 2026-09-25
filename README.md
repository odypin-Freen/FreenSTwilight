# FREEN Fan Page

A responsive, static fan page for Freen Sarocha, made with HTML, CSS, and a small JavaScript interaction.

## Files

- `index.html` — page content and gallery
- `style.css` — responsive styling
- `script.js` — small click feedback for external links
- `images/` — add the site's image files here

## Photo gallery

The page displays the photos in the `images/` folder. The `images/` directory in the repository should contain the supplied image assets; add new images there and add a matching `<figure class="gallery-card">...</figure>` in the Gallery section of `index.html`.

## Preview locally

Open `index.html` in a browser. Google Fonts and the embedded YouTube video need an internet connection.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `images` folder to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under the build and deployment settings, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site; the Pages screen will show its URL.

This is an independent fan project and is not affiliated with Freen Sarocha or her representatives. Use only images you have permission to publish.


## Fan submissions and moderation

The Community section accepts a short message and one JPG, PNG, or WebP image (up to 6 MB). Submissions stay in private storage and in a pending queue until an admin approves them. Only approved posts are returned to the public page. Admin sign-in is at `admin.html`; there is no public account registration.

This static site uses Supabase for authentication, database, private photo storage, and Edge Functions. GitHub Pages by itself cannot safely provide login or accept private uploads.

### One-time Supabase setup

1. Create a Supabase project. In **Project Settings → API**, copy the project URL and the browser-safe publishable key into `supabase-config.js`. Never put a `service_role` or secret key in this file.
2. Open the Supabase SQL Editor and run `supabase/schema.sql`.
3. In **Authentication → Users**, create the admin user with an email and password. Afterward run this SQL in the SQL Editor, replacing the email with the admin email:

   ```sql
   insert into public.community_admins (user_id)
   select id from auth.users where lower(email) = lower('YOUR_ADMIN_EMAIL');
   ```

4. Install the Supabase CLI, link this project, then set Edge Function secrets. Keep `SUPABASE_SERVICE_ROLE_KEY` private; never add it to this repository or browser code. Set `SITE_ORIGINS` to the exact published site origin (for this repository, `https://odypin-freen.github.io`; no trailing slash or page path), and set a long random `SUBMISSION_HASH_SECRET`.
5. Deploy the functions from this repository root:

   ```sh
   supabase functions deploy submit-post
   supabase functions deploy list-approved
   ```

6. Enable GitHub Pages for the repository (`main` branch, root folder). Then open `admin.html`, sign in with the admin account, and review each submission. Approved posts appear on the Community section; rejected photos are removed.

Do not share the Supabase service-role key. The SQL grants public users no direct access to posts or private images; the public feed gets short-lived links only for approved images.
