import Page from "../../../components/Page";
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import apiCall from "../../../scripts/api";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductCard from "../../../components/ProductCard";
import {useRouter} from "next/router";

export async function getServerSideProps(context) {
	const {data} = await apiCall({url: "products", method: "get", data: {storeId: context.params.id}})
	data.storeId = context.params.id

	return {props: {jsonData: JSON.stringify(data)}}
}

export default function shopItems({jsonData}) {
	const [data, setData] = useState(JSON.parse(jsonData))
	const products = data.products

//	console.log(products)
	const productsCounter = products.map((item) => {
		const [value, setValue] = useState(0)
		return [item._id, [value, setValue]]
	})

	function getSum() {
		let sum = 0
		let weight = 0
		let count = 0
		let names = 0

		productsCounter.forEach(([_id, [value, setValue]], i) => {
			sum += products[i].cost * value
			weight += products[i].weight * value
			count += value
			names += value ? 1 : 0
		})

		return {sum, weight, count, names}
	}
	const router = useRouter()

	return (
		<Page pageTitle='Товары'>
			<div className='shopItems'>
				<Container maxWidth="md" fixed>
					<Grid
						container
						direction="column"
						alignItems="flex-end"
						justify="center"
					>
						<Grid item xs={3}>
							<Typography gutterBottom align="left">
								Общая сумма: {getSum().sum} руб.<br/>
								Общий вес: {getSum().weight} гр.<br/>
								Количество: {getSum().count} шт.<br/>
								Наименований: {getSum().names} тов.<br/>

							</Typography>
							<Button
								size="small"
								color="secondary"
								variant={"contained"}
								onClick={() => {
									const po = {}
									productsCounter.forEach(([_id, [value, setValue]], i) => {
										po[_id] = value
									})

									localStorage.setItem('productsCart', JSON.stringify(po));
									router.push('/order/Checkout');
								}}
							>
								<ShoppingBasketIcon/>
								Оформить заказ
							</Button>
						</Grid>
					</Grid>
					<Grid container spacing={5}>
						{products.map((item, i) => (
							<Grid key={i} item xs={12} sm={6} md={4}>
								<ProductCard
									{...item}
									onAdd={() => {
										const current = productsCounter[i][1][0]
										productsCounter[i][1][1](Math.min(current + 1, 99))
									}}
									onDel={() => {
										const current = productsCounter[i][1][0]
										productsCounter[i][1][1](Math.max(current - 1, 0))
									}}
									count={productsCounter[i][1][0]}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</div>
		</Page>
	);
}
