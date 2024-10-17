import LPO from "./lpo.model";

interface LPOApiResponse {
    statusCode:number;
    message:string;
    data: LPO[]; 
    totalItems: number; 
    totalInvoiceValue: number; 
    totalVATValue: number; 
    totalInvoiceValueWithVAT: number; 
  }


  export default LPOApiResponse;