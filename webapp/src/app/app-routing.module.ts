import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: 'tutorial', component: TutorialComponent },
    { path: 'tutorial/account/:id', component: TutorialComponent },
    { path: 'tutorial/routeClass', component: TutorialComponent },
    { path: '', component: AppComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
