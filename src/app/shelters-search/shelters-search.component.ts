import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shelters-search',
  templateUrl: './shelters-search.component.html',
  styleUrls: ['./shelters-search.component.scss']
})
export class SheltersSearchComponent implements OnInit {
  p: any = 1;
  isOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
