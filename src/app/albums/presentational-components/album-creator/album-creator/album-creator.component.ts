import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Album } from 'src/app/albums/models/album.model';

@Component({
  selector: 'app-album-creator',
  templateUrl: './album-creator.component.html',
  styleUrls: ['./album-creator.component.css'],
})
export class AlbumCreatorComponent implements OnInit {
  newAlbumForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.newAlbumForm = this.formBuilder.group({
      title: "",
      releaseDate: "",
      label: "",
      length: ""
    });
  }

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  @Output()
  submit: EventEmitter<any> = new EventEmitter();

  emitSubmitEvent(): void {
    this.submit.emit();
  }

  emitCloseEvent(): void {
    this.close.emit();
  }

  onSubmit(form: FormGroup): void{
    console.log(form);
  }
}
