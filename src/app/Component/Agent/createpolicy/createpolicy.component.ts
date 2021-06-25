import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'src/app/Model/Accounts';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-createpolicy',
  templateUrl: './createpolicy.component.html',
  styleUrls: ['./createpolicy.component.css'],
})
export class CreatepolicyComponent implements OnInit {
  
  createPolicy: FormGroup;
  submitted: boolean = false;
  
  userName: string;
  navigator: string;
  Bus_seg: string;

  invalidLogin: boolean = false;
  accounts: Accounts[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createPolicy = this.formBuilder.group({
      accountNumber: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.createPolicy.value);
    this.submitted = true;
    if (this.createPolicy.invalid) {
      return;
    }
    this.userService.getAccounts().subscribe((data) => {
      this.accounts = data;
      console.log(this.accounts);

      var JSON = this.accounts;
      var hasMatch = false;

      for (var index = 0; index < JSON.length; ++index) {
        var jsonData = JSON[index];

        if (this.createPolicy.controls.accountNumber.value == jsonData.accountNumber) {
          hasMatch = true;
          this.Bus_seg = jsonData.businessSegmentName;
          console.log(this.Bus_seg+"");
          localStorage.setItem('policyUserName', jsonData.userName);
          localStorage.setItem('street', jsonData.insuredStreet);
          localStorage.setItem('city', jsonData.insuredCity);
          localStorage.setItem('state', jsonData.insuredState);
          localStorage.setItem('zip', jsonData.insuredZip);
          localStorage.setItem('business_segment', this.Bus_seg);
          localStorage.setItem('accountNumber',this.createPolicy.controls.accountNumber.value);
          this.router.navigate(['question'] );
          break;
        }
      }
      if(hasMatch == false){
         this.invalidLogin = true;
      }
      console.log(hasMatch);
    });   
  }
}
