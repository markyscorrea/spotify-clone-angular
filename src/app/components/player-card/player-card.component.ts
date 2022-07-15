import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPauseCircle, faPlayCircle, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: IMusica = newMusica();

  subs: Subscription[] = [];

  subsPlayOrPause: Subscription[] = [];

  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  playIcone = faPlayCircle;
  pauseIcone = faPauseCircle;

  validatePlayer: boolean = true;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.obterMusicaTocando()
    this.playOrPause()
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.subsPlayOrPause.forEach(s => s.unsubscribe());
  }

  obterMusicaTocando(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica
    })

    this.subs.push(sub)
  }

  playMusica(){
    this.playerService.playMusica();
  }

  pauseMusica(){
    this.playerService.pauseMusica();
  }

  voltarMusica(){
    this.playerService.voltarMusica();
  }

  proximaMusica(){
    this.playerService.proximaMusica();
  }

  playOrPause(){
    const sub = this.playerService.validatePlayer.subscribe(v => {
      this.validatePlayer = v
    })

    this.subsPlayOrPause.push(sub)
  }

}
