const http = require('http');
const axios = require('axios');

describe('socket hang up', () => {
    let server;
    beforeAll(done => {
        server = http.createServer(async (req, res) => {
            if (req.url === '/wait') {
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            res.end('ok');
        });
        server.listen(3000, done);
    });

    afterAll(done => {
        server.close(done);
    });

    it('will fail with "socket hang up"', async () => {
        const baseURL = `http://localhost:3000`;
        await axios.get('/1', {baseURL, timeout: 1000});
        await axios.get(`/wait`, {baseURL, timeout: 0});
    }, 15000);
});
