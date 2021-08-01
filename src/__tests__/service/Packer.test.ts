/* eslint-disable no-console */
import { ErrorStatus } from './../../utils/Enum';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import Packer from '../../service/Packer';
import { assert } from 'chai';
import APIException from '../../utils/APIException';


describe('Packer', () => {
  const sandbox: any = sinon.createSandbox();
  let packer = new Packer();
  beforeEach(()=>{
    packer = new Packer();
  });
  afterEach(() => {
    sandbox.restore();
  });
  context('#resolveContent#', () => {
    it('should be able to load file and resolve the file content', async () => {
      // Arrange
      const fileName = 'example_input';
      const result = await packer.resolveContent(fileName);
      assert.isNotEmpty(packer.fileContent);
      assert.isAtLeast(result?.contents?.length, 1);
    });

    it('should throw error', async ()=>{
      let thrownError;
      const fileName = 'wrong_file_name';
      try {
        await packer.resolveContent(fileName);
      }
      catch(error) {
        thrownError = error;
      }
      expect(thrownError).toEqual(new APIException(ErrorStatus.FILE_NOT_FOUND_OR_INVALID));
    });

  });
});
