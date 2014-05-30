describe("Checking hit area", function() {

    var viewBox, subject, mapper;

    beforeEach(function () {

        var config = {
            viewBox: {
                height: 300,
                width: 300,
                x: 0,
                y: 0
            },
            boundary: 30
        };

        subject = {
            height: 400,
            width: 400
        };

        mapper = new Norman(config)
            .mapTo(subject);
    });

    it("can return an entered boundary (LEFT) ", function () {
        var actual   = mapper.checkBoundary("x", 29);
        var expected = "LEFT";
        assert.deepEqual(actual, expected);
    });
    it("can return an entered boundary (LEFT) (2) ", function () {
        var actual   = mapper.checkBoundary("x", 31);
        var expected = false;
        assert.deepEqual(actual, expected);
    });
    it("can return an entered boundary (LEFT) (3) ", function () {
        var actual   = mapper.checkBoundary("x", 30);
        var expected = "LEFT";
        assert.deepEqual(actual, expected);
    });

    it("can return an entered boundary (RIGHT) ", function () {
        var actual   = mapper.checkBoundary("x", 290);
        var expected = "RIGHT";
        assert.deepEqual(actual, expected);
    });
    it("can return an entered boundary (RIGHT) (2) ", function () {
        var actual   = mapper.checkBoundary("x", 269);
        var expected = false;
        assert.deepEqual(actual, expected);
    });
    it("can return an entered boundary (RIGHT) (3) ", function () {
        var actual   = mapper.checkBoundary("x", 270);
        var expected = "RIGHT";
        assert.deepEqual(actual, expected);
    });
});