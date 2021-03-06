import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link';	

export default function Header() {
  return (
	<div className='Header'>
		<Container maxWidth="lg">
		<Toolbar className='Toolbar'>
			<Button size="small" href="/shops/listOfShops">Магазины</Button>
			<Button size="small" href="/executorMainPage">Заказы</Button>
			<Button
			size="large"
			color="inherit"
			align="center"
			noWrap
			className='ToolbarTitle'
			href="/">
			FEFUDelivery
			</Button>
			<Button size="small" href="order/Checkout"></Button>
			<Button size="small" href="/admin-panel/">Для заказчика</Button>
		</Toolbar>
		</Container>
	</div>
  );
}
