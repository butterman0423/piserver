import type { Express, Request, Response } from 'express'
import express from 'express'

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    // This is the default page, it should
    // redirect to /:id where :id is the 
    // default root table
});

app.get('/:id', (req: Request, res: Response) => {
    // This will query the db, and change
    // create a new file explorer.
});

app.get('/file/:id', (req: Request, res: Response) => {
    // Opens the file under the id
});