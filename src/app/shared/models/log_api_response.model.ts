import Log from "./log.model";

interface LogApiResponse {

    statusCode:number;
    message:string;
    data: Log[];
    totalItems:number;    
  }


  export default LogApiResponse;