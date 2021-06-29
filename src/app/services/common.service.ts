import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private authService: AuthService, private http: HttpClient) {

    }

    insert(data: any, table_name: any) {
        const url = `${environment.rootUrl + 'insert'}/${table_name}`;
        return this.http.post(url, data).pipe(tap(res => { res }),
            catchError(e => {
                throw new Error(e);
            })
        );
    }

    createdept(data: any, table_name: any) {
        const url = `${environment.rootUrl + 'insertdept'}/${table_name}`;
        return this.http.post(url, data).pipe(tap(res => { res }),
            catchError(e => {
                throw new Error(e);
            })
        );
    }

    // update(funtionName: any, data: any) {
    //     return this.http.put(environment.rootUrl + funtionName, data).pipe(tap(res => { res }),
    //         catchError(e => {
    //             throw new Error(e);
    //         })
    //     );
    // }

    update(data: any, table_name: any) {
        const url = `${environment.rootUrl + 'update'}/${table_name}`;
        return this.http.put(url, data).pipe(tap(res => { res }),
            catchError(e => {
                throw new Error(e);
            })
        );
    }


    updatedata(data: any, table_name: any) {
        const url = `${environment.rootUrl + 'updatedata'}/${table_name}`;
        return this.http.put(url, data).pipe(tap(res => { res }),
            catchError(e => {
                throw new Error(e);
            })
        );
    }

    updateFuction(funtionName: any, data: any) {
        return this.http.put(environment.rootUrl + funtionName, data).pipe(tap(res => { res }),
            catchError(e => {
                throw new Error(e);
            })
        );
    }

    // upload(funtionName: any, data: any) {
    //     return this.http.post(environment.rootUrl + funtionName, data).pipe(tap(res => { res }),
    //         catchError(e => {

    //             throw new Error(e);
    //         })
    //     );
    // }

    // remove(funtionName: any) {
    //     return this.http.delete(environment.rootUrl + funtionName).pipe(tap(res => { res }),
    //         catchError(e => {
    //             throw new Error(e);
    //         })
    //     );
    // }

    getFunction(functionName: any) {
        return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {

            throw new Error(e);
        }));
    }
    // for multiple params
    paramFunction(functionName: any, params: any) {
        const url = environment.rootUrl + functionName + '/' + params;
        return this.http.get(url).pipe(tap(res => res), catchError(e => {
            throw new Error(e);
        }));
    }

}
