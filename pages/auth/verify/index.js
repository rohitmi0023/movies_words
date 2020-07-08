import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';

export const index = ({ register_state, loading }) => {
	const router = useRouter();
	<h5>Please wait...</h5>;
	useEffect(() => {
		if (!register_state) {
			router.push('/auth/signup');
		}
	}, []);
	return (
		<Fragment>
			{loading ? (
				<div style={{ textAlign: 'center' }}>
					<br />
					<br />
					<br />
					<CircularProgress />
				</div>
			) : register_state ? (
				<div>
					<br />
					<br />
					<h2 style={{ textAlign: 'center' }}>Thanks for signing up!</h2>
					<h6 style={{ margin: '10px 25px' }}>
						An email has been sent to your given gmail account. Please go the email to
						complete your sign up process.
					</h6>
				</div>
			) : (
				<h3>You have not registered yet!</h3>
			)}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		register_state: state.auth.register_state,
		loading: state.auth.loading,
	};
};

export default connect(mapStateToProps)(index);
