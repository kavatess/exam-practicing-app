import { Pipe, PipeTransform } from '@angular/core';
import { QuestionDifficulties } from '../../models/question';

@Pipe({
    name: 'questionDiff',
    standalone: true,
})
export class QuestionDiffPipe implements PipeTransform {
    transform(value: QuestionDifficulties): string {
        if (value === QuestionDifficulties.Easy) {
            return 'Dễ';
        }
        if (value === QuestionDifficulties.Medium) {
            return 'Tiêu chuẩn';
        }
        if (value === QuestionDifficulties.Advanced) {
            return 'Nâng cao';
        }
        if (value === QuestionDifficulties.Hard) {
            return 'Rất khó';
        }
        return null;
    }
}
