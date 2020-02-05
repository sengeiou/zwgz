import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//redirectTo: 'topicshare', pathMatch: 'full'
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
  { path: 'question-summary', loadChildren: './question-summary/question-summary.module#QuestionSummaryPageModule' },
  { path: 'question-reply', loadChildren: './question-reply/question-reply.module#QuestionReplyPageModule' },
  { path: 'question', loadChildren: './question/question.module#QuestionPageModule' },
  { path: 'info-center', loadChildren: './info-center/info-center.module#InfoCenterPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },
  { path: 'valuationrecord', loadChildren: './valuationrecord/valuationrecord.module#ValuationrecordPageModule' },
  { path: 'paymentrecord', loadChildren: './paymentrecord/paymentrecord.module#PaymentrecordPageModule' },
  { path: 'myfav', loadChildren: './myfav/myfav.module#MyfavPageModule' },
  { path: 'content', loadChildren: './content/content.module#ContentPageModule' },
  { path: 'myfocus', loadChildren: './myfocus/myfocus.module#MyfocusPageModule' },
  { path: 'myquestion', loadChildren: './myquestion/myquestion.module#MyquestionPageModule' },
  { path: 'myreply', loadChildren: './myreply/myreply.module#MyreplyPageModule' },
  { path: 'mycontent', loadChildren: './mycontent/mycontent.module#MycontentPageModule' },
  { path: 'applyrefund', loadChildren: './applyrefund/applyrefund.module#ApplyrefundPageModule' },
  { path: 'refundsuccess', loadChildren: './refundsuccess/refundsuccess.module#RefundsuccessPageModule' },
  { path: 'wxauthlogin', loadChildren: './wxauthlogin/wxauthlogin.module#WxauthloginPageModule' },
  { path: 'changename', loadChildren: './changename/changename.module#ChangenamePageModule' },
  { path: 'topicshare', loadChildren: './topicshare/topicshare.module#TopicsharePageModule' },
  { path: 'topiclist', loadChildren: './topiclist/topiclist.module#TopiclistPageModule' },
  { path: 'companyshare', loadChildren: './companyshare/companyshare.module#CompanysharePageModule' },
  { path: 'image-viewer', loadChildren: './image-viewer/image-viewer.module#ImageViewerPageModule' },  { path: 'pay', loadChildren: './pay/pay.module#PayPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
