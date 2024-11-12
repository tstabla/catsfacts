import { InjectionToken } from "@angular/core";

export const CATS_FACTS_URL = 'https://meowfacts.herokuapp.com/';
export const CATS_API = new InjectionToken<any>('CATS');
