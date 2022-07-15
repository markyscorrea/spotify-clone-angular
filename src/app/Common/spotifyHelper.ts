import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";
import { addMilliseconds, format } from "date-fns"
import { newMusica, newPlaylist } from "./factories";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
    return {
       id: user.id,
       nome: user.display_name,
       imagemURL: user.images.pop().url
    }
}

export function SpotifyPlaylistParaPlaylist (playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemURL: playlist.images.pop().url
    };
}

export function SpotifySinglePlaylistParaPlaylist (playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist{
    
    if(!playlist)
        return newPlaylist()
    
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemURL: playlist.images.shift().url,
        musicas: []
    };
}

//Usar essa função quando a conta disponibilizar o Array de Top Artistas
/* export function SpotifyArtistaParaArtista (spotifyArtista: SpotifyApi.ArtistObjectFull): IArtista{
    return {
        id: spotifyArtista.id,
        nome: spotifyArtista.name,
        imagemUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url
    }
} */

//Usar essa função quando a conta NÃO disponibilizar o Array de Top Artistas
export function SpotifyArtistaParaArtista (spotifyArtista: SpotifyApi.SingleArtistResponse): IArtista{
    return {
        id: spotifyArtista.id,
        nome: spotifyArtista.name,
        imagemUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url
    }
}

export function SpotifyTrackParaMusica (spotifyTrack: SpotifyApi.TrackObjectFull): IMusica{

    if(!spotifyTrack)
        return newMusica();

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss')
    }

    return {
        id: spotifyTrack.uri,
        nome: spotifyTrack.name,
        album: {
            id: spotifyTrack.album.id,
            nome: spotifyTrack.album.name,
            imagemUrl: spotifyTrack.album.images.shift().url
        },
        artistas: spotifyTrack.artists.map(a => ({
            id: a.id,
            nome: a.name,
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)
    }
}