import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";

export function newArtista(): IArtista{
    return {
        id: '',
        nome: '',
        imagemUrl: ''
    }
}

export function newMusica(): IMusica{
    return {
        id: '',
        nome: '',
        album: {
            id: '',
            nome: '',
            imagemUrl: ''
        },
        artistas: [],
        tempo: ''
    }
}

export function newPlaylist(): IPlaylist{
    return {
        id: '',
        nome: '',
        imagemURL: '',
        musicas: []
    }
}