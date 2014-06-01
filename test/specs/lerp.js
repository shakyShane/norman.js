describe("Checking whether the current value is within boundaries", function() {

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

    // X - left
    it("can return the relative offset on X axis", function () {
        var actual = mapper.canLerp("x", 0);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on X axis (2)", function () {
        var actual = mapper.canLerp("x", 3);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on X axis (3)", function () {
        var actual = mapper.canLerp("x", 33);
        assert.deepEqual(actual, true);
    });

    // X - right
    it("can return the relative offset on X axis", function () {
        var actual = mapper.canLerp("x", 299);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on X axis (2)", function () {
        var actual = mapper.canLerp("x", 300);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on X axis (3)", function () {
        var actual = mapper.canLerp("x", 260);
        assert.deepEqual(actual, true);
    });

    // Y top
    it("can return the relative offset on Y axis", function () {
        var actual = mapper.canLerp("y", 0);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on Y axis (2)", function () {
        var actual = mapper.canLerp("y", 3);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on Y axis (3)", function () {
        var actual = mapper.canLerp("y", 33);
        assert.deepEqual(actual, true);
    });

    // Y bottom
    it("can return the relative offset on Y axis", function () {
        var actual = mapper.canLerp("y", 300);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on Y axis (2)", function () {
        var actual = mapper.canLerp("y", 271);
        assert.deepEqual(actual, false);
    });
    it("can return the relative offset on Y axis (3)", function () {
        var actual = mapper.canLerp("y", 33);
        assert.deepEqual(actual, true);
    });
});