import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  validationsForm: FormGroup;
  errorMessage = '';
  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
     this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
      });
  }

  forgetPassword(value) {
    this.authService.resetPassword(value.email, async () => {
      const alert = await this.alertCtrl.create({
          header: 'Success !',
          message: 'Reset Email was sent, Go to login page',
          buttons: [
            {
              text: 'Okey',
              handler: () => {
                this.navCtrl.navigateBack('/login');
              },
            }
          ]
        });
      await alert.present();
    },
    async () => {
      const alert = await this.alertCtrl.create({
          header: 'Failed !',
          message: 'No Email Found or Connexion Issue',
          buttons: [
            {
              text: 'Try to Register',
              handler: () => {
                this.navCtrl.navigateBack('/register');
              },
            }
          ]
        });
      await alert.present();
    });
  }
// multiple alert at once when cutting connexion
}
