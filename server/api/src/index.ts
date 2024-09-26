import express from 'express';
import router from './router/router';

const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use('/api', router)

app.listen(port,()=>{
  console.log(`server is running on port http://localhost:${port}`);
});
