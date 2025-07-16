/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { delay, of, timeout } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CourseUnitService {
    createPracticeTest(unitId: string) {
        return of('1').pipe(delay(1500));
    }
}
