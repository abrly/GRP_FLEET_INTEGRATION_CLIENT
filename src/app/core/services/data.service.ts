import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import LPO from '../../shared/models/lpo.model';
import { map, Observable } from 'rxjs';
import LPOApiResponse from '../../shared/models/lpo_api_response.model';
import ApiResponse from '../../shared/models/api_response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = environment.API_Prefix ;

  constructor() { }

  private httpService = inject(HttpClient);

  drawerStatus=signal<boolean>(true);

  fetchLpoRef=signal<string>("");

 
  setDrawerStatus(status: boolean){   

    this.drawerStatus.set(status);
    
  }


  lpoData = signal< LPOApiResponse | {}>({}); 


  getPODetailsFromFleet(
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

      return this.httpService.get<LPOApiResponse>(`${this.baseURL}po/getPODetails/${lpoNo}`, { params });

  }

  postLPO2GRP(data:any): Observable<ApiResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json' 
    });
    
    return this.httpService.post<ApiResponse>(`${this.baseURL}po/postlpo`,data,{ headers });

  }


}
