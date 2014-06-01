describe("Get a normalised value minus boundaries", function() {

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


    it("can return norm", function () {
        var actual = mapper.getNormValue("x", 0);
        assert.deepEqual(actual, -0.125);
    });
    it("can return the relative offset on X axis", function () {
        var actual = mapper.getNormValue("x", 150);
        assert.deepEqual(actual, 0.5);
    });
});