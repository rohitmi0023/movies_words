import * as types from '../types';

const authState = {
	user: null,
	isAuth: false,
	loading: true,
	isVerified: false,
	register_state: false,
};

export const authReducer = (state = authState, action) => {
	switch (action.type) {
		case types.USER_LOADED:
			return {
				...state,
				loading: false,
				user: action.payload,
			};
		case types.REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				register_state: true,
			};
		case types.LOGIN_SUCCESS:
			localStorage.setItem('jwtToken', action.payload.jwtToken);
			return {
				...state,
				isAuth: true,
				loading: false,
			};
		case types.VERIFICATION_SUCCESS:
			return {
				...state,
				isVerified: true,
			};
		case types.REGISTER_FAIL:
			return {
				...state,
				loading: false,
			};
		case types.AUTH_ERROR:
			return {
				...state,
				loading: false,
				user: null,
			};
		case types.LOGIN_FAIL:
			return {
				...state,
				loading: false,
			};
		case types.LOGOUT:
			localStorage.removeItem('jwtToken');
			return {
				...state,
				isAuth: false,
				loading: false,
				user: null,
			};
		default:
			return state;
	}
};
