import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { BaseComponent } from './base.component';
import { tap } from 'rxjs';
// import { LoadingService } from '../services/loading.service';

@Component({
  template: '',
})
export abstract class FormBaseComponent<
    TData extends {
      [K in keyof TData]: AbstractControl<any>;
    } = any
  >
  extends BaseComponent
  implements OnInit, OnDestroy
{
  cd = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  // loadingService = inject(LoadingService);
  showValidation = false;
  form!: FormGroup<TData>;

  ngOnInit() {
    this.subs.sink = this.form?.valueChanges
      .pipe(tap(() => this.cd.markForCheck()))
      .subscribe();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  getName(control: AbstractControl): string | null {
    const group = control?.parent as UntypedFormGroup;
    if (!group) {
      return null;
    }
    let name = '';
    Object.keys(group.controls).forEach((key) => {
      const childControl = group.get(key);
      if (childControl !== control) {
        return;
      }
      name = key;
    });
    return name;
  }

  protected mapControlsToModel<TCommand extends object>(): TCommand {
    return this.form.value as TCommand;
  }

  protected checkFormValidity(): boolean {
    if (this.form.invalid) {
      this.showValidation = true;
      this.form.markAllAsTouched();
      // this.loadingService.setWaiting('finish');
      return true;
    }
    return false;
  }

  /* async submit(): Promise<void> {
    this.onBeforeSubmit();
    await this.onSubmit();
    this.onAfterSubmit();
  }

  onBeforeSubmit() {
    if (this.isWaiting) return;
    if (this.checkFormValidity()) {
      return;
    }
  }

  abstract onSubmit(): Observable;

  onAfterSubmit() {
    this.isWaiting = false;
  } */
}
