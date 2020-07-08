import React, { Fragment, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { logout } from '../store/actions/authAction';

const NavBar = ({ isAuthenticated, user, logout }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const router = useRouter();
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickLogout = () => {
		logout();
		router.push('/');
	};

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
						{user ? (
							<span
								style={{
									textDecoration: 'none',
									color: 'white',
									float: 'right',
									margin: '0px 25px 0px 5px',
								}}
							>
								<Avatar
									aria-controls='simple-menu'
									aria-haspopup='true'
									onClick={handleClick}
									src={user.avatar}
								></Avatar>
								<Menu
									id='simple-menu'
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClick}>
										<Link href='/users/userProfile'>
											<a>My Profile</a>
										</Link>
									</MenuItem>
									<MenuItem onClick={handleClickLogout}>Logout</MenuItem>
								</Menu>
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

NavBar.proptypes = {
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.isAuth,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { logout })(NavBar);
