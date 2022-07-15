import { Component, OnDestroy, OnInit } from '@angular/core';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-lista-musica',
  templateUrl: './lista-musica.component.html',
  styleUrls: ['./lista-musica.component.scss']
})
export class ListaMusicaComponent implements OnInit, OnDestroy {

  bannerImagemUrl = '';
  bannerTexto = '';

  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  playIcone = faPlay;

  title = '';

  subs: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  obterMusicas(){
    const sub = this.activatedRoute.paramMap
      .subscribe(async params => {
        this.obterPlaylist(params.get('id'))
      })

    this.subs.push(sub)
  }

  async obterPlaylist(id: string){
    const p = await this.spotifyService.buscarMusicasPlaylist(id)
    this.definirDadosPagina(p.nome, p.imagemURL, p.musicas)
    this.title = `Músicas Playlist: ${p.nome}`
  }

  definirDadosPagina(bannerTexto: string, bannerImg: string, musicas: IMusica[] ){
    this.bannerImagemUrl = bannerImg
    this.bannerTexto = bannerTexto
    this.musicas = musicas
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ')
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id)
    this.playerService.definirMusicaAtual(musica)
    this.playerService.validateMusica(false)
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica
    })

    this.subs.push(sub);
  }

}
