import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import NavBar from '../../components/NavBar';

const userProfile = ({ isAuthenticated, user }) => {
	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/auth/login');
		}
	}, []);
	return (
		<div>
			{isAuthenticated ? (
				<div>
					<NavBar />
					<span>username: {user.username} </span>
					<br />
					<span>email: {user.email}</span>
					<br />
					<img src={user.avatar} height='200px' />
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		isAuthenticated: state.auth.isAuth,
	};
};

export default connect(mapStateToProps)(userProfile);
