import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

export const index = ({ isAuthenticated }) => {
	const router = useRouter();
	<h5>Please wait...</h5>;
	useEffect(() => {
		if (!isAuthenticated) {
			router.push('/auth/signup');
		}
	}, []);
	return (
		<Fragment>
			{isAuthenticated ? (
				<div>
					<br />
					<br />
					<h2 style={{ textAlign: 'center' }}>Thanks for signing up!</h2>
					<h6 style={{ margin: '10px 25px' }}>
						An email has been sent to your given gmail account. Please go the email to
						complete your sign up process.
					</h6>
				</div>
			) : null}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuth,
	};
};

export default connect(mapStateToProps)(index);
