import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main-content-presentation',
  templateUrl: './main-content-presentation.component.html',
  styleUrls: ['./main-content-presentation.component.css'],
})
export class MainContentPresentationComponent implements OnInit {
  showContent: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }
  onShowContent = () => {
    this.showContent = !this.showContent;
  }
}
