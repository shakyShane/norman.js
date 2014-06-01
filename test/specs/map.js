describe("MAP E2E", function() {

    var mapper;

    beforeEach(function () {

        var viewBox = {
            height: 300,
            width: 300,
            x: 0,
            y: 0
        };

        var subject = {
            height: 400,
            width: 400
        };

        mapper = new Norman({viewBox: viewBox}).mapTo(subject);
    });

    it("Can map values (e2e)", function () {
        var actual   = mapper.map(150, 150);
        var expected = {
            x: -50,
            y: -50,
            inHitArea: true,
            inBoundary: false
        };
        assert.deepEqual(actual, expected);
    });

    it("Can map values (e2e) (2)", function () {
        var actual   = mapper.map(300, 0);
        var expected = {
            x: -100,
            y: 0,
            inHitArea: true,
            inBoundary: true
        };
        assert.deepEqual(actual, expected);
    });
});