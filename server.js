
const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

const { users, posts } = require('./src/endpoints');
const { authenticate } = require('./src/middlewares');

// parse application/x-www-form-urlencoded
// parse application/json
app.use(express.json());

const postsHandlers = posts({ axios });
app.post('/', authenticate, postsHandlers.post);


// const usersHandlers = users({ axios });
// app.get('/', usersHandlers.get);
// app.post('/', usersHandlers.post);
// app.put('/:id', usersHandlers.put);
// app.delete('/:id', usersHandlers.delete);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})