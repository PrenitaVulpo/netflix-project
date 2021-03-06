import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SeriesPageComponent } from './series-page/series-page.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{ path: 'home', component: HomePageComponent },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
	{ path: 'series', component: SeriesPageComponent, canActivate: [AuthGuard] },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
