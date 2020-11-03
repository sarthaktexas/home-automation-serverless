const MyQ = require('myq-api');

module.exports = (req, res) => {
    const account = new MyQ();
    account.login(req.query.email, req.query.password)
        .then(async function (result) {
            let response;
            response = await account.setDoorState(req.query.serialnumber, MyQ.actions.door.CLOSE)
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
}