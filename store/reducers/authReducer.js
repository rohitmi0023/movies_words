import * as types from '../types';

const authState = {
	user: null,
	isAuth: false,
	loading: true,
	token: null,
	isVerified: false,
	emailVerifyHash: null,
};

export const authReducer = (state = authState, action) => {
	switch (action.type) {
		case types.USER_LOADED:
			return {
				...state,
				isAuth: true,
				isVerified: true,
				loading: false,
				user: action.payload,
			};
		case types.REGISTER_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuth: true,
				loading: false,
				emailVerifyHash: action.payload.emailVerifyHash,
			};
		case types.LOGIN_SUCCESS:
			localStorage.setItem('jwtToken', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuth: true,
				loading: false,
				isVerified: true,
			};
		case types.IS_VERIFIED:
			return {
				...state,
				isVerified: true,
			};
		case types.REGISTER_FAIL:
		case types.AUTH_ERROR:
		case types.LOGIN_FAIL:
		case types.LOGOUT:
			return {
				...state,
				isAuth: false,
				loading: false,
			};
		default:
			return state;
	}
};
