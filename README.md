# libsrc.dev

A small Eleventy landing page for the libsrc GitHub organization. Static HTML and CSS, with no browser JavaScript or external fonts. Project content lives in `src/_data/site.json`.

## Local development

Install Node.js 22 or newer, then run:

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Eleventy. `npm run build` generates the deployable site in `_site/`.

### Typography

Share Tech is the main font, self-hosted in `src/assets/fonts/` for preview and production. Its SIL Open Font License is included. The same font is used across headings, body copy, labels, and links, with system sans-serif fallbacks.

The online dependency audit currently reports advisories in Eleventy's development dependencies, with no suitable stable upgrade offered. The deployed output contains only static files; keep the development server local and use trusted build inputs.

## Deploy to GitHub Pages

1. Push this project to an organization repository, preferably `libsrcdev/libsrcdev.github.io`, on the `main` branch.
2. In repository **Settings → Pages**, set the source to **GitHub Actions**. Run the included deployment workflow if it hasn't run yet.
3. Set the Pages **Custom domain** to `libsrc.dev` and save it before changing DNS. An Actions deployment uses this setting; a `CNAME` file is not required.
4. At your DNS provider, point the apex (`@`) to GitHub Pages using these four A records:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

   Replace conflicting website A/AAAA records; preserve mail and TXT records. Alternatively, use an ALIAS/ANAME to `libsrcdev.github.io` if your provider supports it. Optional `www`: CNAME to `libsrcdev.github.io`.
5. Once GitHub provisions the certificate, enable **Enforce HTTPS**. DNS and certificate provisioning can take up to 24 hours.
6. Add the domain verification TXT record supplied by the service requiring verification. Use its exact host/name and value, not a placeholder. This is separate from any GitHub domain verification TXT record.

Official reference: [GitHub Pages custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Verify the eligible domain

```sh
curl --head https://libsrc.dev/
dig libsrc.dev A +short
dig libsrc.dev TXT +short
```

The HTTPS HEAD request must return **HTTP 200 directly**, without requiring a redirect, login, or challenge. Do not use `curl -L` when checking this requirement. Query the specific TXT hostname supplied by the verification service if it is not the apex.

`libsrc.dev` is an apex domain. Eleventy generates its homepage, but the hosting provider serves HTTP requests and TLS; a local build alone does not prove domain eligibility. Deployment, DNS access, the issued certificate, and the live HEAD response must all be verified before submitting the domain.
