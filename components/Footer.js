import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from  '@material-ui/core/Button';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.dvfu.ru/">
        FEFU
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer(props) {
  const { description, title } = props;

  return (
	<div className="Footer">  
		<footer className='footer'>
			<Container maxWidth="lg" align="center">
			  <Button color="inherit" size="small" href="/">Оформить заказ</Button>
				<Typography variant="h6" align="center" gutterBottom>
				{title}
				</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
				{description}
				</Typography>
				<Copyright />
			</Container>
		</footer>
	</div>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
