import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Genre } from '../../models/genre.model';

@Component({
  selector: 'app-genre-creator',
  templateUrl: './genre-creator.component.html',
  styleUrls: ['./genre-creator.component.css'],
})
export class GenreCreatorComponent implements OnInit {
  newGenreForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newGenreForm = this.formBuilder.group({
      name: [this.name, Validators.required],
    });
  }

  @Input()
  name: string = '';

  @Input()
  length: number = 1;

  @Input()
  mode: string = 'creator';

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  @Output()
  submitGenre: EventEmitter<Genre> = new EventEmitter();
  
  // emits an event to make the parent component close the creator
  emitCloseEvent(): void {
    this.close.emit();
  }

  // if the form is valid, emits it
  emitSubmitEvent(form: FormGroup): void {
    if (form.valid) {
      const genreToBeCreated: Genre = {
        name: form.value.name,
      };

      this.submitGenre.emit(genreToBeCreated);
    }
  }

  // tells if the form's field is invalid and if the user already interacted with it
  isFieldInvalidAndInteracted(fieldName: string): boolean {
    const field: AbstractControl | null = this.newGenreForm.get(fieldName);

    if (field === null) {
      return false;
    }

    return field.invalid && (field.dirty || field.touched);
  }
}
