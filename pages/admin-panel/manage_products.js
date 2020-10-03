import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {Button} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import apiCall from "../../scripts/api";
import Row from "../../components/Row";
import Link from "next/link";


export async function getServerSideProps(context) {
	const {data} = await apiCall({url: "stores", method: "get"})

	return {props: {jsonData: JSON.stringify(data)}}
}


export default function CollapsibleTable({jsonData}) {

	const [data, setData] = useState(JSON.parse(jsonData))

	async function updateTable(){
		const {data} = await apiCall({url: "stores", method: "get"})

		setData({data})
	}

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell/>
						{data.stores_attr.map(({value}) =>
							<TableCell>{value}</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.stores.map((obj, i) => (
						<Row onChange={updateTable} key={i} attr={data.stores_attr} obj={obj}>
							<Link href={'/admin-panel/manage_products/' + obj._id}>
								<a>
									<Button
										style={{marginLeft:10}}
										variant="contained"
									        color="primary">
										Перейти на страницу товаров магазина
									</Button>
								</a>
							</Link>
						</Row>
					))}
					<TableRow>
						<TableCell colSpan={data.stores_attr.length + 1}>
							<Button
								fullWidth
								onClick={() =>
									setData({...data, stores: [...data.stores, {}]})
								}
							>Добавить еще 1</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}