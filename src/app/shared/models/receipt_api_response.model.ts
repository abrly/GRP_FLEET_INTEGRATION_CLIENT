import LPO from "./lpo.model";

interface ReceiptApiResponse {
    statusCode:number;
    message:string;
    data: LPO[]; 
    totalItems: number; 
    totalInvoiceValue: number; 
    totalVATValue: number; 
    totalInvoiceValueWithVAT: number; 
  }


  export default ReceiptApiResponse;