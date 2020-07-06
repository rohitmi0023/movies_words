import React from 'react';
import * as types from '../types';
import Axios from 'axios';
import { setAlert } from './alertAction';

// Loading user
export const loadUser = () => async dispatch => {
	try {
		// https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
		if (localStorage.jwtToken) {
			Axios.defaults.headers.common['auth-header-token'] = localStorage.jwtToken;
		} else {
			delete Axios.defaults.headers.common['auth-header-token'];
		}
		const res = await Axios.get('/api/auth');
		dispatch({
			type: types.USER_LOADED,
			payload: res.data.user,
		});
	} catch (err) {
		console.log(err);
	}
};

// Signing up user
export const signup = ({ username, email, password }) => async dispatch => {
	const newUser = {
		username,
		email,
		password,
	};
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(newUser);
		const res = await Axios.post('/api/users/', body, config);
		if (res.data.error) {
			throw new Error(res.data.error);
		}
		dispatch({
			type: types.REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => {
				return dispatch(setAlert(error.msg, error.param));
			});
		}
		dispatch({
			type: types.REGISTER_FAIL,
		});
	}
};

// logging in user
export const login = ({ email, password }) => async dispatch => {
	const formData = {
		email,
		password,
	};
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const body = JSON.stringify(formData);
		const res = await Axios.post('/api/login', body, config);
		console.log(res);
		if (res.data.error) {
			throw new Error(res.data.error);
		}
		dispatch({
			type: types.LOGIN_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
		localStorage.setItem('token', res.data.token);
	} catch (err) {
		console.log(err.message);
		if (err.response.data.errors) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach(error => {
					return dispatch(setAlert(error.msg, error.param));
				});
			}
		}
		dispatch({
			type: types.LOGIN_FAIL,
		});
	}
};

// Verifying a user
export const verifyUser = ({ userId, userEmailHash }) => async dispatch => {
	console.log(`Came here in verifyUser function`);
	console.log(userEmailHash);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const formData = {
			userId,
			userEmailHash,
		};
		const body = JSON.stringify(formData);
		const res = await Axios.post('/api/auth/verify', body, config);
		dispatch({
			type: types.IS_VERIFIED,
		});
	} catch (error) {
		console.log(error.message);
	}
};
