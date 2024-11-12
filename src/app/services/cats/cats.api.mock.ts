import { Injectable } from "@angular/core";
import { ICatsApi, ICatsData } from "../../models/cats.api.interface";
import { Observable, of, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CatsApiMock implements ICatsApi {
    getData(): Observable<ICatsData> {
        return of({ data: ['test'] });
        // return of({ data: [] });
        // return throwError(() => new Error('Error'));
    }
}