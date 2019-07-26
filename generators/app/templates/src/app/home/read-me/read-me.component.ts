import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.scss']
})
export class ReadMeComponent implements OnInit {
  generateCommand = 'ng generate component #your-component-name-here# -m home.module';

  constructor() { }

  ngOnInit(): void {
    const breakpointMessage = 'test';
  }
}
