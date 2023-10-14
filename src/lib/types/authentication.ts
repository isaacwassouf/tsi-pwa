export interface VerifiedUser {
	id: string;
	name: string;
	email: string;
}

export interface RegisterationFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

export interface LoginFormData {
	email: string;
	password: string;
}
