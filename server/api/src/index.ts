import express from 'express';
import router from './router/router';
// import env from 'dot-env'

const app = express();
app.use('/api', router)

app.listen(3000,()=>{
  console.log('server is running on port http://localhost:3000');
});
