import express from 'express';
import * as dotenv from "dotenv";
import cors from 'cors';
import router from './router/router';
import "reflect-metadata";
import { dataSource } from './data-source';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(cors({
  origin: [
    process.env.VITE_FRONTEND_URL as string,
    // 'http://localhost:5173'
  ]
})
);

app.use(express.json())
app.use('/api', router)

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`✅ http://localhost:${port} it's okay ✅`);
});

