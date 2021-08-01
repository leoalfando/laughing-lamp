import { ContentData } from '../class/ContentData';
import { Content } from '../class/Content';
import { CompiledContent } from './../class/CompiledContent';
import { ErrorStatus } from './../utils/Enum';
/* eslint-disable no-console */
import { promises as fsPromises } from 'fs';
import * as appRoot from 'app-root-path';
import APIException from '../utils/APIException';

export default class Packer{
  public filePath:string;
  public fileContent: string;

  public async resolveContent(fileName):Promise<CompiledContent>{
    await this.loadFile(fileName);
    const compiledContent = await this.compileContent();
    console.log('compiledContent',compiledContent);
    return compiledContent;
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

  public async compileContent():Promise<CompiledContent>{
    const fileContentPerLine = this.fileContent.split('\n');
    const maxWeightAndData = await fileContentPerLine.map(line=>{
      const contents = line.split(' : ');
      return contents;
    });

    const contents:Content[] = maxWeightAndData.map(data=>{
      const parcel = new Content();
      parcel.maxWeight = Number(data[0]);
      const parcelDataString  = data[1].split(' ');
      parcel.data = parcelDataString.map(dataString=>{
        return this.resolveContentData(dataString);
      });
      return parcel;
    });
    const result = new CompiledContent();
    result.contents = contents;
    return result;
  }

  private resolveContentData(dataString:string):ContentData{
    const trimDataString = dataString.replace(/[{()}]/g, '');
    const dataArray = trimDataString.split(',');
    const parcelData = new ContentData();
    parcelData.itemIndex = Number(dataArray[0]);
    parcelData.itemWeight = Number(dataArray[1]);
    parcelData.cost = Number(dataArray[2].replace(/€/g, ""));
    return parcelData
  }
}
