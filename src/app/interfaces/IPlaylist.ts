import { IMusica } from "./IMusica";

export interface IPlaylist {
    id: string;
    nome: string;
    imagemURL: string;
    musicas?: IMusica[]
}