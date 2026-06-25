const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to generate dynamic content, simulating a React component's output
function generatePageContent(title, renderType) {
    // Using Turkish locale for relevance to the article's language
    const timestamp = new Date().toLocaleString('tr-TR');
    const randomNumber = Math.floor(Math.random() * 1000);

    return `
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body { font-family: sans-serif; margin: 2em; background-color: #f4f4f4; color: #333; }
                .container { background-color: white; padding: 1.5em; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                h1 { color: #0056b3; }
                p { line-height: 1.6; }
                .note { font-style: italic; color: #666; margin-top: 1em; border-top: 1px solid #eee; padding-top: 1em; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${title}</h1>
                <p>Bu sayfa <strong>${renderType}</strong> yöntemiyle oluşturuldu.</p>
                <p>Oluşturulma zamanı: <strong>${timestamp}</strong></p>
                <p>Rastgele sayı: <strong>${randomNumber}</strong></p>
                <div class="note">
                    Bu örnek, Next.js'in kullandığı Sunucu Taraflı Oluşturma (SSR) ve Statik Site Oluşturma (SSG) kavramlarını Node.js ile basitleştirilmiş bir şekilde göstermektedir.
                    SSR'da her istekte yeni içerik üretilirken, SSG'de içerik bir kez üretilip statik olarak sunulur.
                </div>
            </div>
        </body>
        </html>
    `;
}

// --- Server-Side Rendering (SSR) Simulation ---
// This section simulates how a server (like Next.js in SSR mode) generates content
// dynamically for each incoming request.
const PORT = 3000;
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Simulate SSR: content generated on each request
        // The timestamp and random number will change with every page refresh.
        const htmlContent = generatePageContent('Sunucu Taraflı Oluşturma (SSR) Örneği', 'Sunucu Taraflı');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(htmlContent);
        console.log(`[SSR] Request received at ${new Date().toLocaleString('tr-TR')}. Content served dynamically.`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Sayfa bulunamadı.');
    }
});

server.listen(PORT, () => {
    console.log(`[SSR Sunucusu] Çalışıyor: http://localhost:${PORT}`);
    console.log('Tarayıcınızda bu adresi ziyaret ederek SSR örneğini görebilirsiniz.');
    console.log('Sayfayı her yenilediğinizde "Oluşturulma zamanı" ve "Rastgele sayı" değişecektir.');
});

// --- Static Site Generation (SSG) Simulation ---
// This section simulates how Next.js generates static HTML files at build time.
// The content is fixed once generated, regardless of how many times it's accessed.
const outputDir = 'dist';
const ssgFilename = 'index-ssg.html';
const ssgFilePath = path.join(outputDir, ssgFilename);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Simulate SSG: content generated once at "build time"
// The timestamp and random number are fixed when the file is written.
const ssgHtmlContent = generatePageContent('Statik Site Oluşturma (SSG) Örneği', 'Statik');
fs.writeFileSync(ssgFilePath, ssgHtmlContent, 'utf8');
console.log(`[SSG] Statik dosya oluşturuldu: ${ssgFilePath}`);
console.log(`Bu dosyayı tarayıcınızda açarak SSG örneğini görebilirsiniz.`);
console.log(`Dosyanın içeriği sabittir, tarayıcıda yenileseniz bile değişmez.`);
console.log(`SSG dosyasının oluşturulma zamanı: ${new Date().toLocaleString('tr-TR')}`);

// --- Note on Incremental Static Regeneration (ISR) ---
// The article also mentions ISR, which is an evolution of SSG.
// ISR allows static pages to be regenerated in the background at specified intervals or on demand,
// providing a balance between static performance and fresh content.
console.log('\nNext.js ayrıca Artımlı Statik Yeniden Oluşturma (ISR) sunar.');
console.log('ISR, SSG gibi statik sayfalar üretir ancak belirli aralıklarla veya isteğe bağlı olarak arka planda yeniden oluşturulmalarına olanak tanır.');
console.log('Bu örnekte ISR doğrudan simüle edilmemiştir, ancak SSG\'nin dinamik içerik güncellemeleri için bir evrimi olarak düşünülebilir.');
