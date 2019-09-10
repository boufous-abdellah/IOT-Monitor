import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable, Subscription } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Topic } from '../topics/topic.module';
import { TopicsService } from '../services/topics.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-topic-graph',
  templateUrl: './topic-graph.page.html',
  styleUrls: ['./topic-graph.page.scss'],
})

export class TopicGraphPage implements OnInit {
  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;
  subscription: Subscription;
  topic: Topic = new Topic('', 0, '', '', '', '');
  private lineChart: Chart;
  lineChartdata: Observable<any[]> = null;
  ref: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private topics: TopicsService,
              private alertCtrl: AlertController,
              private topicsService: TopicsService,
              private userService: UserService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('topickey')) {
        this.navCtrl.navigateBack('topics');
        return;
      }
      this.topics.topics().subscribe(results => {
        this.topic = results[paramMap.get('topickey')]; });
    });
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('topickey')) {
        this.navCtrl.navigateBack('topics');
        return;
      }
      this.subscription = this.topics.topics().subscribe(results => {
        const user = this.userService.useruid;
        this.topic = results[paramMap.get('topickey')];
        const {url , port, name , username, password} = this.topic;
        const combined = url + '/' + port + '/' + name + '/' + username + '/' + password + '/' + user;
        console.log(combined);
        this.ref = this.db.list(combined, ref => ref.orderByChild('time').limitToLast(5));

        this.ref.valueChanges().subscribe(result => {
        this.createCharts(result);
    });
      });
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  createCharts(result: Array<any>) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: result.map( a => a.time),
        datasets: [
          {
            data: result.map( a => a.value),
            label: this.topic.name,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false
          }
        ]
      }
    });
    console.log(result);
  }

  async removeTopic() {
    const alert = await this.alertCtrl.create({
      header: 'Are you Sure ?',
      subHeader: 'do you wanna delete this Topic : ',
      message: this.topic.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          handler: () => {
            this.topicsService.removeTopic(this.topic);
            this.navCtrl.navigateBack('topics');
          }
        }
      ]
    });
    await alert.present();
  }
}
