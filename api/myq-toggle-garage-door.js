const MyQ = require('myq-api');

module.exports = (req, res) => {
    const account = new MyQ();
    account.login(req.body.email, req.body.password)
        .then(function (result) {
            let deviceInfo = await account.getDoorState(req.body.serialnumber)
            return deviceInfo.deviceState;
        }).then(function (result) {
            let response;
            if (result === 'closed') {
                response = await account.setDoorState(req.body.serialnumber, MyQ.actions.door.OPEN);
            } else if (result === 'open') {
                response = await account.setDoorState(req.body.serialnumber, MyQ.actions.door.CLOSE);
            }
            res.send(response);
        }).catch(function (error) {
            console.error(error);
        });
}