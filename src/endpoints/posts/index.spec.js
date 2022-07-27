
const postsHandlers = require('./index');

describe('Endpoints', () => {
    describe('post', () => {
        it('should create', async () => {

            const mockUser = [
                {
                    id: 1,
                },
                {
                    id: 2,
                }
            ];

            const post = {
                userId: 1,
                id: 1,
                title: "TITLE_POST",
                body: "BODY_POST"
            }

            const req = {
                body: post,
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
            }

            const axios = {
                default: {
                    get: jest.fn().mockResolvedValue({ data: mockUser }),
                    post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
                }
            }

            await postsHandlers({ axios }).post(req, res);

            expect(res.status.mock.calls).toEqual([
                [201]
            ])

            expect(res.send.mock.calls).toEqual([
                [{ id: 1000 }]
            ])

            expect(axios.default.get.mock.calls).toEqual([
                [
                    "https://jsonplaceholder.typicode.com/users",
                ]
            ])

            expect(axios.default.post.mock.calls).toEqual([
                [
                    "https://jsonplaceholder.typicode.com/posts",
                    post
                ]
            ])


        })

        it('should not create if userId does not exist', async () => {

            const mockUser = [
                {
                    id: 1,
                },
                {
                    id: 2,
                }
            ];

            const post = {
                userId: 99,
                id: 3,
                title: "TITLE_POST",
                body: "BODY_POST"
            }

            const req = {
                body: post,
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                sendStatus: jest.fn().mockReturnThis(),
            }

            const axios = {
                default: {
                    get: jest.fn().mockResolvedValue({ data: mockUser }),
                    post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
                }
            }

            await postsHandlers({ axios }).post(req, res);

            expect(axios.default.post.mock.calls).toEqual([])
            expect(res.sendStatus.mock.calls).toEqual([
                [400]
            ])

        })
    });
});