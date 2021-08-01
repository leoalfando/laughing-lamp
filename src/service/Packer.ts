import { ErrorStatus } from './../utils/Enum';
/* eslint-disable no-console */
import { promises as fsPromises } from 'fs';
import * as appRoot from 'app-root-path';
import APIException from '../utils/APIException';

export default class Packer{
  public filePath:string;
  public fileContent: string;

  public async resolveContent(fileName):Promise<Packer>{
    await this.loadFile(fileName);
    return new Packer();
  }

  private async loadFile(fileName):Promise<void> {
    let data= "";
    const filePath = appRoot + `/dist/resources/${fileName}`;
    await fsPromises.readFile(filePath, "utf-8").then(function(result) {
      data = result;
    }).catch(() => {
      throw new APIException(ErrorStatus.FILE_NOT_FOUND_OR_INVALID);
    })
    this.fileContent = data;
  }
}
