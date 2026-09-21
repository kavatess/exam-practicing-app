import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionDifficulties, QuestionTypes } from '@libs/models';
import { ModalShellComponent } from '../../../../../shared/components/modal-shell/modal-shell.component';
import { UnitTransferComponent } from '../../../../../shared/components/unit-transfer/unit-transfer.component';
import {
    AdminQuestion,
    AdminSubject,
    AdminSubUnit,
    AdminUnit,
    DIFFICULTY_LABELS,
    DIFFICULTY_OPTIONS,
    findSubject,
    QuestionMatch,
} from '../../../../../shared/models/cms.model';
import { QuestionDraft } from '../../../store/question-bank.service';
import { AnswerEditorComponent } from '../../answer-editor/answer-editor.component';
import { QuestionMatchesComponent } from '../../question-matches/question-matches.component';

type OpenMenu = 'subject' | 'difficulty' | 'level' | null;

/** Editor tabs. Short answer is filterable but authored as an essay. */
const TYPE_TABS: QuestionTypes[] = [
    QuestionTypes.MultipleChoice,
    QuestionTypes.TrueFalse,
    QuestionTypes.EssayAnswer,
    QuestionTypes.Matching,
];

@Component({
    selector: 'adm-question-modal',
    standalone: true,
    imports: [
        FormsModule,
        ModalShellComponent,
        UnitTransferComponent,
        AnswerEditorComponent,
        QuestionMatchesComponent,
    ],
    templateUrl: './question-modal.component.html',
    styleUrl: './question-modal.component.scss',
})
export class QuestionModalComponent implements OnInit {
    @Input() question: AdminQuestion | null = null;
    @Input() subjects: AdminSubject[] = [];
    @Input() matches: QuestionMatch[] = [];

    @Output() dismiss = new EventEmitter<void>();
    @Output() save = new EventEmitter<QuestionDraft>();
    @Output() remove = new EventEmitter<void>();
    @Output() manageLevels = new EventEmitter<string>();

    readonly menu = signal<OpenMenu>(null);
    /** Set when a subject change dropped a level that belonged to the old one. */
    readonly levelReset = signal(false);

    readonly typeTabs = TYPE_TABS;
    readonly difficultyOptions = DIFFICULTY_OPTIONS;
    readonly difficultyLabels = DIFFICULTY_LABELS;
    readonly editorTools = ['B', 'I', 'U', 'x²', '√', '∑', '" "', '⛶'];

    draft!: QuestionDraft;

    ngOnInit(): void {
        const fallbackSubject = this.subjects[0];
        this.draft = this.question
            ? {
                  subjectId: this.question.subjectId,
                  unitIds: [...this.question.unitIds],
                  subUnitIds: [...this.question.subUnitIds],
                  qType: this.question.qType,
                  difficulty: this.question.difficulty,
                  level: this.question.level,
                  content: this.question.content,
                  solution: this.question.solution,
                  choices: structuredClone(this.question.choices),
                  pairs: structuredClone(this.question.pairs),
                  trueFalseAnswer: this.question.trueFalseAnswer,
                  modelAnswer: this.question.modelAnswer,
                  maxPoints: this.question.maxPoints,
              }
            : {
                  subjectId: fallbackSubject?.id ?? '',
                  unitIds: [],
                  subUnitIds: [],
                  qType: QuestionTypes.MultipleChoice,
                  difficulty: QuestionDifficulties.Easy,
                  level: '',
                  content: '',
                  solution: '',
                  choices: [],
                  pairs: [],
                  trueFalseAnswer: true,
                  modelAnswer: '',
                  maxPoints: 10,
              };
    }

    get eyebrow(): string {
        return this.question ? `Question · ${this.question.id}` : 'Question';
    }

    get title(): string {
        return this.question ? 'Edit question' : 'New question';
    }

    get subject(): AdminSubject | null {
        return findSubject(this.subjects, this.draft.subjectId) ?? null;
    }

    get subjectLabel(): string {
        return this.subject?.name ?? 'Pick a subject';
    }

    get difficultyLabel(): string {
        return this.difficultyLabels[this.draft.difficulty];
    }

    get levelLabel(): string {
        return this.draft.level || 'Pick a level';
    }

    get levels(): string[] {
        return this.subject?.levels ?? [];
    }

    get levelResetNote(): string {
        return `Level reset — pick a new one for ${this.subjectLabel}.`;
    }

    get manageLevelsLabel(): string {
        return `Manage levels for ${this.subjectLabel}`;
    }

    get availableUnits(): AdminUnit[] {
        return this.subject?.units ?? [];
    }

    get taggedUnits(): AdminUnit[] {
        return this.availableUnits.filter((unit) =>
            this.draft.unitIds.includes(unit.id)
        );
    }

    get subUnitPool(): AdminSubUnit[] {
        return this.taggedUnits.flatMap((unit) => unit.subUnits);
    }

    get subUnitLabel(): string {
        const count = this.draft.subUnitIds.length;
        return count ? `${count} TAGGED` : 'NONE TAGGED';
    }

    get matchLabel(): string {
        const count = this.matches.length;
        if (!count) {
            return 'No matches';
        }
        return count === 1 ? 'Matches 1 block' : `Matches ${count} blocks`;
    }

    typeLabel(qType: QuestionTypes): string {
        return {
            [QuestionTypes.MultipleChoice]: 'Multiple choice',
            [QuestionTypes.TrueFalse]: 'True / false',
            [QuestionTypes.EssayAnswer]: 'Essay',
            [QuestionTypes.Matching]: 'Matching',
            [QuestionTypes.ShortAnswer]: 'Short answer',
        }[qType];
    }

    openMenu(menu: OpenMenu): void {
        this.menu.update((current) => (current === menu ? null : menu));
    }

    /**
     * Levels belong to one subject, so switching subject drops the tags that
     * came from the old one rather than carrying them across.
     */
    pickSubject(subject: AdminSubject): void {
        this.menu.set(null);
        if (subject.id === this.draft.subjectId) {
            return;
        }
        this.draft.subjectId = subject.id;
        this.draft.unitIds = [];
        this.draft.subUnitIds = [];
        this.draft.level = '';
        this.levelReset.set(true);
    }

    pickDifficulty(difficulty: QuestionDifficulties): void {
        this.menu.set(null);
        this.draft.difficulty = difficulty;
    }

    pickLevel(level: string): void {
        this.menu.set(null);
        this.draft.level = level;
        this.levelReset.set(false);
    }

    pickType(qType: QuestionTypes): void {
        this.draft.qType = qType;
    }

    setUnits(unitIds: string[]): void {
        this.draft.unitIds = unitIds;
        // Sub-units of a dropped unit can no longer be tagged.
        const pool = this.subUnitPool.map((sub) => sub.id);
        this.draft.subUnitIds = this.draft.subUnitIds.filter((id) =>
            pool.includes(id)
        );
    }

    isSubUnitTagged(subUnitId: string): boolean {
        return this.draft.subUnitIds.includes(subUnitId);
    }

    toggleSubUnit(subUnitId: string): void {
        this.draft.subUnitIds = this.isSubUnitTagged(subUnitId)
            ? this.draft.subUnitIds.filter((id) => id !== subUnitId)
            : [...this.draft.subUnitIds, subUnitId];
    }

    confirm(): void {
        this.save.emit(this.draft);
    }
}
