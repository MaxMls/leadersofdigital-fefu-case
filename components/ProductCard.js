import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

export default function ProductCard(
	{
		image,
		name,
		company,
		weight,
		category,
		cost,
		count,
		onAdd,
		onDel
	}
) {

	return (
		<Card className='Card'>
			<Grid
				container
				alignItems="center"
				justify="center"
			>
				<Avatar
					className='Avatar'
					src={image}
					title={name}
				/>
			</Grid>
			<CardContent className='Description'>
				<Typography gutterBottom align="center" variant="h5">
					{name}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					Изготовитель: {company}<br/>
					Вес: {weight} гр.<br/>
					Категория: {category}
				</Typography>
				<br/>
			</CardContent>
			<CardContent>
				<Typography gutterBottom align="center" variant="h4">
					<strong>{cost} руб.</strong>
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" color="primary" onClick={onAdd}>
					В корзину {!!count && '(' + count + ')'}
				</Button>
				{!!count && <Button size="small" color="secondary" onClick={onDel}>
					X
				</Button>}

			</CardActions>

		</Card>
	)
}