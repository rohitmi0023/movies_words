import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { verifyUser } from '../../../store/actions/authAction';

const hashId = ({ isAuthenticated, emailVerifyHash, verifyUser, isVerified }) => {
	const router = useRouter();
	useEffect(() => {
		if (isVerified) {
			console.log(`Hey your account has been verified. Congo!`);
			router.push('/auth/login');
		}
		const userId = window.location.pathname.replace('/auth/verify/', '');
		const userEmailHash = window.location.search.replace('?q=', '');
		verifyUser({ userId, userEmailHash });
		// if (emailVerifyHash === queryHash) {
		// 	console.log('verified!');
		// }
	}, [isVerified]);
	return (
		<Fragment>
			<h5>Please wait...</h5>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuth,
		emailVerifyHash: state.auth.emailVerifyHash,
		isVerified: state.auth.isVerified,
	};
};

hashId.propTypes = {
	verifyUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { verifyUser })(hashId);
