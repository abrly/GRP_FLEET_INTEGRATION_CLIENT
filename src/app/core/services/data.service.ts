import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import LPOApiResponse from '../../shared/models/receipt_api_response.model';
import ApiResponse from '../../shared/models/api_response.model';
import ReceiptApiResponse from '../../shared/models/receipt_api_response.model';
import CMLApiResponse from '../../shared/models/cml_api_response.model';
import LogApiResponse from '../../shared/models/log_api_response.model';
import SummaryApiResponse from '../../shared/models/summary_api_response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = environment.API_Prefix ;

  constructor() { }

  private httpService = inject(HttpClient);

  selectedMenu=signal<String | undefined>(undefined);


  setActiveMenu(mnu: string){
    this.selectedMenu.set(mnu);
  }


  drawerStatus=signal<boolean>(true);

  fetchLpoRef=signal<string>("");

  fetchLogCriteria=signal<{fromdt:string,todt:string}>({fromdt:"",todt:""});

  fetchLogFromDt=signal<string | null>(null);
  fetchLogToDt=signal<string | null>(null);
  fetchLogCategory=signal<string | null>(null);
  fetchLogPostingTypeId=signal<string | null>(null);
  fetchLogLpoRefNo=signal<string | null>(null);
  fetchLogSelectionDone=signal<boolean>(false);


  appMessageDialogContent=signal<string>("");

  appMessageDialogClosed=signal<boolean>(false);


  postingTypeId=signal<string>("");
  isReset=signal<string>("");

 
  setDrawerStatus(status: boolean){   

    this.drawerStatus.set(status);
    
  }


  lpoData = signal< ReceiptApiResponse| {}>({}); 

  // region "summary"


  GetPostingDataTotalRecs(
    lpoNo: string,
    postingTypeId:string,
    isReset:string    
  ): Observable<SummaryApiResponse> {

     let params = new HttpParams()
      .set('postingTypeId', postingTypeId.toString())
      .set('isReset', isReset.toString());


      return this.httpService.get<SummaryApiResponse>(`${this.baseURL}po/getPostingDataTotalRecs/${lpoNo}`, { params });

  }



  // end region


  //#region "post receipts"

  getPODetailsFromFleet4ReceiptXport(
    lpoNo: string,
    sortColumn: string = 'LineNo',      
    sortDirection: string = 'ASC',      
    pageNumber: number = 1,             
    pageSize: number = 10                
  ): Observable<ReceiptApiResponse> {


     let params = new HttpParams()
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

      return this.httpService.get<ReceiptApiResponse>(`${this.baseURL}po/getPODetails4ReceiptXport/${lpoNo}`, { params });

  }

  postReceipts2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/postreceipts`,data,{ headers });

  }


  //#endregion


  //#region reset receipts

  getPODetailsFromFleet4ResetReceiptXport(
    lpoNo: string,
    sortColumn: string = 'LineNo',      
    sortDirection: string = 'ASC',      
    pageNumber: number = 1,             
    pageSize: number = 10                
  ): Observable<LPOApiResponse> {


     let params = new HttpParams()
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

      return this.httpService.get<LPOApiResponse>(`${this.baseURL}po/getPODetails4ResetReceiptXport/${lpoNo}`, { params });

  }


  
  resetReceipts2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/resetReceipts`,data,{ headers });

  }

  //#endregion



  //#region "CMLs"

  getPODetailsFromFleet4CMLsXport(
    lpoNo: string,
    sortColumn: string = 'LineNo',      
    sortDirection: string = 'ASC',      
    pageNumber: number = 1,             
    pageSize: number = 10                
  ): Observable<CMLApiResponse> {


     let params = new HttpParams()
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

      return this.httpService.get<CMLApiResponse>(`${this.baseURL}po/getPODetails4CMLsXport/${lpoNo}`, { params });

  }



  postCMLs2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/postcmls`,data,{ headers });

  }



  //#endregion

  //#region Reset CML

  getPODetailsFromFleet4ResetCMLsXport(
    lpoNo: string,
    sortColumn: string = 'LineNo',      
    sortDirection: string = 'ASC',      
    pageNumber: number = 1,             
    pageSize: number = 10                
  ): Observable<CMLApiResponse> {


     let params = new HttpParams()
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

      return this.httpService.get<CMLApiResponse>(`${this.baseURL}po/getPODetails4ResetCMLsXport/${lpoNo}`, { params });

  }


  resetCmls2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/resetCmls`,data,{ headers });

  }



  //#endregion


   //#region "post receipt returns"

   getPODetailsFromFleet4ReceiptReturnsXport(
    lpoNo: string,
    sortColumn: string = 'LineNo',      
    sortDirection: string = 'ASC',      
    pageNumber: number = 1,             
    pageSize: number = 10                
  ): Observable<ReceiptApiResponse> {


     let params = new HttpParams()
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

      return this.httpService.get<ReceiptApiResponse>(`${this.baseURL}po/getPODetails4ReceiptReturnsXport/${lpoNo}`, { params });

  }

  postReceiptReturns2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/postreceiptReturns`,data,{ headers });

  }


  //#endregion

  //#region reset receipt returns

  getPODetailsFromFleet4ResetReceiptReturnsXport(
    lpoNo: string,
    sortColumn: string = 'LineNo',      
    sortDirection: string = 'ASC',      
    pageNumber: number = 1,             
    pageSize: number = 10                
  ): Observable<LPOApiResponse> {


     let params = new HttpParams()
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString());

      return this.httpService.get<LPOApiResponse>(`${this.baseURL}po/getPODetails4ResetReceiptReturnsXport/${lpoNo}`, { params });

  }


  
  resetReceiptReturns2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/resetReceiptReturns`,data,{ headers });

  }

  //#endregion

  //#region   logs


  getPostingLogs(
    fromdate: string,
    todate:string,
    sortColumn: string = 'CreatedOn',      
    sortDirection: string = 'Desc',      
    pageNumber: number = 1,             
    pageSize: number = 10 ,
    postingTypeId: string = 'ALL',
    lpoRefNo: string = ''                      
  ): Observable<LogApiResponse> {


     let params = new HttpParams()
      .set('fromdate', fromdate)
      .set('todate', todate)
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString())
      .set('postingTypeId', postingTypeId.toString())
      .set('lpoRef', lpoRefNo.toString());

      return this.httpService.get<LogApiResponse>(`${this.baseURL}po/getPostingLogs`, { params });

  }


  getPostingResetLogs(
    fromdate: string,
    todate:string,
    sortColumn: string = 'CreatedOn',      
    sortDirection: string = 'Desc',      
    pageNumber: number = 1,             
    pageSize: number = 10 ,
    postingTypeId: string = 'ALL',
    lpoRefNo: string = ''                        
  ): Observable<LogApiResponse> {


     let params = new HttpParams()
      .set('fromdate', fromdate)
      .set('todate', todate)
      .set('SortColumn', sortColumn)
      .set('SortDirection', sortDirection)
      .set('PageNumber', pageNumber.toString())
      .set('PageSize', pageSize.toString())
      .set('postingTypeId', postingTypeId.toString())
      .set('lpoRef', lpoRefNo.toString());
      return this.httpService.get<LogApiResponse>(`${this.baseURL}po/getPostingResetLogs`, { params });

  }


  //#endregion




}
