import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: 'register.component.html',
    selector: 'register-user'
})
export class RegisterComponent implements OnInit {
    loading = false;
    returnUrl: string;
    rForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {

        this.rForm = this.formBuilder.group({
            givenName: ['', [Validators.required, Validators.maxLength(35)]],
            surname: ['', [Validators.required, Validators.maxLength(35)]],
            username: ['', [Validators.required, Validators.maxLength(120)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    register(form: FormGroup) {
        this.loading = true;
        if (!form.valid) {
            console.log('form validation failed.');
            console.log(JSON.stringify(form));
            this.loading = false;
            return false;
        }
        this.authenticationService.register(form.value.username, form.value.email, form.value.password)
            .subscribe(data => {
                this.router.navigate([this.returnUrl]);
                    return true;
                },
            error => {
                this.loading = false;
                return false;
            });
    }
}

