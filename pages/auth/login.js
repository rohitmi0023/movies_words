import React, { Fragment } from 'react';
import NavBar from '../../components/NavBar';
import Link from 'next/link';
import LoginForm from '../../components/LoginForm';
import LoginSocial from '../../components/LoginSocial';

const login = () => {
	return (
		<Fragment>
			<NavBar />
			<br />
			<br />
			<br />
			<div className='cardCss'>
				<div className='container' style={{ width: '250px', margin: '0 auto' }}>
					<h2 style={{ padding: '10px 0 5px 0', fontWeight: 'bold' }}>Sign In</h2>
					<span>
						New User?{' '}
						<Link href='/auth/signup'>
							<a>Sign Up</a>
						</Link>
					</span>
					<br />
					<br />
					<LoginForm />
					<LoginSocial />
				</div>
			</div>
		</Fragment>
	);
};

export default login;
