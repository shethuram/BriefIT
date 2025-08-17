import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { UploadComponent } from './upload/upload.component';
import { GeneratedSummaryComponent } from './generated-summary/generated-summary.component';
import { ShareSummaryComponent } from './share-summary/share-summary.component';

export const routes: Routes = [

     {path:'', component:RegisterComponent},
     {path:'login',component:LoginComponent},
     {path:'upload',component:UploadComponent ,canActivate:[AuthGuard]},
     {path:'summary',component:GeneratedSummaryComponent ,canActivate:[AuthGuard]},
     {path:'share',component:ShareSummaryComponent ,canActivate:[AuthGuard]}
    
];
