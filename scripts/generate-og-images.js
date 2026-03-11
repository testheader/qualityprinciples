const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'og-images');
const SHARE_DIR = path.join(__dirname, '..', 'public', 'share');
const PRINCIPLES_PATH = path.join(__dirname, '..', 'src', 'resources', 'principles.json');
const SITE_URL = 'https://qualityprinciples.netlify.app';

const WIDTH = 1200;
const HEIGHT = 630;

function truncate(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1).trimEnd() + '…';
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildSharePage(principle) {
  const principleUrl = `${SITE_URL}?id=${principle.id}`;
  const imageUrl = `${SITE_URL}/og-images/${principle.id}.png`;
  const title = escapeHtml(principle.title);
  const description = escapeHtml(principle.description);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title} — Quality Principles</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE_URL}/share/${principle.id}/" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Quality Principles" />
</head>
<body>
  <p>Redirecting to <a href="${principleUrl}">${title}</a>…</p>
  <script>window.location.replace("${principleUrl}")</script>
  <noscript><p>Click the link above if you are not redirected automatically.</p></noscript>
</body>
</html>`;
}

function buildCard(principle) {
  return {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 70px',
        background: 'linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0f2b45 100%)',
        fontFamily: 'Inter, sans-serif',
      },
      children: [
        // Top: pill badge
        {
          type: 'div',
          props: {
            style: { display: 'flex' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    background: '#077777',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: 600,
                    padding: '8px 22px',
                    borderRadius: '30px',
                    letterSpacing: '0.5px',
                  },
                  children: 'Quality Principles',
                },
              },
            ],
          },
        },
        // Middle: title + description
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flex: '1',
              justifyContent: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '52px',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    letterSpacing: '-0.5px',
                  },
                  children: truncate(principle.title, 90),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    fontWeight: 400,
                    color: '#99aabb',
                    lineHeight: 1.5,
                  },
                  children: truncate(principle.description, 180),
                },
              },
            ],
          },
        },
        // Bottom: domain label
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#557799',
                    letterSpacing: '0.3px',
                  },
                  children: 'qualityprinciples.netlify.app',
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  const { default: satori } = await import('satori');
  const { Resvg } = await import('@resvg/resvg-js');

  // Load Inter font from Google Fonts bundled with satori, or use a buffer
  // satori requires at least one font; we'll fetch Inter from a local or remote source
  let fontData;
  const localFontPath = path.join(__dirname, 'Inter-Regular.ttf');
  const boldFontPath = path.join(__dirname, 'Inter-Bold.ttf');

  // Try to load local fonts first, otherwise download them
  if (fs.existsSync(localFontPath) && fs.existsSync(boldFontPath)) {
    fontData = {
      regular: fs.readFileSync(localFontPath),
      bold: fs.readFileSync(boldFontPath),
    };
  } else {
    console.log('Downloading Inter fonts...');
    const regularUrl = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf';
    const boldUrl = 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf';

    const https = require('https');
    const fetchFont = (url) =>
      new Promise((resolve, reject) => {
        https.get(url, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            return fetchFont(res.headers.location).then(resolve).catch(reject);
          }
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => resolve(Buffer.concat(chunks)));
          res.on('error', reject);
        }).on('error', reject);
      });

    const [regular, bold] = await Promise.all([fetchFont(regularUrl), fetchFont(boldUrl)]);
    // Cache locally for subsequent runs
    fs.writeFileSync(localFontPath, regular);
    fs.writeFileSync(boldFontPath, bold);
    fontData = { regular, bold };
  }

  const fonts = [
    { name: 'Inter', data: fontData.regular, weight: 400, style: 'normal' },
    { name: 'Inter', data: fontData.bold, weight: 700, style: 'normal' },
  ];

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const principles = JSON.parse(fs.readFileSync(PRINCIPLES_PATH, 'utf-8')).principles;
  console.log(`Generating OG images for ${principles.length} principles...`);

  for (const principle of principles) {
    const card = buildCard(principle);
    const svg = await satori(card, { width: WIDTH, height: HEIGHT, fonts });
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: WIDTH },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    const outPath = path.join(OUTPUT_DIR, `${principle.id}.png`);
    fs.writeFileSync(outPath, pngBuffer);
    console.log(`  ✓ ${principle.id}.png (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nDone! Generated ${principles.length} OG images in public/og-images/`);

  // Generate static HTML share pages for social crawlers
  console.log(`\nGenerating share pages for ${principles.length} principles...`);
  for (const principle of principles) {
    const shareDir = path.join(SHARE_DIR, principle.id);
    if (!fs.existsSync(shareDir)) {
      fs.mkdirSync(shareDir, { recursive: true });
    }
    const html = buildSharePage(principle);
    const outPath = path.join(shareDir, 'index.html');
    fs.writeFileSync(outPath, html);
    console.log(`  ✓ share/${principle.id}/index.html`);
  }
  console.log(`\nDone! Generated ${principles.length} share pages in public/share/`);
}

main().catch((err) => {
  console.error('Failed to generate OG images:', err);
  process.exit(1);
});
