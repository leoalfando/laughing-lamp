import { ErrorStatus } from './../utils/Enum';
/* eslint-disable no-console */
import { promises as fsPromises } from 'fs';
import * as appRoot from 'app-root-path';
import APIException from '../utils/APIException';

export default class Packer{
  public filePath:string;
  public fileContent: string;
  constructor(fileName){
    this.filePath = appRoot + `/dist/resources/${fileName}`;
  }
  public async loadFile():Promise<void> {
    let data= "";
    await fsPromises.readFile(this.filePath, "utf-8").then(function(result) {
      data = result;
    }).catch(() => {
      throw new APIException(ErrorStatus.FILE_NOT_FOUND_OR_INVALID);
    })
    this.fileContent = data;
  }
  public async resolvePacking():Promise<void>{
    console.log('empty');
  }
}
