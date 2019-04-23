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
  { path: 'result', loadChildren: './result/result.module#ResultPageModule' },
  { path: 'topic', loadChildren: './topic/topic.module#TopicPageModule' },
  { path: 'topic2', loadChildren: './topic2/topic2.module#Topic2PageModule' },
  { path: 'question-submit', loadChildren: './question-submit/question-submit.module#QuestionSubmitPageModule' },
  { path: 'question-summary', loadChildren: './question-summary/question-summary.module#QuestionSummaryPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
