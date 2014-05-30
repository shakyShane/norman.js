describe("Checking hit area", function() {

    var viewBox, subject, mapper;

    beforeEach(function () {
        viewBox = {
            height: 300,
            width: 300,
            x: 0,
            y: 0
        };
        subject = {
            height: 400,
            width: 400
        };
        mapper = new Norman({viewBox: viewBox})
            .mapTo(subject);

    });

    it("should with defaults", function() {
        var actual   = mapper.subject.x;
        var expected = 0;
        assert.equal(actual, expected);
    });

    it("can verfify that the coords are inside viewbox (1)", function () {
        var actual = mapper.checkPosition(10, 10);
        assert.deepEqual(actual, true);
    });
    it("can verfify that the coords are inside viewbox (2)", function () {
        var actual = mapper.checkPosition(299, 299);
        assert.deepEqual(actual, true);
    });
    it("can verfify that the coords are outside of the viewbox (1)", function () {
        var actual = mapper.checkPosition(301, 301);
        assert.deepEqual(actual, false);
    });
    it("can verfify that the coords are outside of the viewbox (2)", function () {
        var actual = mapper.checkPosition(100, -1);
        assert.deepEqual(actual, false);
    });
});