import { Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbTimepickerAdapter extends NgbTimeAdapter<number> {
    fromModel(value: number): NgbTimeStruct {
        if (value === null) return null;
        value /= 1000;
        const hour = Math.floor(value / 3600);
        const minute = Math.floor((value % 3600) / 60);
        const second = Math.floor(value % 60);
        return { hour, minute, second };
    }

    toModel(time: NgbTimeStruct | null): number {
        if (time === null) return null;
        return (time.hour * 3600 + time.minute * 60 + time.second) * 1000;
    }
}
