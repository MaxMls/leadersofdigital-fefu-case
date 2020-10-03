import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Button} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import apiCall from "../../../scripts/api";
import Row from "../../../components/Row";
import Link from "next/link";


export async function getServerSideProps(context) {
	console.log(context.params.id)

	const {data} = await apiCall({url: "products", method: "get", data: {storeId: context.params.id}})
	data.storeId = context.params.id

	return {props: {jsonData: JSON.stringify(data)}}
}


export default function products({jsonData}) {

	const [data, setData] = useState(JSON.parse(jsonData))


	return <div className='AdminPanel'>
		<Link href={'/admin-panel/manage_products'}>
			<a>
				<Button
					style={{margin: 10}}
					variant="contained"
					color="primary">
					Перейти на страницу управления магазинами
				</Button>
			</a>
		</Link>

		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell/>
						{data.products_attr.map(({value}) =>
							<TableCell>{value}</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.products.map((obj, i) => (
						<Row
							key={i}
							attr={data.products_attr}
							obj={obj}
							addData={{storeId: data.storeId}}
							apiPath={'products'}
						/>
					))}
					<TableRow>
						<TableCell colSpan={data.products_attr.length + 1}>
							<Button
								fullWidth
								onClick={() =>
									setData({...data, products: [...data.products, {}]})
								}
							>Добавить еще 1</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	</div>

}