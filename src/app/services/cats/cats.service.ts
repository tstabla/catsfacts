import { inject, Injectable, signal } from "@angular/core";
import { CATS_API } from "./cats.config";
import { firstValueFrom, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ICatsData, ICatsFact } from "../../models/cats.api.interface";

@Injectable({
    providedIn: 'root'
})
export class CatsService {
    private catsApi = inject(CATS_API);

    private idsCounter = 0;
    
    factsCollection= signal<ICatsFact[]>([]);

    async getFact(): Promise<string | undefined> {
        const fact = await this.getData();

        if (fact && !this.factsCollection().find((item) => item.fact === fact)) {
            this.factsCollection.update((facts) => [...facts, {id: this.idsCounter++, fact}]);

            return fact;
        }

        return undefined;
    }

    private async getData(): Promise<string | undefined> {
        const fact = signal<string | undefined>(
            await firstValueFrom(
                this.catsApi.getData().pipe(
                    map((data: ICatsData) => data.data[0]),                    
                    catchError((error: any) => {
                        return of(undefined);
                    })
                )
            )
        );

        return fact();
    }
}