export interface GeneralAccountInformation {
	firstName: string;
	lastName: string;
	email: string;
}

export interface ChangePasswordFormData {
	currentPassword: string;
	newPassword: string;
	newPasswordConfirmation: string;
}
