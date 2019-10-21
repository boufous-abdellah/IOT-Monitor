import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TopicsService } from '../services/topics.service';
import { Topic } from '../topics/topic.module';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-new',
  templateUrl: './new-topic.page.html',
  styleUrls: ['./new-topic.page.scss'],
})
export class NewTopicPage implements OnInit {
  form: FormGroup;

  constructor(private topicsService: TopicsService, private NavCtrl: NavController, private user: UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
      topicname: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  onSubmitAddTopic() {
    const topic = new Topic(
      this.form.value.topicname,
      this.form.value.description);
    this.topicsService.addTopic(topic);
    this.NavCtrl.navigateBack(['/topics']);
    this.form.reset();
  }
}
