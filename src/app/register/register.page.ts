import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  validationMessages = {
   email: [
     { type: 'required', message: 'Email is required.' },
     { type: 'pattern', message: 'Enter a valid email.' }
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
    private alertCtrl: AlertController
  ) {}

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


  tryRegister(value) {
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = '';
       this.successMessage = 'Your account has been created. Please log in.';
       this.authService.sendEmailVerification();
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     }).finally(async () => {
      if (this.errorMessage !== '') {
      const alerterror = await this.alertCtrl.create({
        header: 'Error !',
        message: this.errorMessage,
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
          }
        ]
      });
      await alerterror.present();
    }

      if (this.successMessage !== '') {
      const alertsuccess = await this.alertCtrl.create({
        header: 'Success !',
        message: this.successMessage,
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.goLoginPage();
            },
          }
        ]
      });
      await alertsuccess.present();
    }

    });
  }

  goLoginPage() {
    this.navCtrl.navigateBack('');
  }


}
