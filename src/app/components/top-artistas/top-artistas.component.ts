import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  musicasArtista: IMusica[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarMusicasArtista();
  }

  async buscarMusicasArtista(){
    const musicas = await this.spotifyService.buscarTopMusicasArtista(5)
    musicas.slice(0,5).forEach(m => this.musicasArtista.push(m))
  }
}
