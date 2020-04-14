const chai = require('chai');
const expect = chai.expect;
const fs = require('fs-extra');
import path from 'path';
import unzip from '../../src/commander/unzip';

describe('test unzip', () => {
  const rootPath = 'testCache';
  
  after(() => {
    fs.removeSync(rootPath);
  });
  
  it('unzip a valid file, it will be unzipped successfully', async () => {
    const mockSource = path.join(rootPath, 'unzip', 'index.html.gzip');
    fs.ensureFileSync(mockSource);
    const mockDestination = path.join(rootPath, 'unzip', 'index.html');
    expect(fs.pathExistsSync(mockSource)).equals(true);
    await unzip({
      source: mockSource,
      destination: mockDestination,
      type: 'gzip'
    });
    expect(fs.pathExistsSync(mockDestination)).equals(true);
  });
  
  it('unzip an invalid file, it will throw an error', async () => {
    const result = await unzip({
      source: '',
      destination: ''
    });
    expect(result).to.be.an.instanceOf(Error);
  });
});