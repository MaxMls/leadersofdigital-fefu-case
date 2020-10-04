import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
	{name: 'Card type', detail: 'Visa'},
	{name: 'Card holder', detail: 'Mr John Smith'},
	{name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
	{name: 'Expiry date', detail: '04/2024'},
];

const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: 700,
	},
	title: {
		marginTop: theme.spacing(2),
	},
}));

export default function Review({data}) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Проверка заказа
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Продукты
					</Typography>
					<Typography gutterBottom>{Object.entries(data.products || {}).length}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" gutterBottom className={classes.title}>
						Доставка
					</Typography>
					<Typography gutterBottom>{data.firstName}</Typography>
					<Typography gutterBottom>{data.address1}</Typography>
				</Grid>
				{/*<Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Детали заказа
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>*/}
			</Grid>
		</React.Fragment>
	);
}
