import React, { Fragment, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { connect } from 'react-redux';

const NavBar = props => {
	return (
		<Fragment>
			<AppBar position='static' style={{ backgroundColor: 'black' }}>
				<div style={{ margin: '15px 0px' }}>
					<Typography variant='h6' style={{}}>
						<Link href='/'>
							<a
								style={{
									textDecoration: 'none',
									color: 'white',
									margin: '0px 15px',
								}}
							>
								Home
							</a>
						</Link>
						{props.isAuthenticated ? (
							<span
								style={{
									textDecoration: 'none',
									color: 'white',
									float: 'right',
									margin: '0px 25px 0px 5px',
								}}
							>
								Logged In
							</span>
						) : (
							<Fragment>
								<Link href='/auth/login'>
									<a
										style={{
											textDecoration: 'none',
											color: 'white',
											float: 'right',
											margin: '0px 25px 0px 5px',
										}}
									>
										Log In
									</a>
								</Link>
								<Link href='/auth/signup'>
									<a
										style={{
											textDecoration: 'none',
											color: 'white',
											float: 'right',
											margin: '0px 25px 0px 5px',
										}}
									>
										Sign Up
									</a>
								</Link>
							</Fragment>
						)}
					</Typography>
				</div>
			</AppBar>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuth,
	};
};

export default connect(mapStateToProps)(NavBar);
