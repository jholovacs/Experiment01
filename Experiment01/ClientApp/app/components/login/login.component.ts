import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;
    rForm:FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.rForm = this.formBuilder.group({
            username: ['', Validators.required, Validators.maxLength(120)],
            password: ['', Validators.required, Validators.minLength(6)]
        });
    }

    login(form: FormGroup) {
        this.loading = true;
        if (!form.valid) {
            console.log('form validation failed.');
            this.loading = false;
            return;
        }
       this.authenticationService.login(form.value.username, form.value.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.loading = false;
                });
    }
}