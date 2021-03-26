import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfissionalComponent } from '../../administrador/componentes/profissional/component/profissional.component';

const profissional: Routes = [
    { path: '', component: ProfissionalComponent },
];

@NgModule({
    imports: [RouterModule.forChild(profissional)],
    exports: [RouterModule]
})
export class ProfissionalRoutingModule { }
