const MyQ = require('myq-api');

module.exports = (req, res) => {
    const account = new MyQ();
    account.login(req.query.email, req.query.password)
        .then(async function (result) {
            let deviceInfo = await account.getDoorState(req.query.serialnumber)
            return deviceInfo.deviceState;
        }).then(async function (result) {
            let response;
            if (result === 'closed') {
                response = await account.setDoorState(req.query.serialnumber, MyQ.actions.door.OPEN);
            } else if (result === 'open') {
                response = await account.setDoorState(req.query.serialnumber, MyQ.actions.door.CLOSE);
            }
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
}