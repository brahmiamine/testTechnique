import app from './app';
import { createServer } from 'http';
import { initializeSocketIO } from './socket/socket';
require("dotenv").config();

const PORT = process.env.APP_PORT

const httpServer = createServer(app);

initializeSocketIO(httpServer);

httpServer.listen(PORT, async () => {
    console.log(`Listening on port ${PORT} 🆗`);
});
