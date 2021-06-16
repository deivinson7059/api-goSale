"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const http_1 = require("http");
const app = express_1.default();
app.use("*", cors_1.default);
app.use(compression_1.default());
app.get('/', (_, res) => {
    res.send('hola');
});
const httpServer = http_1.createServer(app);
const PORT = process.env.PORT || 8000;
httpServer.listen({
    port: PORT
}, () => console.log(`http://localhost:${PORT} API MEANG - Online Shop Start`));
