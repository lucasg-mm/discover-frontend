import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-creator',
  templateUrl: './track-creator.component.html',
  styleUrls: ['./track-creator.component.css'],
})
export class TrackCreatorComponent implements OnInit {
  newTrackForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newTrackForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      length: [this.length, [Validators.required, Validators.min(1)]],
    });
  }

  @Input()
  title: string = '';

  @Input()
  length: number = 1;

  @Input()
  mode: string = 'creator';

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  @Output()
  submitTrack: EventEmitter<Track> = new EventEmitter();

  // emits an event to make the parent component close the creator
  emitCloseEvent(): void {
    this.close.emit();
  }

  // if the form is valid, emits it
  emitSubmitEvent(form: FormGroup): void {
    if (form.valid) {
      const trackToBeCreated: Track = {
        title: form.value.title,
        length: form.value.length,
      };

      this.submitTrack.emit(trackToBeCreated);
    }
  }

  // tells if the form's field is invalid and if the user already interacted with it
  isFieldInvalidAndInteracted(fieldName: string): boolean {
    const field: AbstractControl | null = this.newTrackForm.get(fieldName);

    if (field === null) {
      return false;
    }

    return field.invalid && (field.dirty || field.touched);
  }
}
