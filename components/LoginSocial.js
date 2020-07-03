import React, { Fragment } from 'react';
import Link from 'next/link';

const LoginSocial = () => {
	return (
		<Fragment>
			<div style={{ textAlign: 'center' }}>
				<hr className='RuleWithText EmailPage__social-separator' data-content='Or'></hr>
			</div>
			<button className='social-tab google-tab'>
				<Link href='/'>
					<a
						style={{
							color: 'black',
							textDecoration: 'none',
							fontSize: '14px',
						}}
					>
						Continue with Google
					</a>
				</Link>
			</button>
			<button className='social-tab facebook-tab'>
				<Link href='/'>
					<a
						style={{
							color: 'white',
							textDecoration: 'none',
							fontSize: '14px',
						}}
					>
						Continue with Facebook
					</a>
				</Link>
			</button>
		</Fragment>
	);
};

export default LoginSocial;
