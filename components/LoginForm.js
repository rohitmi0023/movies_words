import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../store/actions/authAction';
import { TextField } from '@material-ui/core';

const LoginForm = ({ login, isAuthenticated, alertMessages }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const { email, password } = form;

	const onChange = e => {
		return setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		login({ email, password });
	};

	useEffect(() => {
		if (isAuthenticated) {
			router.push('/');
		}
	}, [isAuthenticated]);

	return (
		<Form onSubmit={e => handleSubmit(e)}>
			<FormGroup style={{ marginBottom: '7px' }}>
				<TextField
					error={Boolean(
						alertMessages.filter(
							alert =>
								alert.alertType === 'email' || alert.msg === 'Invalid Credentials'
						).length
					)}
					type='email'
					name='email'
					placeholder='Email address'
					style={{ fontSize: '14px' }}
					onChange={e => onChange(e)}
					helperText={alertMessages.map(alert => {
						if (alert.alertType === 'email' || alert.msg === 'Invalid Credentials') {
							return `${alert.msg}`;
						}
					})}
				/>
			</FormGroup>
			<FormGroup>
				<TextField
					error={Boolean(
						alertMessages.filter(
							alert =>
								alert.alertType === 'password' ||
								alert.msg === 'Invalid Credentials'
						).length
					)}
					type='password'
					name='password'
					placeholder='Password'
					style={{ fontSize: '14px' }}
					onChange={e => onChange(e)}
					helperText={alertMessages.map(alert => {
						if (alert.alertType === 'password' || alert.msg === 'Invalid Credentials') {
							return `${alert.msg}`;
						}
					})}
				/>
			</FormGroup>
			<Button
				style={{
					backgroundColor: '#63d7a2',
					width: '100%',
					color: 'white',
					fontWeight: 'bold',
				}}
			>
				Log In
			</Button>
		</Form>
	);
};

LoginForm.propTypes = {
	login: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuth,
		alertMessages: state.alert,
	};
};

export default connect(mapStateToProps, { login })(LoginForm);
