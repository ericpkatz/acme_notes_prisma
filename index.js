const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, 'client/dist/assets')));


const init = ()=> {
  console.log('seed some data');
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);

  });
};

init();