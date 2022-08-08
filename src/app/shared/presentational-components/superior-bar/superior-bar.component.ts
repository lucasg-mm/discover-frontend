import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-superior-bar',
  templateUrl: './superior-bar.component.html',
  styleUrls: ['./superior-bar.component.css']
})
export class SuperiorBarComponent implements OnInit {

  constructor(public loginService: LoginService) {
  }

  @Input()
  isLoading: boolean = false;

  @Output()
  create: EventEmitter<any> = new EventEmitter();

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  emitSearchEvent(searchTerm: string): void{
    this.search.emit(searchTerm);
  }

  ngOnInit(): void {
  }

  emitCreateEvent(): void {
    this.create.emit();
  }

}
