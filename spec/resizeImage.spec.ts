import { createImagePath, isImageExisted, resizeImage } from '../image.service';
import { app } from '..';
import supertest from 'supertest';

describe('resize image service', () => {
  let fileName: string;

  it('create image path', () => {
    fileName = 'test';

    expect(createImagePath(fileName)).toBe(`./images/${fileName}.jpg`);
  });

  it('is image existed', async () => {
    fileName = 'fjord';

    expect(await isImageExisted(fileName)).toBe(true);
  });

  it('is image existed return fail', async () => {
    fileName = 'testFail';

    expect(await isImageExisted(fileName)).toBe(false);
  });
  it('is image existed return fail1', async () => {
    fileName = 'testFail';

    expect(await isImageExisted(fileName)).toBe(false);
  });
  it('is image existed return fail2', async () => {
    fileName = 'testFail';

    expect(await isImageExisted(fileName)).toBe(false);
  });

  it('resize image return buffer', async () => {
    fileName = 'fjord';
    const width: number = 100;
    const height: number = 100;

    expect(1).toBe(1);
    expect(Buffer.isBuffer(await resizeImage(fileName, width, height))).toBe(
      true
    );
  });

  it('11 resize image return buffer', async () => {
    fileName = 'fjord';
    const width: number = 100;
    const height: number = 100;

    expect(await resizeImage(fileName, width, height)).toBeInstanceOf(Buffer);
  });
});

describe('GET /api/image', async () => {
  it('should return buffer data of new image', async () => {
    return await supertest(app)
      .get('/api/images?fileName=fjord&width=200&height=200')
      .expect('Content-Type', 'image/png')
      .expect(200);
  });
});
