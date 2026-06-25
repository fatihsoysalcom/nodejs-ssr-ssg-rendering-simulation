# Nodejs SSR SSG Rendering Simulation

This example demonstrates Server-Side Rendering (SSR) and Static Site Generation (SSG) concepts, similar to how Next.js handles them. It uses a single Node.js script to simulate a web server generating dynamic content per request (SSR) and pre-generating a static HTML file (SSG). The output HTML includes a timestamp and random number to highlight the dynamic vs. static nature.

## Language

`javascript`

## How to Run

1. Ensure Node.js is installed.
2. Run the script: `node server_render_demo.js`
3. Visit `http://localhost:3000` in your browser for the SSR example, and open `dist/index-ssg.html` directly in your browser for the SSG example.

## Original Article

This example accompanies the Turkish article: [Next.js: En İyi Değil, En Güvenilir Bahis mi? Modern Web Geliştirmenin Güven Limanı](https://fatihsoysal.com/blog/next-js-en-iyi-degil-en-guvenilir-bahis-mi-modern-web-gelistirmenin-guven-limani/).

## License

MIT — see [LICENSE](LICENSE).
