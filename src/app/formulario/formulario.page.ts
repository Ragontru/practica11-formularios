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

  validation_messages = {
    'dni': [
      { type: 'required', message: 'DNI requerido.' },
      { type: 'minlength', message: 'El DNI debe contener 9 caracteres.' },
      { type: 'maxlength', message: 'El DNI debe contener 9 caracteres.' },
      { type: 'pattern', message: 'El DNI debe estar compuesto por 8 numeros y 1 letra.' },
      { type: 'invalidDNI', message: 'La letra no corresponde.' }
    ],
    'iban': [
      { type: 'required', message: 'IBAN requerido.' },
      { type: 'minlength', message: 'El IBAN debe contener 24 caracteres.' },
      { type: 'maxlength', message: 'El IBAN debe contener 24 caracteres.' },
      { type: 'pattern', message: 'El IBAN debe estar compuesto por ES seguido de 22 números.' },
    ]
  }

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({

      dni: new FormControl('', Validators.compose([
        this.invalidDNI,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('^[0-9]{8}[a-zA-Z]$'),
        Validators.required
      ])),
      iban: new FormControl('', Validators.compose([
        Validators.maxLength(24),
        Validators.minLength(24),
        Validators.required,
        Validators.pattern('^[eE]+[sS]+[0-9]{22}$')
      ])),
    });
  }

  invalidDNI(fc: FormControl) {
    var numero;
    var letra;
    var letraValida;
    var bool = true;

    numero = fc.value.substr(0, fc.value.length - 1);
    letra = fc.value.substr(fc.value.length - 1, 1);
    letraValida = 'TRWAGMYFPDXBNJZSQVHLCKET';

    numero = numero % 23;
    letraValida = letraValida.substring(numero, numero + 1);

    if (letraValida != letra.toUpperCase()) {
      bool = true;
    } else {
      bool = false;
    }

    if (bool) {
      return ({ invalidDNI: true });
    } else {
      return (null);
    }
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }
}
