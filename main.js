const sensorReport = require('./sensor');

const awsIot = require('aws-iot-device-sdk');
const ENVIRONMENT = 'stag/';
const BASE_TELEMETRY_TOPIC = "dt/6DVZ8TLF/"
const BASE_JOB_TOPIC = "cmd/6DVZ8TLF/"
const PRIVATE_KEY = "./certs/thing_test.key"
const CLIENT_CERT = "./certs/thing_test.crt"
const CA_CERT = "./certs/root-AmzCA.crt"
const CLIENT_ID = "a4:5e:60:e1:9b:77"
const BROKER_HOST = "a3qnicqxfi1gf7-ats.iot.ap-southeast-1.amazonaws.com"
const INTERVAL_REPORT = 5000
const DEBUG_MODE = true
//begin module

function processTest() {
    //
    // The device module exports an MQTT instance, which will attempt
    // to connect to the AWS IoT endpoint configured in the arguments.
    // Once connected, it will emit events which our application can
    // handle.
    //
    const device = awsIot.device({
        keyPath: PRIVATE_KEY,
        certPath: CLIENT_CERT,
        caPath: CA_CERT,
        clientId: CLIENT_ID,
        host: BROKER_HOST,
        debug: DEBUG_MODE
    });

    var timeout;
    var count = 0;
    const TOPIC_TELEMETRY = ENVIRONMENT + BASE_TELEMETRY_TOPIC + CLIENT_ID
    const TOPIC_JOB = ENVIRONMENT + BASE_JOB_TOPIC + CLIENT_ID + '/accepted'

    console.log("Topic telemetry: " + TOPIC_TELEMETRY)
    console.log('Interval update is ' + INTERVAL_REPORT + ' ms...');
    timeout = setInterval(function () {
        count++;
        console.log("Publish topic " + TOPIC_TELEMETRY)
        device.publish(TOPIC_TELEMETRY, JSON.stringify(sensorReport()));
    }, INTERVAL_REPORT); // clip to minimum
    console.log("Subscribe topic: " + TOPIC_JOB);
    device.subscribe(TOPIC_JOB);
    //
    // Do a simple publish/subscribe demo based on the test-mode passed
    // in the command line arguments.  If test-mode is 1, subscribe to
    // 'topic_1' and publish to 'topic_2'; otherwise vice versa.  Publish
    // a message every four seconds.
    //
    device
        .on('connect', function () {
            console.log('connect');
        });
    device
        .on('close', function () {
            console.log('close');
        });
    device
        .on('reconnect', function () {
            console.log('reconnect');
        });
    device
        .on('offline', function () {
            console.log('offline');
        });
    device
        .on('error', function (error) {
            console.log('error', error);
        });
    device
        .on('message', function (topic, payload) {
            console.log('message', topic);
            let buff = Buffer.from(payload.toString(), 'base64');
            console.log(JSON.parse(buff.toString()));
        });

}

processTest();
