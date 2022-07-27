const handles = require("./index");

describe('Endpoints', () => {
    describe('users', () => {

        describe('get', () => {
            it('return to user json', async () => {
                const axios = {
                    default: {
                        get: jest.fn().mockResolvedValue({ data: 1 }),
                    },
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn().mockReturnThis(),
                }
                await handles({ axios }).get({}, res);

                expect(res.status.mock.calls).toEqual([
                    [200]
                ])

                expect(res.send.mock.calls).toEqual([
                    [1]
                ])

            });
        });

        describe('post', () => {
            it('Creates a resourcwe', async () => {
                const axios = {
                    default: {
                        post: jest.fn().mockResolvedValue({ data: 1 }),
                    },
                }
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn().mockReturnThis(),
                }
                const req = {
                    body: 'request boby'
                }

                await handles({ axios }).post(req, res);

                expect(res.status.mock.calls).toEqual([
                    [201]
                ])

                expect(res.send.mock.calls).toEqual([
                    [1]
                ])

                expect(axios.default.post.mock.calls).toEqual([
                    [
                        'https://jsonplaceholder.typicode.com/users',
                        'request boby',
                    ]
                ])

            });
        });

        describe('put', () => {
            it('Update a resourcwe', async () => {
                const axios = {
                    default: {
                        put: jest.fn().mockResolvedValue({ data: 1 }),
                    },
                }
                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                }
                const req = {
                    body: 'request boby',
                    params: {
                        id: '123'
                    }
                }

                await handles({ axios }).put(req, res);

                expect(axios.default.put.mock.calls).toEqual([
                    [
                        `https://jsonplaceholder.typicode.com/users/123`,
                        'request boby',
                    ]
                ])

                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])

            });
        });

        describe('delete', () => {
            it('Delete a resource', async () => {
                const axios = {
                    default: {
                        delete: jest.fn().mockResolvedValue({ data: 1 }),
                    },
                }
                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                }
                const req = {
                    params: {
                        id: '123'
                    }
                }

                await handles({ axios }).delete(req, res);

                expect(axios.default.delete.mock.calls).toEqual([
                    [
                        `https://jsonplaceholder.typicode.com/users/123`,
                    ]
                ])

                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])

            });
        });
    });
});