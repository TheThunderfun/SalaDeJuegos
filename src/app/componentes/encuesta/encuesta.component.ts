import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EncuestaService } from '../../Servicios/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss',
})
export class EncuestaComponent {
  encuestaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svEncuesta: EncuestaService,
  ) {
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      pregunta1: ['', Validators.required],
      pregunta2: this.fb.group(
        {
          opcionA: [false],
          opcionB: [false],
        },
        { validators: this.checkboxRequiredValidator },
      ),
      pregunta3: ['', Validators.required],
    });
  }

  checkboxRequiredValidator(formGroup: FormGroup) {
    const isChecked =
      formGroup.controls['opcionA'].value ||
      formGroup.controls['opcionB'].value;
    return isChecked ? null : { checkboxRequired: true };
  }

  onSubmit() {
    if (this.encuestaForm.valid) {
      console.log('Encuesta enviada', this.encuestaForm.value);
      this.svEncuesta
        .guardarEncuesta(this.encuestaForm.value)
        .then(() => console.log('Encuesta enviada y guardada'))
        .catch((error) =>
          console.error('Error al enviar la encuesta: ', error),
        );
      this.showAlert(
        'Envio exitoso',
        'Aceptar',
        `La encuesta se envio correctamente`,
        'success',
      );
    } else {
      console.log('Formulario inválido');
      this.encuestaForm.markAllAsTouched();
    }
  }

  get nombre() {
    return this.encuestaForm.get('nombre');
  }
  get edad() {
    return this.encuestaForm.get('edad');
  }
  get telefono() {
    return this.encuestaForm.get('telefono');
  }
  get pregunta1() {
    return this.encuestaForm.get('pregunta1');
  }
  get pregunta2() {
    return this.encuestaForm.get('pregunta2');
  }
  get pregunta3() {
    return this.encuestaForm.get('pregunta3');
  }

  async showAlert(
    strTitle: string,
    strButton: string,
    strtext: any,
    strIcon: string,
  ) {
    await Swal.fire({
      title: strTitle,
      text: strtext,
      icon: strIcon as any,
      confirmButtonText: strButton,
    });
  }
}
