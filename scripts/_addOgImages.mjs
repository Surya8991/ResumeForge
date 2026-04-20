import fs from 'node:fs';

const dirs = fs.readdirSync('app', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
let n = 0;
for (const d of dirs) {
  const p = `app/${d}/page.tsx`;
  if (!fs.existsSync(p)) continue;
  let s = fs.readFileSync(p, 'utf8');
  if (!s.includes('getBlogSeo(')) continue;
  if (s.includes('/api/og?title=')) continue; // already patched

  // Pattern: url: absoluteUrl(`/${seo.slug}`),\n  },\n};
  const re = /(url:\s*absoluteUrl\(`\/\$\{seo\.slug\}`\),\n)(\s*\},\s*\};)/;
  const m = s.match(re);
  if (!m) { console.log('no match', d); continue; }

  const ins = `    images: [{ url: absoluteUrl(\`/api/og?title=\${encodeURIComponent(seo.title)}&badge=\${encodeURIComponent((seo.category || '').toUpperCase())}\`), width: 1200, height: 630, alt: seo.title }],\n`;
  s = s.replace(re, m[1] + ins + m[2]);
  fs.writeFileSync(p, s);
  n++;
}
console.log('patched', n, 'page.tsx files');
