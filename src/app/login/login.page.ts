import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(

    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertCtrl: AlertController

  ) { }

  ngOnInit() {

    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }





  loginUser(value) {
    this.authService.loginUser(value)
    .then(async res => {
      console.log(res);
      if (!res.user.emailVerified) {
        this.errorMessage = 'Please validate your email address. Kindly check your inbox.';
      } else {
      this.errorMessage = '';
      this.navCtrl.navigateForward('topics');
      this.userService.useruid = this.authService.userDetails().uid;
      }
    }, err => {
      this.errorMessage = err.message;
      console.log(err);
      }).finally(async () => {
        if (this.errorMessage !== '') {
        const alert = await this.alertCtrl.create({
          header: 'Error !',
          message: this.errorMessage,
          buttons: [
            {
              text: 'Okay',
              role: 'cancel',
            }
          ]
        });
        await alert.present();
      }
      });
}

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }

  goToForgetPage() {
    this.navCtrl.navigateForward('/forget');
  }

}
