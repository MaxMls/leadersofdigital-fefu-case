import React from "react";
import Page from "../components/Page";
import {useState} from "react";
import Link from "next/link";
import Container from '@material-ui/core/Container';
import OrderCard from "../components/OrderCard.js";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const temp = '{"userInfoField": "testUser2", "products": [{"name":"Хлебцы карамельные Dr.Korner","company":"Dr.Korner","cost":87.80,"weight":90,"store":"Реми","category":"Еда", "image":"https://www.perekrestok.ru/src/product.file/full/image/62/17/51762.jpeg"}, {"name":"Сыр плавленный чизбургер Хохланд","company":"Hohland","cost":95.95,"weight":150,"store":"Реми", "category":"Еда","image":"https://cdn1.ozone.ru/multimedia/1026911433.jpg"}]}'
const jsonStr = '[{"userInfoField": "testUser2", "products": [{"name":"Хлебцы карамельные Dr.Korner","company":"Dr.Korner","cost":87.80,"weight":90,"store":"Реми","category":"Еда", "image":"https://www.perekrestok.ru/src/product.file/full/image/62/17/51762.jpeg"}, {"name":"Сыр плавленный чизбургер Хохланд","company":"Hohland","cost":95.95,"weight":150,"store":"Реми", "category":"Еда","image":"https://cdn1.ozone.ru/multimedia/1026911433.jpg"}]} ,{"userInfoField": "testUser", "products": [ { "name": "Хотстеры", "company": "Горячая штучка", "cost": 119.99, "weight": 250, "store": "Самбери", "category": "Еда", "image": "https://avatars.mds.yandex.net/get-mpic/2008488/img_id2392478754379013939.jpeg/orig" }, {"name":"Блинчики ветчина с грибами","company":"Ратимир", "cost":97.99, "weight":420,"store":"Самбери","category":"Еда","image":"https://shop.samberi.com/upload/iblock/3b0/3b00bd6afd887851e78ea5e403a8f830.jpg"}]}]';

const useStyles = makeStyles((theme) =>({
	cardCont: {
		padding: theme.spacing(2),
	},
}));

export default function executorMainPage({jsonData}) {
	const classes = useStyles();

	const [clientsOrders, setData] = useState(JSON.parse(jsonData))

	return (
		<Page className='executorMainPage' pageTitle='Главная страница исполнителя'>
			<main>
				<Container maxWidth='md' mixed>
					<Grid container spacing={5}>
						{clientsOrders.map((order) => (
							<Grid item className={classes.cardCont} xs={12}>
								<OrderCard title={"Заказ № " + clientsOrders.findIndex(function(item, i) {
									return item.userInfoField === order.userInfoField
								})} order = {order}/>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</Page>
	)
}

export async function getServerSideProps(context) {
return {props: {jsonData: jsonStr}}
}
