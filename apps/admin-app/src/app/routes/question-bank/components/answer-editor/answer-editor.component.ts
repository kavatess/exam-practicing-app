import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionTypes } from '@libs/models';
import {
    AdminQuestionChoice,
    AdminQuestionPair,
} from '../../../../shared/models/cms.model';

const CHOICE_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** The answer half of the question editor — one shape per question type. */
@Component({
    selector: 'adm-answer-editor',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './answer-editor.component.html',
    styleUrl: './answer-editor.component.scss',
})
export class AnswerEditorComponent {
    @Input({ required: true }) qType!: QuestionTypes;
    @Input() choices: AdminQuestionChoice[] = [];
    @Input() pairs: AdminQuestionPair[] = [];
    @Input() trueFalseAnswer = true;
    @Input() modelAnswer = '';
    @Input() maxPoints = 10;

    @Output() choicesChange = new EventEmitter<AdminQuestionChoice[]>();
    @Output() pairsChange = new EventEmitter<AdminQuestionPair[]>();
    @Output() trueFalseAnswerChange = new EventEmitter<boolean>();
    @Output() modelAnswerChange = new EventEmitter<string>();
    @Output() maxPointsChange = new EventEmitter<number>();

    private sequence = 0;

    get isMultipleChoice(): boolean {
        return this.qType === QuestionTypes.MultipleChoice;
    }

    get isTrueFalse(): boolean {
        return this.qType === QuestionTypes.TrueFalse;
    }

    get isEssay(): boolean {
        return (
            this.qType === QuestionTypes.EssayAnswer ||
            this.qType === QuestionTypes.ShortAnswer
        );
    }

    get isMatching(): boolean {
        return this.qType === QuestionTypes.Matching;
    }

    addChoice(): void {
        const key = CHOICE_KEYS[this.choices.length] ?? '?';
        this.choicesChange.emit([
            ...this.choices,
            { id: this.nextId('c'), key, text: '', correct: false },
        ]);
    }

    removeChoice(choice: AdminQuestionChoice): void {
        this.choicesChange.emit(
            this.choices
                .filter((item) => item.id !== choice.id)
                .map((item, index) => ({
                    ...item,
                    key: CHOICE_KEYS[index] ?? item.key,
                }))
        );
    }

    /** Multiple choice has exactly one correct answer. */
    markCorrect(choice: AdminQuestionChoice): void {
        this.choicesChange.emit(
            this.choices.map((item) => ({
                ...item,
                correct: item.id === choice.id,
            }))
        );
    }

    updateChoiceText(choice: AdminQuestionChoice, text: string): void {
        this.choicesChange.emit(
            this.choices.map((item) =>
                item.id === choice.id ? { ...item, text } : item
            )
        );
    }

    addPair(): void {
        this.pairsChange.emit([
            ...this.pairs,
            { id: this.nextId('p'), left: '', right: '' },
        ]);
    }

    removePair(pair: AdminQuestionPair): void {
        this.pairsChange.emit(
            this.pairs.filter((item) => item.id !== pair.id)
        );
    }

    updatePair(
        pair: AdminQuestionPair,
        side: 'left' | 'right',
        value: string
    ): void {
        this.pairsChange.emit(
            this.pairs.map((item) =>
                item.id === pair.id ? { ...item, [side]: value } : item
            )
        );
    }

    private nextId(prefix: string): string {
        this.sequence += 1;
        return `${prefix}-new-${this.sequence}`;
    }
}
