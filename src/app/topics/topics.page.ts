import { Component, OnInit } from '@angular/core';
import { Topic } from './topic.module';
import { TopicsService } from '../services/topics.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {
  userTopics: Topic[];

  constructor(private topicsService: TopicsService, private navCtrl: NavController,
              private authService: AuthenticateService) {}

  ngOnInit() {
    if (!this.authService.userDetails()) {
      this.navCtrl.navigateBack('');
    }
    this.topicsService.topics().subscribe(results => {
    console.log(results);
    this.userTopics = results;
  });
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    });
  }
}
