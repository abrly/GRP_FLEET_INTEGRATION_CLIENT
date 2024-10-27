import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import LPOApiResponse from '../../shared/models/receipt_api_response.model';
import ApiResponse from '../../shared/models/api_response.model';
import ReceiptApiResponse from '../../shared/models/receipt_api_response.model';
import CMLApiResponse from '../../shared/models/cml_api_response.model';

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


  appMessageDialogContent=signal<string>("");

  appMessageDialogClosed=signal<boolean>(false);

 
  setDrawerStatus(status: boolean){   

    this.drawerStatus.set(status);
    
  }


  lpoData = signal< ReceiptApiResponse| {}>({}); 


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




}
