describe("Checking hit area", function() {

    var mapper;

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

        var subject = {
            height: 400,
            width: 400
        };

        mapper = new Norman(config).mapTo(subject);
    });

    it("can return the correct value when in LEFT BOUNDARY", function () {
        var actual   = mapper.getBoundary("x", 29);
        assert.deepEqual(actual, 0);
    });
    it("can return the correct value when in RIGHT BOUNDARY (2)", function () {
        var actual   = mapper.getBoundary("x", 290);
        assert.deepEqual(actual, -100);
    });
    it("can return the correct value when in RIGHT BOUNDARY (3)", function () {
        var actual   = mapper.getBoundary("x", 301);
        console.log(actual);
        assert.deepEqual(actual, -100);
    });
    it("can return the correct value when in TOP BOUNDARY", function () {
        var actual   = mapper.getBoundary("y", 1);
        assert.deepEqual(actual, 0);
    });
    it("can return the correct value when in TOP BOUNDARY", function () {
        var actual   = mapper.getBoundary("y", 290);
        assert.deepEqual(actual, -100);
    });
});