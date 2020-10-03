// export default function Header() {

// 	return (
// 		<div className="Header">
// 			<Container maxWidth="md">
// 				<div className={classes.root}>
// 					<Typography variant="h2" gutterBottom>
// 					Material UI Demo
// 					</Typography>
			
// 					<Typography variant="p" gutterBottom>
// 					Hero Component
// 					</Typography>
// 				</div>
// 			</Container>
// 		</div>
// 	)
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
	<div className="Header">
		<Container maxWidth="lg">
		<Toolbar className={classes.toolbar}>
			<Button size="small" href="/shops/listOfShops">Магазины</Button>
			<Button size="small" href="/shopItems">Товары</Button>
			<Typography
			component="h2"
			variant="h5"
			color="inherit"
			align="center"
			noWrap
			className={classes.toolbarTitle}
			>
				<Link href="/">FEFUDelivery</Link>
			</Typography>
		</Toolbar>
		</Container>
	</div>
  );
}
