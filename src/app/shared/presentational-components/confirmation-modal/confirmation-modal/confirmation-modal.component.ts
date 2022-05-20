import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  confirm: EventEmitter<void> = new EventEmitter();

  emitCloseEvent(): void {
    this.close.emit();
  }

  emitConfirmEvent(): void{
    this.confirm.emit();
  }
}
