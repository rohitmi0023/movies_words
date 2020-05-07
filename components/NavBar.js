import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const NavBar = () => {
	return (
		<AppBar position='static' style={{ backgroundColor: 'black' }}>
			<Toolbar>
				<Typography variant='h6'>
					<Link href='/'>
						<a style={{ textDecoration: 'none', color: 'white' }}>Home</a>
					</Link>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
