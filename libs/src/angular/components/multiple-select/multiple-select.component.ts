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

    onChange = (val: any[]) => {};
    onTouched = () => {};

    multiSelect = this.fb.array([]);
    selectedOptions: Option[] = [];
    subscription: Subscription = null;

    get displayText(): string {
        return this.selectedOptions.map((opt) => opt.title).join(', ');
    }

    ngOnInit(): void {
        this.subscription = this.multiSelect.valueChanges.subscribe((val) => {
            this.selectedOptions = this.options.filter((opt, i) => val[i]);
            this.onChange(this.selectedOptions.map((opt) => opt.value));
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options']) {
            console.log(this.options)
            this.multiSelect.clear({
                emitEvent: false,
            });
            this.options.forEach(() => {
                this.multiSelect.push(this.fb.control(false), {
                    emitEvent: false,
                });
            });
        }
    }

    writeValue(items: any[]): void {
        if (this.options.length > 0) {
            this.selectedOptions = this.options.filter((opt) =>
                items.includes(opt.value)
            );
        } else {
            this.selectedOptions = items.map((item) => ({
                value: item,
                title: item,
            }));
        }

        this.options.forEach(({ value }, index) => {
            if (items.includes(value)) {
                this.multiSelect.at(index).patchValue(true, {
                    emitEvent: false,
                });
            }
        });
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
