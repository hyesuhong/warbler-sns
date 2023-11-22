import { stringObj, voidFn } from './basic';
import type AuthService from '../services/auth';

export type socialType = 'GITHUB';

export interface authUserInfo extends stringObj {}
export interface joinUserInfo extends authUserInfo {}

export interface authProvider {
	authService: AuthService;
	children: React.ReactNode;
}

export interface authContextValues {
	join?: joinFn;
	loginWithEmail?: loginWithEmailFn;
	loginWithSocial?: loginWithSocialFn;
	cleanUpState?: voidFn;
	isLoading?: boolean;
	error?: string;
}

export type joinFn = (
	{ email, password, name }: joinUserInfo,
	successCallback: voidFn
) => Promise<void>;

export type loginWithEmailFn = (
	{ email, password }: authUserInfo,
	successCallback: voidFn
) => Promise<void>;

export type loginWithSocialFn = (
	type: socialType,
	successCallback: voidFn
) => Promise<void>;
