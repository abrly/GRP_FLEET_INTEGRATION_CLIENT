import LPO from "./lpo.model";

interface ApiResponse {

    statusCode:number;
    message:string;
    data: LPO[]; 
    totalItems: number; 
    totalInvoiceValue: number; 
    totalVATValue: number; 
    totalInvoiceValueWithVAT: number;
     
  }

  export default ApiResponse;