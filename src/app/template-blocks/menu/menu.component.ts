import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  menuItems = [
    {
      name: 'Топ заводчиков',
      url: '/search-page'
    },
    {
      name: 'База знаний',
      url: '/articles'
    },
    {
      name: 'Для заводчиков',
      url: '/breeder-landing'
    }
  ];

  @Input() showMenu: boolean;
  @Input() state: boolean;
  @Output('detectChangeTopMenu') detectChangeTopMenu: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 400) {
      this.state = true;
    } else {
      this.state = false;
    }
  }
  reloadTopBreeder() {
    console.log('reloadTopBreeder');
    this.detectChangeTopMenu.emit(true);
  }

}
