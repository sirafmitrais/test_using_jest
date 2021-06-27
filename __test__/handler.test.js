const { TestWatcher } = require("jest")
let { mockRequest, mockResponse } = require("jest-mock-req-res")

const handler = require("../handler")


mockRequest = (params, query, body) => (
    {
        params: params,
        query: query,
        body: body,
    }
);

mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};


describe("test handler module positive result", () =>{
    it("should get all people data", async () => {
        const req = mockRequest();
        const res = mockResponse();
        const peoples = await handler.getAll(req, res);
        console.log(peoples);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    it("should get people detail by id", async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            'id':5
        };
        console.log(req);
        const people = await handler.getDetailById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    })
    it("should get data people by query", async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.query = {
            'q':"fauzi"
        };
        const people = await handler.getDetailbySearch(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    it("should create data people", async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            "id": 221,
            "first_name": "fauzi",
            "last_name": "afif",
            "age": 25,
            "adress": "jalan antartika"
        };
        const result = await handler.createData(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    it("should delete data people by id", async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            'id':6
        };
        const result = await handler.deleteByIdUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
    it("should edit data people by id", async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            'id':9
        };
        req.body = {
            "id": 9,
            "first_name": "izzudin",
            "last_name": "ontowiryo",
            "age": 25,
            "adress": "jalan dunia"
        };
        const result = await handler.updateData(req, res);
        expect(result).toHaveProperty('message');
        expect(result.message).toBe("success delete data");
    })
})

describe("test handler negative result", () => {
    it("should return err if delete id is not found", async () =>{
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            'id':900000000
        }
        const result = await handler.deleteByIdUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    })
})