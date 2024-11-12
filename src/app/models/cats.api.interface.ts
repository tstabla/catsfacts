import { Observable } from "rxjs";

export interface ICatsData {
    data: string[];
}

export interface ICatsApi {
    getData(): Observable<ICatsData>;
}

export interface ICatsFact {
    id: number;
    fact: string;
}