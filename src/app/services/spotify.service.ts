import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtista';
import { IdArtista } from 'src/environments/environment.prod';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs
  usuario: IUsuario;

  constructor(private router: Router) { 
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario(){
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token')
    if(!token)
      return false

    try{
      this.definirAccessToken(token)
      await this.obterSpotifyUsuario()
      return !!this.usuario
    }catch(e){
      return false
    }
      
  }

  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo)
  }

  obterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(){
    if(!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token)
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, {offset, limit})
    return playlists.items.map(playlist => SpotifyPlaylistParaPlaylist(playlist))
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId)
   
    if(!playlistSpotify)
      return null

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify)

    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {offset, limit})

    playlist.musicas = musicasSpotify.items.map(m => SpotifyTrackParaMusica(m.track as SpotifyApi.TrackObjectFull))

    return playlist

  }

  async buscarTopArtistas(limit = 10): Promise<IArtista>{
    //const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    const artista = await this.spotifyApi.getArtist(IdArtista, { limit });
    //console.log(artista);
    return SpotifyArtistaParaArtista(artista)
  }

  async buscarTopMusicasArtista(limit = 5): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getArtistTopTracks(IdArtista, 'BR', { limit });
    return musicas.tracks.map(m => SpotifyTrackParaMusica(m))
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({offset, limit})
    return musicas.items.map(musica => SpotifyTrackParaMusica(musica.track))
  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId)
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica>{
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack()
    return SpotifyTrackParaMusica(musicaSpotify.item)
  }

  async voltarMusica(){
    await this.spotifyApi.skipToPrevious();
  }

  async proximaMusica(){
    await this.spotifyApi.skipToNext();
  }

  async playMusica(){
    await this.spotifyApi.play();
  }

  async pauseMusica(){
    await this.spotifyApi.pause();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
