import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Template} from '../../app.interface';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

    @Input() templateCollection: Array<Template>;
    @Output() templateChange = new EventEmitter();
    public selectedTemplate: Template;
    public categoryForm: FormGroup;
    public categories: FormArray;
    public customColors = [
        {
            id: 1,
            color: 'red',
            label: 'Red',
            colorCode: 'rgb(178, 24, 221)'
        },
        {
            id: 2,
            color: 'green',
            label: 'Green',
            colorCode: 'rgb(178, 24, 221)'
        },
        {
            id: 3,
            color: 'blue',
            label: 'Blue',
            colorCode: 'rgb(178, 24, 221)'
        },
        {
            id: 4,
            color: 'orange',
            label: 'Orange',
            colorCode: 'rgb(178, 24, 221)'
        },
        {
            id: 5,
            color: 'Purple',
            label: 'purple',
            colorCode: 'rgb(178, 24, 221)'
        }
    ];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.categoryForm = this.fb.group({
            categories: this.fb.array([
                this.fb.group({
                    name: ['', [Validators.required, Validators.min(5)]],
                    color: ['', [Validators.required, Validators.min(5)]]
                })
            ])
        });
    }

    public selectedTemplateHandler(template: Template) {
        if (template.code && template.code === 'custom') {

        } else {
            this.selectedTemplate = template;
            this.templateChange.emit(this.selectedTemplate);
        }
    }

    public addNewCategory() {
        this.categories = this.categoryForm.get('categories') as FormArray;
        this.categories.push(this.createItem());
    }

    public removeCategory(index) {
        this.categories = this.categoryForm.get('categories') as FormArray;
        this.categories.removeAt(index);
    }

    private createItem(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.min(5)]],
            color: ['', [Validators.required, Validators.min(5)]]
        });
    }
}
