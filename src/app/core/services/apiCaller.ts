import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { apiResponse } from "../models/apiResponse";
import { ToastrService } from 'ngx-toastr';
import { APP_CONFIG, AppConfig } from "app/app-config.module";

@Injectable({ providedIn: "root" })
export class ApiCaller {
    constructor(@Inject(APP_CONFIG) private config: AppConfig,public _httpClient: HttpClient, public toastr: ToastrService) {
    }
    GetData(url: string): Observable<any> {
        //return (this._httpClient.get(`${this.apiUrl}/${url}`));
        return this._httpClient.get(`${this.config.newApiEndPoint}/${url}`).pipe(catchError((err: any): any => {
            this.toastr.error(err, 'Error !', {
                toastClass: 'tostr-tost custom-toast-error',
            });
        }));
    }

    PostData(url: string, data: any) {
        return (this._httpClient.post<any>(`${this.config.newApiEndPoint}/${url}`, data).pipe(map((data: apiResponse) => {
            if (data.StatusCode == 200) {
                return data.Data;
            }
            else {
                this.toastr.error(data.Message, 'Error !', {
                    toastClass: 'tostr-tost custom-toast-error',
                });
            }
        })));
    }
}
