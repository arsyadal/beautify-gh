# 🌐 Custom Domain Setup Guide (`beautify.arsyad.site`)

This guide explains how to connect your custom subdomain (e.g. `beautify.arsyad.site`) to GitHub Pages.

---

## 🛠️ Step 1: Add DNS CNAME Record in your DNS Provider

Log in to your DNS provider (Cloudflare, Namecheap, Vercel, Niagahoster, etc.) and add a new `CNAME` record:

| Type | Name / Host | Target / Value | TTL | Proxy Status |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `beautify` | `arsyadal.github.io` | Auto / 3600 | DNS Only (or Proxied) |

---

## 🛠️ Step 2: Configure Custom Domain in GitHub Pages

1. Navigate to **[Repository Settings → Pages](https://github.com/arsyadal/beautify-gh/settings/pages)**.
2. Under **Custom domain**, type:
   ```text
   beautify.arsyad.site
   ```
3. Click **Save**.
4. GitHub will verify the DNS record and automatically provision a **free SSL/TLS certificate**.
5. Check the box **"Enforce HTTPS"**.

---

## 🛠️ Step 3: Add `CNAME` file to Repository (Optional / Permanent)

To ensure the custom domain setting persists across deployments, create a file named `CNAME` at the root of the repository:

```text
beautify.arsyad.site
```

Your web generator will then be accessible securely via **`https://beautify.arsyad.site`**! 🚀
