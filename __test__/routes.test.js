const app = require("../index")

const supertest = require('supertest')
const request = supertest(app)

it("should shown all people data", async ()=> {
    const response = await request.get("/peoples");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
})

it("should shown detail of people data by id", async () => {
    const response = await request.get("/peoples/19");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
})

it("should shown list of people data by search query", async () => {
    const response = await request.get("/peoples?q=\"fauzi\"");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
})

it("should delete people based on id", async () => {
    const response = await request.delete("/peoples/13");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
})