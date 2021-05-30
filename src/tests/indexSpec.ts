import supertest from 'supertest';
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
  it('expect to create an image ', async () => {
    const [thumbPath, thumbFile, imageCreated] = await imageProcess.processFile(
      'fjord',
      '450',
      '300'
    );
    expect([thumbPath, thumbFile, imageCreated]).toEqual([
      '/assets/images/thumb/',
      'fjord-450-300.jpg',
      true
    ]);
  });
  it('expect not to create an image ', async () => {
    const [thumbPath, thumbFile, imageCreated] = await imageProcess.processFile(
      'fjord',
      '450',
      '300'
    );
    expect([thumbPath, thumbFile, imageCreated]).toEqual([
      '/assets/images/thumb/',
      'fjord-450-300.jpg',
      false
    ]);
  });
});
