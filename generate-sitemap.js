// Auto-generates public/sitemap.xml from src/data/apps.json
// Runs automatically before every build (see package.json "build" script),
// so you NEVER edit the sitemap by hand — just add apps to apps.json as usual.

import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Change this if you ever move to a custom domain.
const SITE_URL = 'https://apps.srksoft.online/'

const apps = JSON.parse(
  readFileSync(resolve(__dirname, 'src/data/apps.json'), 'utf-8')
)

const staticRoutes = ['', '/about']

const appRoutes = apps.map((app) => ({
  path: `/app/${app.id}`,
  lastmod: app.releaseDate || new Date().toISOString().slice(0, 10),
}))

const urls = [
  ...staticRoutes.map((path) => ({ path, lastmod: new Date().toISOString().slice(0, 10) })),
  ...appRoutes,
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(__dirname, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml generated with ${urls.length} URLs`)