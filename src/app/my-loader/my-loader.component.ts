import { SpinnerService } from './../services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div class="progress-loader" *ngIf="spinner.isVisible() | async">
    <div class="loading-spinner">
        <div class="loader"></div>
    </div>
</div>`,
  styles: ['./my-loader.component.css']
})
export class HttpLoaderComponent implements OnInit {

  constructor(public spinner: SpinnerService) { }
  ngOnInit() {
  }

}
