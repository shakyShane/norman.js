describe("Checking the relative offset of subject -> viewbox for centering", function() {

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

    it("can return the relative offset on X axis", function () {
        var actual = mapper.getRelativeOffset("x");
        assert.deepEqual(actual, -50);
    });
    it("can return the relative offset on X axis (2)", function () {
        mapper.viewBox.width = 200;
        var actual = mapper.getRelativeOffset("x");
        assert.deepEqual(actual, -100);
    });

    it("can return the relative offset on y axis", function () {
        var actual = mapper.getRelativeOffset("y");
        assert.deepEqual(actual, -50);
    });
    it("can return the relative offset on y axis (2)", function () {
        mapper.viewBox.height = 200;
        var actual = mapper.getRelativeOffset("y");
        assert.deepEqual(actual, -100);
    });
    it("can return the relative offset on y axis (2)", function () {
        mapper.viewBox.height = 100;
        var actual = mapper.getRelativeOffset("y");
        assert.deepEqual(actual, -150);
    });
});