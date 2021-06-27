const dataHandler = require("../dataHandler")

// Positive
it("should test data handler for get all peoples", async () => {
    const peoples = await dataHandler.readAllData();
    console.log(peoples);
    // expect(data.length).toBeGreaterThan(0)
    expect(peoples).toBeDefined()
})

// Negative
it("should test data handler to catch err if cannot read file", async () => {
    const peoples = await dataHandler.readAllData("data_manusia.json");
    console.log("error read all data", peoples);
    expect(peoples).toBeDefined()
})

// Positive
it("should test data handler for get people detail", async () =>{
    const people = await dataHandler.getDetailById(7);
    console.log(people);
    expect(people).toBeDefined();
})

// Negative
it("should test data handler for get people detail with wrong result ", async () => {
    const people = await dataHandler.getDetailById(909999);
    console.log("error get detail people", people);
    expect(people).toBeDefined();
    expect(people.message).toBeDefined();
    expect(people.message).toBe('no result, your id is not found');
})

// positive
it("should delete by id data from file json", async () => {
    const result = await dataHandler.deleteById(9);
    expect(result).toBeDefined();
})

// negative
it("should return err if cannot delete", async () => {
    const result = await dataHandler.deleteById(9000000000);
    console.log("error in delete", result);
    expect(result).toBeDefined();
})

// negative
it("should return err if cannot delete due to file IO error", async () => {
    const result = await dataHandler.deleteById(900000000, "dataDUmmy.json");
    expect(result).toBeDefined();
})

// positive
it("create data to file json", async () => {
    var data_input = {
        "id": 400,
        "first_name": "Sarrif",
        "last_name": "asden",
        "age": 39,
        "adress": "bandung"
    }
    const result = await dataHandler.createData(data_input);
    console.log("data input test", result);
    expect(result).toBeDefined();
    // expect(result).toBe(data_input);
})

// negative
it("not create data to file json instead throw err exception", async () => {
    var data_input = {
        "id": 400,
        "first_name": "Sarrif",
        "last_name": "asden",
        "age": 39,
        "adress": "bandung"
    }
    const result = await dataHandler.createData("dataDummy.json");
    console.log("error create data",result);
    expect(result).toBeDefined();
})

// positive
it("should get all search result by query", async () => {
    var q = "fauzi";
    const result = await dataHandler.getDetailByQuery(q);
    console.log(result);
    expect(result).toBeDefined();
})

// negative
it("should return err if cannot read files from search", async () => {
    var q = "fauzi";
    const result = await dataHandler.getDetailByQuery(q, "dataDummy.json");
    console.log("error search query can't read files", result);
    expect(result).toBeDefined();
})