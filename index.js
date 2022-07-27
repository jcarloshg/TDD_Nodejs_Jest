
const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

app.use(express.json());

app.get('/', async (req, res) => {
    const { data } = await axios.default.get('https://jsonplaceholder.typicode.com/users');
    res.status(200).send({ data });
})

app.post('/', async (req, res) => {
    const { body } = req;
    const { data } = await axios.default.post('https://jsonplaceholder.typicode.com/users', body);

    console.log('====================================');
    console.log({ data });
    console.log('====================================');

    res.status(201).json(data);
})

app.put('/:id', async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    await axios.default.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);

    res.sendStatus(204);
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await axios.default.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})