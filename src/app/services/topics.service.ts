import { Injectable } from '@angular/core';
import { Topic } from '../topics/topic.module';
import { Subject, Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class TopicsService {
  topicsChanged = new Subject<Topic[]>();
  // tslint:disable-next-line: variable-name
  data: Observable<any[]>;
  ref: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService) { }

  addTopic(topicToAdd: Topic) {
    const user = this.userService.useruid;

    const {name, description} = topicToAdd;
    const combined = 'Topic Name : ' + name + ', Description :' + description + ', Userid :' + user;

    this.ref = this.db.list('topics', ref => ref.orderByChild('combined').equalTo(combined));
    const subscription = this.ref.valueChanges().subscribe(resultat => {
      if (resultat.length === 0) {
        this.ref.push({name , description, useruid: user, combined});
        subscription.unsubscribe();
      }
    });
  }

  removeTopic(topic: Topic) {
    const user = this.userService.useruid;
    const {name, description} = topic;
    const combined = 'Topic Name : ' + name + ', Description :' + description + ', Userid :' + user;
    this.ref = this.db.list('topics', ref => ref.orderByChild('combined').equalTo(combined));
    const subscription = this.ref.snapshotChanges().subscribe(results => {
      this.db.list('topics').remove(results[0].key);
      subscription.unsubscribe();
    });
  }

  // topics useruid
  topics() {
    const user = this.userService.useruid;
    this.ref = this.db.list('topics', ref => ref.orderByChild('useruid').equalTo(user));
    return this.ref.valueChanges();
  }
}
