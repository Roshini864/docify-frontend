import { Routes } from '@angular/router';
import {Login} from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Register } from './pages/register/register';   
import { authGuard } from './guards/auth-guard';
import { Templates } from './pages/templates/templates';
import { TemplateEditor } from './pages/template-editor/template-editor';
import { Generate } from './pages/generate/generate';
import { History } from './pages/history/history';


export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'dashboard', component: Dashboard, canActivate: [authGuard]},
    {path: 'templates', component: Templates, canActivate: [authGuard]},
    { path: 'templates/new', component: TemplateEditor, canActivate: [authGuard] },
    { path: 'templates/edit/:id', component: TemplateEditor, canActivate: [authGuard] },
    { path: 'templates', component: Templates, canActivate: [authGuard], runGuardsAndResolvers: 'always'},
    {path: 'generate/:id', component: Generate, canActivate: [authGuard] },
    { path: 'history', component: History, canActivate: [authGuard] },
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];
