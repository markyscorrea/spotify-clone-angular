import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista-item-imagem',
  templateUrl: './artista-item-imagem.component.html',
  styleUrls: ['./artista-item-imagem.component.scss']
})
export class ArtistaItemImagemComponent implements OnInit {

  @Input()
  imagemSrc: string = '';
  
  @Input()
  idsSongs: string = '';

  @Output()
  click = new EventEmitter<void>();

  subsPlayOrPause: Subscription[] = [];
  
  constructor(private spotifyService: SpotifyService,
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit(this.execSong(this.idsSongs));
  }

  execSong(id: string){
    this.playerService.execMusic(id)
    this.playerService.validateMusica(false)
  }
}
