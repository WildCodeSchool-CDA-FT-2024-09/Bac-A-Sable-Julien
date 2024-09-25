import express from 'express';
import router from './router/router';

const PORT = process.env.PORT || 3000

const app = express();
app.use('/api', router)

app.listen(PORT,()=>{
  console.log(`server is running on port http://localhost:${PORT}`);
});
