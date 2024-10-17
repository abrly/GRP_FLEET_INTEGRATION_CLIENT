import Post_Lpo_Line from "./post_lpo_line.model";

interface Post_Lpo_Request {
    poNo:string;
    postingDate:Date;
    invoiceNo:string;
    totalInvoiceValue:number;
    totalVATValue:number;
    totalInvoiceValueWithVAT:number;
    remarks:string;
    createdBy:string;
    rowids:string;
    merged_All_Line_Desc:string;
    lpo_posting_lpo_lines: Post_Lpo_Line[]
  }


  export default Post_Lpo_Request;