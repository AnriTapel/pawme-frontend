import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  private questions = [
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
    { collapsed: false, question: 'Can I get a free trial before I purchase?', answer: 'Значимость этих проблем настолько очевидна, что консультация с широким активом способствует подготовки и реализации новых предложений. С другой стороны укрепление и развитие структуры требуют от нас анализа позиций, занимаемых участниками в отношении поставленных задач.' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
