const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'client/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, 'client/dist/assets')));

app.get('/api/notes', async(req, res, next)=> {
  try {
    res.send(await client.note.findMany());
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/notes/:id', async(req, res, next)=> {
  try {
    const note = await client.note.update({
      where: {
        id: req.params.id*1
      },
      data: {
        isArchived: req.body.isArchived
      }
    });
    res.send(note);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/notes/:id', async(req, res, next)=> {
  try {
    await client.note.delete({
      where: {
        id: req.params.id*1
      },
    });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/notes', async(req, res, next)=> {
  try {
    const note = await client.note.create({
      data: req.body
    });
    res.status(201).send(note);
  }
  catch(ex){
    next(ex);
  }
});

app.use((req, res, next) => {
  res.status(404).send({ error: 'page not found'});
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message || err});
});


const init = async()=> {
  await client.note.deleteMany({});

  const foo = await client.note.create({
    data: {
      txt: 'foo'
    }
  });

  const bar = await client.note.create({
    data: {
      txt: 'bar',
      isArchived: true
    }
  });
  const notes = await client.note.findMany();
  console.log(notes);
  console.log('seed some data');
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);

  });
};

init();