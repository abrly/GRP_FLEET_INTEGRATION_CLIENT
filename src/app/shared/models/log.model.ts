export class Log {
  PostingMainTrxID: number;
  LogCategory: string;
  PostingTypeDescription: string;
  RowId: number;
  CreatedBy: string;
  CreatedOn: string;
  Remarks: string;
  TotalCount:number;    
    constructor(
      PostingMainTrxID: number,
      LogCategory: string,
      PostingTypeDescription: string,
      RowId: number,
      CreatedBy: string,
      CreatedOn: string,
      Remarks: string,
      TotalCount:number    
    ) {
      this.PostingMainTrxID = PostingMainTrxID;
      this.LogCategory = LogCategory;
      this.PostingTypeDescription=PostingTypeDescription;
      this.RowId=RowId;
      this.CreatedBy =CreatedBy;
      this.CreatedOn = CreatedOn;
      this.Remarks= Remarks;
      this.TotalCount = TotalCount;    
    }
  }
  
  export default Log;
  