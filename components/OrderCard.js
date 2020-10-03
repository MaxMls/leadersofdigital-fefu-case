import React, {useState} from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>({
	root: {
		maxWidth: 500,
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
		  duration: theme.transitions.duration.shortest,
	  }),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
}));

export default function OrderCard({title, order}) {

	//const [open, setOpen] = useState(false)
	const [expanded, setExpanded] = useState(false);

	const classes = useStyles();

	const handleExpandClick = () => {
		setExpanded(!expanded)
	};


	return (
		<Card className={classes.root}>
			<CardHeader title = {title}
			subheader="Сегодня в 10:30" />
			<CardContent>
				<Typography>
					Магазин: Самбери
				</Typography>
				<Typography>
					Суммарная стоимость = {order.products.reduce((a, b) => a + b.cost, 0)} рублей
				</Typography>
				<Typography>
					Суммарный вес = {order.products.reduce((a, b) => a + b.weight, 0)} грамм
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Button size="medium" color="primary" href="/">
					{

					}
					Взять заказ!
				</Button>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick = {handleExpandClick}
					aria-expanded = {expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions >
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Список товаров:</Typography>
					{order.products.map((product) => (
						<Typography>{product.name}, {product.weight} гр/мл;</Typography>
					))}
				</CardContent>
			</Collapse>
		</Card>
	)
}
