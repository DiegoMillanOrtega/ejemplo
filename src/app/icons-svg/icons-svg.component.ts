import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icons-svg',
  templateUrl: './icons-svg.component.html',
})
export class IconsSvgComponent {
  @Input() nombreIcono?: string;
  @Input() anchoPredeterminado: number = 20;
  @Input() altoPredeterminado: number = 20;
  @Input() width?: number;
  @Input() height?: number;
}
