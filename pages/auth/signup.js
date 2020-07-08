import React, { Fragment, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm';
import NavBar from '../../components/NavBar';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

const signup = () => {
	return (
		<Fragment>
			<NavBar />
			<br />
			<br />
			<div className='cardCss'>
				<div className='container' style={{ width: '250px', margin: '0 auto' }}>
					<h2 style={{ padding: '10px 0 5px 0', fontWeight: 'bold' }}>Sign Up</h2>
					<span>
						Already an User?{' '}
						<Link href='/auth/login'>
							<a>Log In</a>
						</Link>
					</span>
					<br />
					<br />
					<SignUpForm />
				</div>
			</div>
		</Fragment>
	);
};

export default signup;
