import express from 'express';
import router from './router/router';
import dotenv from 'dotenv';
import "reflect-metadata";
import { dataSource } from './data-source';
import cors from 'cors';


dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: '*', 
}));

app.use(express.json())
app.use('/api', router)

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`✅ http://localhost:${port} it's okay ✅`);
});

