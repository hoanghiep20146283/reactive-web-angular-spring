import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChildComponent } from './child.component';
import { UserListComponent } from './user-list/user-list.component';
import { ListCurrentComponent } from './reservations/list-current/list-current.component';
import { LearningCssComponent } from './tutorial/learning-css/learning-css.component';

const appRoutes: Routes = [
  {
    path: 'learning-css',
    component: LearningCssComponent,
  },
  {
    path: 'app/:roomNumber',
    component: AppComponent,
  },
  {
    path: 'current-reservations',
    component: ListCurrentComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'child',
    component: ChildComponent,
  },
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: ':child', component: AppComponent },
];

export const routing = RouterModule.forRoot(appRoutes);
