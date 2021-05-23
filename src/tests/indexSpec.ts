import supertest from "supertest";
import routes from "../routes";
import app from "../index";

const request = supertest(app)
describe('Test endpoint response', () => {
    it('gets the api/images endpoint ', async (done) => {
        const response = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(response.status).toBe(200);
        done();
    })
})
describe('Image transform function should resolve or reject', () => {
    it('expect transform to not throw error ', async (done) => {
        const response = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(response.status).toBe(200);
        done();
    })
    it('expect transform to  throw no input file error ', async (done) => {
        const response = request.get('/api/images?filename=fjord&width=200&height=200').end(done);
    })
    it('expect transform to throw no file name error ', async (done) => {
        const response = request.get('/api/images?width=200&height=200').end(done);
    })
})
