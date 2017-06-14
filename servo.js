// Serial Port Connection to Servo
var SerialPort = require('serialport');
var myPort = new SerialPort("COM14", {
  baudRate: 9600,
  parser: SerialPort.parsers.byteLength(1)
});
myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);
function showPortOpen() {console.log('port open. Data rate: ' + myPort.options.baudRate);}
function sendSerialData(data) {console.log(data);}
function showPortClose() {console.log('port closed.');}
function showError(error) {console.log('Serial port error: ' + error);}

// Leap Motion connect by cylon
var cylon = require("cylon");
cylon.robot({
  connections: {
    leapmotion: { adaptor: "leapmotion" },
  },
  devices: {
    leapmotion: { driver: 'leapmotion' },
  },

  work: function(my) {
    my.leapmotion.on("hand", function(hand) {

      var x = hand.palmPosition[0];

      if(hand.type == "right") {

          var num = Math.round((x+200)/1.6);

        if(num < 250 && num > 0) {
          
          console.log(-num);
          myPort.write("1");
          var arr = new Uint16Array(1);
          arr[0] = -num;
          const buf = Buffer.from(arr);

          myPort.write(buf);
        }
      }
    });
  }
}).start();