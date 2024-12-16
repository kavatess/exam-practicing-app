import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DropdownItemService {
    getUserStreakDays(): Observable<number> {
        return of(1);
    }

    getUserEnergyAmount(): Observable<number> {
        return of(100);
    }

    getUserGemAmount(): Observable<number> {
        return of(195);
    }
}
