import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SiginService } from './sigin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-sigin',
    templateUrl: './sigin.component.html',
    styleUrls: ['./sigin.component.scss'],
    encapsulation: ViewEncapsulation.None
})


export class SiginComponent {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
   
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private siginService: SiginService,
        private snackBar: MatSnackBar) {
        // redirect to home if already logged in
        if (this.siginService.isAuthenticated()) {
            this.router.navigateByUrl('/sigin');
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.siginService.login({ username: this.f.username.value, password: this.f.password.value })
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.setItem('jwt', data.token)
                    this.router.navigateByUrl('/logged/home');
                },
                error => {
                    this.snackBar.open('No tiene acceso');
                    this.loading = false;
                });
    }

onHome(){
    this.router.navigateByUrl('/dashboard/home');
}

}
