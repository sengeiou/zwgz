import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'forcopy', loadChildren: './forcopy/forcopy.module#ForcopyPageModule' },
  { path: 'mobilelogin', loadChildren: './mobilelogin/mobilelogin.module#MobileloginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forgetpassword', loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordPageModule' },
  { path: 'memberinfo', loadChildren: './memberinfo/memberinfo.module#MemberinfoPageModule' },
  { path: 'wxauthlogin', loadChildren: './wxauthlogin/wxauthlogin.module#WxauthloginPageModule' },
  { path: 'company', loadChildren: './company/company.module#CompanyPageModule' },
  { path: 'result', loadChildren: './result/result.module#ResultPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
