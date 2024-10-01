import express from 'express';
import router from './router/router';
import dotenv from 'dotenv';
import "reflect-metadata";
import { dataSource } from './data-source';


dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(express.json())
app.use('/api', router)

// app.listen(port,()=>{
//   console.log(`server is running on port http://localhost:${port}`);
// });

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`✅ http://localhost:${port} it's okay ✅`);
});

