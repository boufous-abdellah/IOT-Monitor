import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TopicsService } from '../services/topics.service';
import { Topic } from '../topics/topic.module';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-new',
  templateUrl: './new-topic.page.html',
  styleUrls: ['./new-topic.page.scss'],
})
export class NewTopicPage implements OnInit {
  form: FormGroup;
  useruid = 'user1';

  constructor(private topicsService: TopicsService, private NavCtrl: NavController) { }

  ngOnInit() {
    this.form = new FormGroup({
      url: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      port: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      topic: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  onSubmitAddTopic() {
    const topic = new Topic(this.form.value.url,
      this.form.value.port,
      this.form.value.topic,
      this.form.value.username,
      this.form.value.password,
      this.useruid);
    this.topicsService.addTopic(topic);
    this.NavCtrl.navigateBack(['/topics']);
    this.form.reset();
  }
}
