const MyQ = require('myq-api');

module.exports = (req, res) => {
    const account = new MyQ();
    account.login(req.query.email, req.query.password)
        .then(async function (result) {
            let devices = await account.getDevices();
            let deviceList = '';
            devices.devices.forEach(devices => {
                deviceList += (`${devices.name}: ${devices.serial_number}\n`);
            });
            res.send(deviceList);
        }).catch(function (error) {
            console.error(error);
        });
}