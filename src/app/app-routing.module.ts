import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'topics', loadChildren: './topics/topics.module#TopicsPageModule' },
  { path: 'new-topic', loadChildren: './new-topic/new-topic.module#NewTopicModule'},
  { path: 'topic-graph/:topickey', loadChildren: './topic-graph/topic-graph.module#TopicGraphPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

