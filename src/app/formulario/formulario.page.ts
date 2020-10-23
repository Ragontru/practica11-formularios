import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController, NumericValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  validations_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({

      dni: new FormControl('', Validators.compose([
        this.validDni,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]'),
        Validators.required
      ])),
      iban: new FormControl('', Validators.compose([
        Validators.maxLength(24),
        Validators.minLength(24),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+[@]{1}[a-zA-Z0-9-]+[.]{1}[a-zA-Z]+$')
      ])),
    });
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        cuenta: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/cuenta', navigationExtras);
  }

  validDni(fc: FormControl) {
    var numero=fc.substring(0,fc.length-1);
    var letraC;
    var letra;
    
    if (fc.value.length()) {
      return ({ validUsername: true });
    } else {
      return (null);
    }
    //return "TRWAGMYFPDXBNJZSQVHLCKE".charAt( % 23);
  }

}
