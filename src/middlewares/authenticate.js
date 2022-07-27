
module.exports = (req, res, next) => {
    const user_id = req.header('user_id');
    console.log(user_id);
    if (user_id !== "1") {
        return res.sendStatus(403)
    }
    next();
};