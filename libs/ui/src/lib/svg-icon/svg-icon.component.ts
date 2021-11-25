import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.css'],
})
export class SvgIconComponent {
  @Input() iconKey = 'solid-question-mark-circle'; // case of no input given
}
