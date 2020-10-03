import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Button, Grid} from "@material-ui/core";
import {DropzoneDialog} from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import apiCall from "../../scripts/api";
import {toBase64} from "../../scripts/functions";
import Row from "../../components/Row";



export async function getServerSideProps(context) {
	const {data} = await apiCall({url: "stores", method: "get"})

	return {props: {jsonData: JSON.stringify(data)}}
}


export default function CollapsibleTable({jsonData}) {

	const [data, setData] = useState(JSON.parse(jsonData))

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
						<Row key={i} attr={data.stores_attr} obj={obj}/>
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