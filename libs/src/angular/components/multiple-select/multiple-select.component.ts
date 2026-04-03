/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import {
    Component,
    forwardRef,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface Option {
    title: string;
    value: string | number;
    data?: any;
}

@Component({
    selector: 'app-multiple-select',
    templateUrl: './multiple-select.component.html',
    styleUrls: ['./multiple-select.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        NgbDropdownModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultipleSelectComponent),
            multi: true,
        },
    ],
})
export class MultipleSelectComponent
    implements ControlValueAccessor, OnChanges, OnInit, OnDestroy
{
    private readonly fb = inject(FormBuilder);

    @Input()
    disabled = false;

    @Input()
    options: Option[] = [];

    // @Input()
    // defaultSelectAll = false;

    onChange = (val: any[]) => {};
    onTouched = () => {};

    multiSelect = this.fb.array([]);
    selectedOptions: Option[] = [];
    subscription: Subscription | null = null;

    // private isInitialized = false;

    get displayText(): string {
        if (
            this.selectedOptions.length === this.options.length &&
            this.options.length > 0
        ) {
            return 'Tất cả';
        }
        return (
            this.selectedOptions.map((opt) => opt.title).join(', ') ||
            'Select...'
        );
    }

    ngOnInit(): void {
        this.subscription = this.multiSelect.valueChanges.subscribe((val) => {
            this.selectedOptions = this.options.filter((opt, i) => val[i]);
            this.onChange(this.selectedOptions.map((opt) => opt.value));
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options']) {
            this.rebuildFormControls();
            // if (
            //     this.defaultSelectAll &&
            //     !this.isInitialized &&
            //     this.options.length > 0
            // ) {
            //     this.selectAllOnInit();
            // }
        }
    }

    private rebuildFormControls(): void {
        this.multiSelect.clear({ emitEvent: false });
        this.options.forEach(() => {
            this.multiSelect.push(this.fb.control(false), { emitEvent: false });
        });
    }

    // private selectAllOnInit(): void {
    //     const allValues = this.options.map((opt) => opt.value);
    //     this.writeValue(allValues);
    //     // Propagate the change upwards
    //     this.onChange(allValues);
    //     this.isInitialized = true;
    // }

    writeValue(items: any[]): void {
        if (!items) {
            this.multiSelect.patchValue(
                this.options.map(() => false),
                { emitEvent: false }
            );
            return;
        }

        const selectedValues = new Set(items);
        const newFormValues = this.options.map((opt) =>
            selectedValues.has(opt.value)
        );

        this.multiSelect.patchValue(newFormValues, { emitEvent: false });

        // Update the selectedOptions for display text
        this.selectedOptions = this.options.filter((opt) =>
            selectedValues.has(opt.value)
        );
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
        if (disabled) {
            this.multiSelect.disable();
        } else {
            this.multiSelect.enable();
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
