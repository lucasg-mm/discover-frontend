import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Artist } from '../../models/artists.model';

@Component({
  selector: 'app-artist-creator',
  templateUrl: './artist-creator.component.html',
  styleUrls: ['./artist-creator.component.css'],
})
export class ArtistCreatorComponent implements OnInit {
  newArtistForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newArtistForm = this.formBuilder.group({
      name: [this.name, Validators.required],
    });
  }

  @Input()
  name: string = '';

  @Input()
  mode: string = 'creator';

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  @Output()
  submitArtist: EventEmitter<Artist> = new EventEmitter();

  emitCloseEvent(): void {
    this.close.emit();
  }

  emitSubmitEvent(form: FormGroup): void {
    if (form.valid) {
      const artistToBeCreated: Artist = {
        name: form.value.name,
      };

      // emits event with the artist to be created (that is, only if the form is valid)
      this.submitArtist.emit(artistToBeCreated);
    }
  }

  isFieldInvalidAndInteracted(fieldName: string): boolean {
    const field: AbstractControl | null = this.newArtistForm.get(fieldName);

    if (field === null) {
      return false;
    }

    return field.invalid && (field.dirty || field.touched);
  }
}
