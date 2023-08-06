import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChildComponent } from './child.component';

const appRoutes: Routes = [
    {
        path: 'app/:roomNumber',
        component: AppComponent,
    },
    {
        path: 'child',
        component: ChildComponent,
    },
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: ':child', component: AppComponent },
];

export const routing = RouterModule.forRoot(appRoutes);