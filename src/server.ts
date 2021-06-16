import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';

const app = express();

app.use("*",cors);

app.use(compression());

app.get('/',(_,res)=>{
    res.send('hola');
})
const httpServer = createServer(app);
    const PORT = process.env.PORT || 8000;
    httpServer.listen(
        {
            port: PORT
        },
        () => console.log(`http://localhost:${PORT} API MEANG - Online Shop Start`)
    );