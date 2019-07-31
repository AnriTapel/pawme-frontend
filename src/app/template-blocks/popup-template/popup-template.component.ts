import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-template',
  templateUrl: './popup-template.component.html',
  styleUrls: ['./popup-template.component.scss']
})
export class PopupTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closePopup(){
    document.getElementById("popup-wrapper").style.visibility = 'hidden';
  }

}
