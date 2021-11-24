import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  @Input() message = 'Loading, please wait ...';
  constructor() {}

  ngOnInit(): void {}
}
