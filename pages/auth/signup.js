import React, { Fragment, useEffect } from 'react';
import SignUpForm from '../../components/SignUpForm';
import NavBar from '../../components/NavBar';
import Link from 'next/link';
import { Button, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchposts } from '../../store/actions/postAction';
// import { connect } from 'react-redux';
// import withRedux from 'next-redux-wrapper';
// import makeStore from '../../store/reducer';

const signup = () => {
	const dispatch = useDispatch();
	// const { posts } = useSelector(state => state.post);
	// useEffect(() => {
	// 	dispatch(fetchposts());
	// }, []);
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
