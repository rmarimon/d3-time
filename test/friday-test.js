var tape = require("tape"),
    time = require("../"),
    date = require("./date");

tape("fridays in an alias for friday.range", function(test) {
  test.equal(time.fridays, time.friday.range);
  test.end();
});

tape("friday.floor(date) returns Fridays", function(test) {
  test.deepEqual(time.friday.floor(date.local(2011, 00, 05, 23, 59, 59)), date.local(2010, 11, 31));
  test.deepEqual(time.friday.floor(date.local(2011, 00, 06, 00, 00, 00)), date.local(2010, 11, 31));
  test.deepEqual(time.friday.floor(date.local(2011, 00, 06, 00, 00, 01)), date.local(2010, 11, 31));
  test.deepEqual(time.friday.floor(date.local(2011, 00, 06, 23, 59, 59)), date.local(2010, 11, 31));
  test.deepEqual(time.friday.floor(date.local(2011, 00, 07, 00, 00, 00)), date.local(2011, 00, 07));
  test.deepEqual(time.friday.floor(date.local(2011, 00, 07, 00, 00, 01)), date.local(2011, 00, 07));
  test.end();
});

tape("friday.count(start, end) counts Fridays after start (exclusive) and before end (inclusive)", function(test) {
  //       January 2012
  // Su Mo Tu We Th Fr Sa
  //  1  2  3  4  5  6  7
  //  8  9 10 11 12 13 14
  // 15 16 17 18 19 20 21
  // 22 23 24 25 26 27 28
  // 29 30 31
  test.equal(time.friday.count(date.local(2012, 00, 01), date.local(2012, 00, 05)), 0);
  test.equal(time.friday.count(date.local(2012, 00, 01), date.local(2012, 00, 06)), 1);
  test.equal(time.friday.count(date.local(2012, 00, 01), date.local(2012, 00, 07)), 1);
  test.equal(time.friday.count(date.local(2012, 00, 01), date.local(2012, 00, 13)), 2);

  //     January 2010
  // Su Mo Tu We Th Fr Sa
  //                 1  2
  //  3  4  5  6  7  8  9
  // 10 11 12 13 14 15 16
  // 17 18 19 20 21 22 23
  // 24 25 26 27 28 29 30
  // 31
  test.equal(time.friday.count(date.local(2010, 00, 01), date.local(2010, 00, 07)), 0);
  test.equal(time.friday.count(date.local(2010, 00, 01), date.local(2010, 00, 08)), 1);
  test.equal(time.friday.count(date.local(2010, 00, 01), date.local(2010, 00, 09)), 1);
  test.end();
});

tape("friday.count(start, end) observes daylight saving", function(test) {
  test.equal(time.friday.count(date.local(2011, 00, 01), date.local(2011, 02, 13, 01)), 10);
  test.equal(time.friday.count(date.local(2011, 00, 01), date.local(2011, 02, 13, 03)), 10);
  test.equal(time.friday.count(date.local(2011, 00, 01), date.local(2011, 02, 13, 04)), 10);
  test.equal(time.friday.count(date.local(2011, 00, 01), date.local(2011, 10, 06, 00)), 44);
  test.equal(time.friday.count(date.local(2011, 00, 01), date.local(2011, 10, 06, 01)), 44);
  test.equal(time.friday.count(date.local(2011, 00, 01), date.local(2011, 10, 06, 02)), 44);
  test.end();
});
