var util = require('util');

var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

const handler = null;

var EchoCharacteristic = function(handler) {
  handler = handler;
  EchoCharacteristic.super_.call(this, {
    uuid: 'ec0e',
    properties: ['read', 'write', 'notify'],
    value: null,
  });

  this._value = Buffer.alloc(0);
  this._updateValueCallback = null;
};

util.inherits(EchoCharacteristic, BlenoCharacteristic);

EchoCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  callback(this.RESULT_SUCCESS, this._value);
};

EchoCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
  handler(data);
  console.log("뭐야뭐야")

  console.log('EchoCharacteristic - onWriteRequest: value = ' + this._value);

  if (this._updateValueCallback) {
    console.log('EchoCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
  }

  callback(this.RESULT_SUCCESS);
};

EchoCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('EchoCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

EchoCharacteristic.prototype.onUnsubscribe = function() {
  console.log('EchoCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = EchoCharacteristic;
