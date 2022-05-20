import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Album } from 'src/app/albums/models/album.model';

@Component({
  selector: 'app-album-creator',
  templateUrl: './album-creator.component.html',
  styleUrls: ['./album-creator.component.css'],
})
export class AlbumCreatorComponent implements OnInit {
  newAlbumForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newAlbumForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      releaseDate: [this.releaseDate, Validators.required],
      label: [this.label],
      length: [this.length, [Validators.required, Validators.min(1)]],
    });
  }

  @Input()
  title: string = "";

  @Input()
  releaseDate: string = ""

  @Input()
  label: string = "";

  @Input()
  length: number = 1;

  @Input()
  mode: string = 'creator';

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  @Output()
  submitAlbum: EventEmitter<Album> = new EventEmitter();

  emitCloseEvent(): void {
    this.close.emit();
  }

  emitSubmitEvent(form: FormGroup): void {
    if (form.valid) {
      const albumToBeCreated: Album = {
        title: form.value.title,
        releaseDate: form.value.releaseDate,
        length: form.value.length,
        label: form.value.label,
      };

      // emits event with the album to be created (that is, only if the form is valid)
      this.submitAlbum.emit(albumToBeCreated);
    }
  }

  isFieldInvalidAndInteracted(fieldName: string): boolean {
    const field: AbstractControl | null = this.newAlbumForm.get(fieldName);

    if (field === null) {
      return false;
    }

    return field.invalid && (field.dirty || field.touched);
  }
}
