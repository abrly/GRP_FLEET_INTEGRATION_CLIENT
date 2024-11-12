import CML from "./cml.model";


interface CMLApiResponse {
    statusCode:number;
    message:string;
    data: CML[]; 
    totalItems: number; 
    totalInvoiceValue: number; 
    totalVATValue: number; 
    totalInvoiceValueWithVAT: number; 
  }


  export default CMLApiResponse;