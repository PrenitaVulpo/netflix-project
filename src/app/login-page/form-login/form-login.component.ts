import { Component, OnInit } from '@angular/core';

import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormLoginService } from './form-login.service';

@Component({
	selector: 'app-form-login',
	templateUrl: './form-login.component.html',
	styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
	formContainer = new FormGroup({
		emailPhone: new FormControl(''),
		passwordUser: new FormControl(''),
	});

	textShow: boolean = true;
	user: string = '';
	password: string = '';
	validatorEmail: boolean = true;
	constructor(
		private fb: FormBuilder,
		private formLoginService: FormLoginService,
		private router: Router,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.formContainer = this.fb.group({
			emailPhoneUser: ['', Validators.compose([Validators.required])],
			passwordUser: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(60),
				]),
			],
		});
	}

	showMessage() {
		this.textShow = false;
	}

	goToNextPage() {
		this.user = this.formContainer['controls']['emailPhoneUser']['value'];
		this.password = this.formContainer['controls']['passwordUser']['value'];
		this.formLoginService
			.login({ user: this.user, password: this.password })
			.subscribe({
				next: (data) => {
					localStorage.setItem('data', data);
					this.router.navigate([this.authService.intendedUrl]);
				},
				error: (erro) => {
					console.log(erro.error.text);
				},
			});
	}

	allEqual(arr: Array<number | string>) {
		return arr.every((v) => v === arr[0]);
	}

	validateEmailPhone(event: Event) {
		let emailPhone = (event.target as HTMLInputElement).value;
		const patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
		const patternPhone = /^(\d){11}/;
		if (Number(emailPhone)) {
			if (patternPhone.test(emailPhone)) {
				if (this.allEqual(emailPhone.split(''))) {
					this.validatorEmail = true;
				} else {
					this.validatorEmail = false;
				}
			}
		} else {
			this.validatorEmail = !patternEmail.test(emailPhone);
		}
	}
}
