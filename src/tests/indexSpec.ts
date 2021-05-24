import supertest from 'supertest';
import routes from '../routes';
import app from '../index';
import imageProcess from '../utilities/imageProcess';

const request = supertest(app);
describe('Test endpoint response', () => {
  it('gets the api/images endpoint ', async done => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(200);
    done();
  });
});
describe('Image transform function should resolve or reject', () => {
  it('expect transform to not throw error ', async done => {
    expectAsync(imageProcess.processFile('fjord', '200', '200')).toBeResolved();
    done();
  });
  it('expect transform to  throw missing file properties error ', async done => {
    expectAsync(imageProcess.processFile('', '200', '200')).toBeRejected();
    done();
  });
  it('expect transform to throw no file name error ', async done => {
    expectAsync(
      imageProcess.processFile('fjord1', '200', '200')
    ).toBeRejected();
    done();
  });
});
