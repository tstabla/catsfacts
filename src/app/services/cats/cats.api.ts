import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CATS_FACTS_URL } from "./cats.config";
import { Observable } from "rxjs";
import { ICatsData, ICatsApi } from "../../models/cats.api.interface";

@Injectable({
    providedIn: 'root'
})
export class CatsApi implements ICatsApi {
    private httpClient = inject(HttpClient);
            
    getData() {
        return this.httpClient.get<ICatsData>(CATS_FACTS_URL);
    }
}