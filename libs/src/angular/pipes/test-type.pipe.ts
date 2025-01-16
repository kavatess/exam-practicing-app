import { Pipe, PipeTransform } from '@angular/core';
import { TestTypes } from '../../models/test';

@Pipe({
    name: 'testType',
    standalone: true,
})
export class TestTypePipe implements PipeTransform {
    transform(value: TestTypes): string {
        if (value === TestTypes.Standard) {
            return 'Tiêu chuẩn';
        }
        if (value === TestTypes.Practice) {
            return 'Luyện tập';
        }
        return null;
    }
}
