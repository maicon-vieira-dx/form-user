import { ConsultaCepService } from './../service/consulta-cep.service';
import { Observable, map } from 'rxjs';
import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors } from '@angular/forms'

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi: true
  }] 
})
export class ValidandoCepDirective implements AsyncValidator {


  constructor(
    private consultaCepService: ConsultaCepService
  ) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return this.consultaCepService.getConsultaCEP(cep).pipe(map(
      (resultado: any) => resultado.erro ? {'validadorCep': true} : null
      ))
  }

}
