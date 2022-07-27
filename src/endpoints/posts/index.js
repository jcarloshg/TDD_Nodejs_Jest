
module.exports = ({ axios }) => ({

    post: async (req, res) => {
        const { data: users } = await axios.default.get('https://jsonplaceholder.typicode.com/users')
        const found = users.find(user => user.id === req.body.userId);

        if (found == undefined) return res.sendStatus(400);

        const { data } = await axios.default.post('https://jsonplaceholder.typicode.com/posts', req.body)
        return res.status(201).send(data);
    },
});