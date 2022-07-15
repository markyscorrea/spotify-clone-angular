import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit {

  pesquisaRecente: string[] = [
    'As 10+ MarX', 'MPB', 'Sertanejo', 'Reggae', 'Hip-Hop'
  ];

  campoPesquisa = ''

  constructor() { }

  ngOnInit(): void {
  }

  definirPesquisa(pesquisa: string){
    this.campoPesquisa = pesquisa;
  }

  buscar(){
    console.log('realizando pesquisa de ', this.campoPesquisa)
    this.campoPesquisa = ''
  }

}
