
interface LoginApiResponse {

    statusCode:number;
    message:string;
    data: {
        responseCode: string;
        responseDesc: string;
        authToken:string;      
    }  
  }

  export default LoginApiResponse;