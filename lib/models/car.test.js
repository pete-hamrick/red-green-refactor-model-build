const fs = require("fs");
const pool = require("../utils/pool");
const Car = require("./car");

describe("Car model", () => {
    beforeEach(() => {
        return pool.query(
            fs.readFileSync(__dirname + "/../../sql/setup.sql", "utf-8")
        );
    });

    it("should insert a new car in the DB", async () => {
        const res = await Car.insert({
            make: "Honda",
            model: "Civic",
            year: 1989,
        });

        expect(res).toEqual({
            id: "1",
            make: "Honda",
            model: "Civic",
            year: 1989,
        });
    });

    it("should find a car by id", async () => {
        await Car.insert({
            make: "Honda",
            model: "Civic",
            year: 1989,
        });

        const res = await Car.findById(1);

        expect(res).toEqual({
            id: "1",
            make: "Honda",
            model: "Civic",
            year: 1989,
        });
    });

    afterAll(() => {
        return pool.end();
    });
});
