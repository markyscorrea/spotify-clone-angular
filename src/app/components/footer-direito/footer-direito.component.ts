import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-footer-direito',
  templateUrl: './footer-direito.component.html',
  styleUrls: ['./footer-direito.component.scss']
})
export class FooterDireitoComponent implements OnInit {

  color: ThemePalette = 'primary';

  constructor() { }

  ngOnInit(): void {
  }

}
