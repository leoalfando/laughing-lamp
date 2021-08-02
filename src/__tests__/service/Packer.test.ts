/* eslint-disable no-console */
import { ErrorStatus } from './../../utils/Enum';
import * as sinon from 'sinon';
import context from 'jest-plugin-context';
import Packer from '../../service/Packer';
import { assert } from 'chai';
import * as _ from 'lodash';


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
      const expectedResult = '4<br/>-<br/>7,2<br/>8,9';
      // Act
      const result = await packer.resolveContent(fileName);

      //Assert
      assert.isNotEmpty(packer.fileContent);
      assert.isAtLeast(_.size(packer.compiledContent?.contents), 1);
      expect(result).toEqual(expectedResult);
    });

    it('should return error', async ()=>{
      // Arrange
      const fileName = 'wrong_file_name';

      // Act
      const result = await packer.resolveContent(fileName);

      // Assert
      expect(result).toEqual(ErrorStatus.FILE_NOT_FOUND_OR_INVALID);
      assert.isUndefined(packer.fileContent);
      assert.isUndefined(packer.compiledContent);
    });

  });
});
