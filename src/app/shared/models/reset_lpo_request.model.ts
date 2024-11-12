
export class Reset_Lpo_Request {
    PONo:string;
    Remarks:string;
    CreatedBy:string;
    RowIds:string;
      
    constructor(
      poNo:string,
      remarks:string,
      createdBy:string,
      rowids:string   
    ) {
      this.PONo = poNo;
      this.Remarks = remarks;
      this.CreatedBy = createdBy;
      this.RowIds = rowids;    
    }
  }
  
  export default Reset_Lpo_Request;
  