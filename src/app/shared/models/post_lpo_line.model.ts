export class Post_Lpo_Line {

    SupplierNo:string;
    SupplierName:string;
    LineNo:number;
    VAT:number;
    Site:string;
    TotalCost:number;
    RowId:number;
  
    constructor(
      supplierNo:string,
      supplierName:string,
      lineNo:number,
      vat:number,
      site:string,
      totalCost:number,
      rowId:number
    ) {
      this.SupplierNo = supplierNo;
      this.SupplierName = supplierName;
      this.LineNo = lineNo;
      this.VAT= vat;
      this.Site = site;
      this.TotalCost= totalCost;
      this.RowId = rowId;   
    }
  }
  
  export default Post_Lpo_Line;
  