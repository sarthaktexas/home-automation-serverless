const MyQ = require('myq-api');

module.exports = (req, res) => {
    const account = new MyQ();
    account.login(req.body.email, req.body.password)
        .then(async function (result) {
            let response;
            response = await account.setDoorState(req.body.serialnumber, MyQ.actions.door.OPEN)
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
}