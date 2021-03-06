import { Routes } from "@angular/router";
import { AutenticadoGuard } from "./guards/autenticado.guard";

export const AppRotas: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
            .then(mod => mod.LoginModule)
    },
    {
        path: 'player',
        loadChildren: () => import('./pages/player/player.module')
            .then(mod => mod.PlayerModule),
        canLoad: [AutenticadoGuard]
    },
]