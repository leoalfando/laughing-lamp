import { ErrorStatus } from './../../utils/Enum';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import Packer from '../../service/Packer';
import { assert } from 'chai';
import APIException from '../../utils/APIException';


describe('Packer', () => {
  const sandbox: any = sinon.createSandbox();
  afterEach(() => {
    sandbox.restore();
  });
  context('#loadFile#', () => {
    it('should be able to load file', async () => {
      // Arrange
      const fileName = 'example_input';
      const packer = new Packer(fileName);
      await packer.loadFile();
      assert.isNotEmpty(packer.fileContent)
    });
    it('should throw error', async ()=>{
      let thrownError;
      const fileName = 'wrong_file_name';
      const packer = new Packer(fileName);
      try {
        await packer.loadFile();
      }
      catch(error) {
        thrownError = error;
      }
      expect(thrownError).toEqual(new APIException(ErrorStatus.FILE_NOT_FOUND_OR_INVALID));
    })

  });
});
