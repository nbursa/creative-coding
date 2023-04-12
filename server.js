import {createServer} from 'http';
import next from 'next';
import {parse} from 'url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = Number(process.env.PORT) || 3000;
const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

async function handleRequest(
    req,
    res,
    parsedUrl
) {
    try {
        const parsedUrl = parse(req.url, true);
        const {pathname, query} = parsedUrl;

        if (pathname === '/a') {
            await app.render(req, res, '/a', query);
        } else if (pathname === '/b') {
            await app.render(req, res, '/b', query);
        } else {
            await handle(req, res, parsedUrl);
        }
    } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
    }
}

app.prepare().then(() => {
    createServer(handleRequest).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});

export {};
