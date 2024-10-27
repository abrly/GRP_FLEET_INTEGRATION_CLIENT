import Post_Lpo_Line from "./post_lpo_line.model";

export class Post_Lpo_Request {
    PONo:string;
    PostingDate:Date;
    InvoiceNo:string;
    TotalInvoiceValue:number;
    TotalVATValue:number;
    TotalInvoiceValueWithVAT:number;
    Remarks:string;
    CreatedBy:string;
    RowIds:string;
    Merged_All_Line_Desc:string;
    lpo_posting_lpo_lines: Post_Lpo_Line[]
  
    constructor(
      poNo:string,
      postingDate:Date,
      invoiceNo:string,
      totalInvoiceValue:number,
      totalVATValue:number,
      totalInvoiceValueWithVAT:number,
      remarks:string,
      createdBy:string,
      rowids:string,
      merged_All_Line_Desc:string,
      lpo_posting_lpo_lines: Post_Lpo_Line[]
    ) {
      this.PONo = poNo;
      this.PostingDate = postingDate;
      this.InvoiceNo = invoiceNo;
      this.TotalInvoiceValue = totalInvoiceValue;
      this.TotalVATValue = totalVATValue;
      this.TotalInvoiceValueWithVAT = totalInvoiceValueWithVAT;
      this.Remarks = remarks;
      this.CreatedBy = createdBy;
      this.RowIds = rowids;
      this.Merged_All_Line_Desc = merged_All_Line_Desc;
      this.lpo_posting_lpo_lines = lpo_posting_lpo_lines;    
    }
  }
  
  export default Post_Lpo_Request;
  