"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleStopwatch = /*#__PURE__*/function () {
  // Instance construction starts the timer.
  function SimpleStopwatch(name_) {
    _classCallCheck(this, SimpleStopwatch);

    this.name = name_;
    this.startTime = new Date().getTime(); // milliseconds since Epochtime

    this.marks = []; // API methods

    this.mark = this.mark.bind(this);
    this.stop = this.stop.bind(this);
    this.getMarks = this.getMarks.bind(this);
    this.mark("START: ".concat(this.name));
  } // Call the mark method to record the time of event(s) between construction (start) and a call to the stop method.


  _createClass(SimpleStopwatch, [{
    key: "mark",
    value: function mark(label_) {
      var now = new Date().getTime(); // milliseconds since Epochtime

      var ellapsedTotal = now - this.startTime;
      var ellapsedDelta = 0;

      if (this.marks.length > 0) {
        var lastMark = this.marks[this.marks.length - 1];
        ellapsedDelta = ellapsedTotal - lastMark.ellapsedTotal;
      }

      var mark = {
        label: label_,
        ellapsedDelta: ellapsedDelta,
        ellapsedTotal: ellapsedTotal
      };
      this.marks.push(mark);
      return mark;
    } // Call stop to stop the stopwatch timer and freeze the marks log.

  }, {
    key: "stop",
    value: function stop() {
      var finishMark = this.mark("STOP: ".concat(this.name));
      return {
        marks: this.marks,
        name: this.name,
        timeStart: this.startTime,
        timeStop: this.startTime + finishMark.ellapsedTotal,
        totalMilliseconds: finishMark.ellapsedTotal
      };
    }
  }, {
    key: "getMarks",
    value: function getMarks() {
      return this.marks;
    }
  }]);

  return SimpleStopwatch;
}();

module.exports = SimpleStopwatch;