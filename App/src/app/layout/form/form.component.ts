import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  memberForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private registrationService: RegistrationService,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.memberForm = this.fb.group({
      first_name: ['John', [Validators.required, Validators.maxLength(30)]],
      last_name: ['Smith', [Validators.required, Validators.maxLength(30)]],
      dob: [new Date(2000, 11, 17), [Validators.required]],
      address: ['17 Kings Lane', [Validators.maxLength(100)]],
      city: ['Tamworth', [Validators.required, Validators.maxLength(30)]],
      post_code: ['A11 A11', [Validators.required, Validators.maxLength(8)]]
    });
  }

  addUser(){

    this.registrationService.addUser(this.memberForm.value)
      .subscribe(response => {
        if (response.valid) {
          this.snackBarService.snackBarMessage('New Member has been added to the group', 'Thank You!', 'confirm');

          this.cancel();
        }
        else {
          this.snackBarService.snackBarMessage(response.errorMessage, 'Close', 'error');
        }
      })
  }

  cancel(){
    this.memberForm.reset();
  }

}
