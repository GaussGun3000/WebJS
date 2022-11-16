

const findUser = (authData) =>
{
    //temp users list:
    let users = [{username: "Admin", password: "Admin" },
        {username: "user1", password: "strongPassword"}]
    for (let user of users)
    {
        if (authData.username === user.username && authData.password === user.password)
            return true
    }
    return false
}


const handleLogin = async (req, res) =>
{
    req.session.requestsSent ? req.session.requestsSent += 1 : req.session.requestsSent = 1
    const date = new Date()
    req.session.lastRequest = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} 
                                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    const {user, pwd} = req.body;
    const authData = {username: user, password: pwd}
    if (user && pwd)
    {
        if(findUser(authData)) {
            let accessToken = Math.floor(Math.random() * (0xfffff - 0x11111) + 0x11111)
            let roles = [1000,]
            req.session.auth = true
            res.json({roles, accessToken})
        }
        else
            res.sendStatus(401)
    }
    else
    {return res.status(400).json(
        {'message': 'Both password and username are required'})}
}

module.exports = { handleLogin }