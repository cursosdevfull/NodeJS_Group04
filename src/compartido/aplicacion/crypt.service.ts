import bcrypt from 'bcryptjs';

export class CryptService {
	static async encrypt(password: string) {
		const newPassword = await bcrypt.hash(password, 10);
		return newPassword;
	}

	static async decrypt(
		password: string,
		hashPassword: string
	): Promise<boolean> {
		const matched = await bcrypt.compare(password, hashPassword);
		return matched;
	}
}
