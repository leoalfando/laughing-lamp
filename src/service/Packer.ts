import { ContentData } from '../class/ContentData';
import { Content } from '../class/Content';
import { CompiledContent } from './../class/CompiledContent';
import { ErrorStatus } from './../utils/Enum';
/* eslint-disable no-console */
import { promises as fsPromises } from 'fs';
import * as appRoot from 'app-root-path';
import APIException from '../utils/APIException';
import * as _ from 'lodash';

export default class Packer{
  public filePath:string;
  public fileContent: string;
  public compiledContent: CompiledContent;
  private weightMultiplier = 100;
  private emptyResult = '-';
  private showDebug = process.env.NODE_ENV === 'development'? true:false;

  public async resolveContent(fileName):Promise<string>{
    try {
      await this.loadFile(fileName);
      await this.compileContent();
      const promises = this.compiledContent?.contents?.map((content, key)=>{
        return this.processData(content, key+1);
      })
      const results = await Promise.all(promises);
      return results.join('<br/>');
    } catch (error) {
      return error.message;
    }

  }

  private processData(rowData:Content, lineNo:number):string{
    try {
      let maxWeight = rowData.maxWeight;
      // remove item which weight is exceed limit
      let items = rowData.data;
      // sort item by weight ascending, since we prioritize lighter item
      items = _.sortBy(items,['itemWeight']) as ContentData[];
      const itemsLength = items?.length;
      if(itemsLength === 0 || _.isNil(itemsLength)){
        // if line is empty or format is wrong
        throw new APIException(`Line ${lineNo} is invalid or empty`);
      }
      // break down data to it's own array
      const indexes = new Array(itemsLength+1);
      const weights = new Array(itemsLength+1);
      const costs = new Array(itemsLength+1);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        indexes[i + 1] = item.itemIndex
        weights[i + 1] = item.itemWeight;
        costs[i + 1] = item.cost;
      }
      // if there's only 1 item and weight less than maximum weight pick said item
      if(itemsLength === 1 && items[0].itemWeight <= maxWeight){
        return [items[0].itemIndex].join(',');
      }
      const n = indexes.length;
      const m = maxWeight+1;
      const array = [];
      // fill in first index of data with 0 as starter data in case maxweight is 0
      for(let i = 0; i < n; i++) {
        array.push(new Array(m));
        array[i][0] = 0; // 0 cost
      }

      // start process (big O(n^n)complexity)
      for (let i = 1; i < n; i++) {
        for (let w = 1; w <= maxWeight; w++) {
          let cost1 = 0, cost2 = 0;
          // include if current item weight less than current weight iteration
          if (weights[i] <= w) {
            cost1 = costs[i] + (array[i - 1][w - weights[i]]? array[i - 1][w - weights[i]]: 0);
          }
          // exclude the item
          cost2 = array[i - 1][w]? array[i - 1][w]: 0;
          // take maximum
          array[i][w] = Math.max(cost1, cost2);
        }
      }
      // find best option
      const bestOption = [];
      // total profile will be location to the end of the array
      let totalProfit = array[weights.length - 1][maxWeight];
      // iterate and remove weight from maximum weight until we use all the space (no more item fit into the package)
      for (let i = weights.length - 1; i > 0; i--) {
        const currCost = array[i - 1][maxWeight]?array[i - 1][maxWeight]:0;
        if (totalProfit != currCost) {
          bestOption.push(indexes[i]);
          maxWeight -= weights[i];
          totalProfit -= costs[i];
        }
      }
      // if no valid result found fill array with 1 `-`
      if(bestOption.length === 0){
        bestOption.push(this.emptyResult)
      }
      return bestOption.join(',');
    } catch (error) {
      if(this.showDebug){
        console.error(error);
      }
      return error.message;
    }
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

  public compileContent():void{
    // break file content by line
    const fileContentPerLine = this.fileContent.split('\n');

    if(fileContentPerLine.length < 1){
      // if file content is empty throw error stop the process
      throw new APIException(ErrorStatus.FILE_IS_EMPTY);
    }
    // split max weight and items data
    const maxWeightAndData = fileContentPerLine.map(line=>{
      const contents = line.split(' : ');
      return contents;
    });

    const contents:Content[] = maxWeightAndData.map(data=>{
      const parcel = new Content();
      // multiple weight by 100, it will be use as index of array
      parcel.maxWeight = Number(data[0]) * this.weightMultiplier;
      parcel.maxWeight = Number(parcel.maxWeight.toFixed(0));
      const parcelDataString  = data[1]?.split(' ');
      parcel.data = parcelDataString?.map(dataString=>{
        return this.adaptContentData(dataString);
      });
      return parcel;
    });
    const result = new CompiledContent();
    result.contents = contents;
    this.compiledContent = result;
  }

  // adapt content data to parcelData object
  private adaptContentData(dataString:string):ContentData{
    let parcelData = new ContentData();
    try {
      const trimDataString = dataString.replace(/[{()}]/g, '');
      const dataArray = trimDataString.split(',');
      parcelData.itemIndex = Number(dataArray[0]);
      parcelData.itemWeight = ((Number(dataArray[1]) ? Number(dataArray[1]): 0) * this.weightMultiplier);
      parcelData.itemWeight = Number(parcelData.itemWeight.toFixed(0));
      parcelData.cost = Number(dataArray[2].replace(/€/g, "")) ? Number(dataArray[2].replace(/€/g, "")) : 0;
    } catch (error) {
      parcelData = null;
    }
    return parcelData
  }
}
