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

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
});

/*
const data = {
	"stores": [
		{
			"name": "Самбери",
			"image": "https://sakhalinmachinery.ru/upload/iblock/e22/e22f1eafc3055f84d49133f87195160e.jpg",
			"products": [
				{
					"name": "Хотстеры",
					"company": "Горячая штучка",
					"cost": 119.99,
					"weight": 250,
					"store": "Самбери",
					"category": "Еда",
					"image": "https://avatars.mds.yandex.net/get-mpic/2008488/img_id2392478754379013939.jpeg/orig"
				},
				{
					"name": "Блинчики ветчина с грибами",
					"company": "Ратимир",
					"cost": 97.99,
					"weight": 420,
					"store": "Самбери",
					"category": "Еда",
					"image": "https://shop.samberi.com/upload/iblock/3b0/3b00bd6afd887851e78ea5e403a8f830.jpg"
				},
				{
					"name": "Сосиски сибирские",
					"company": "Мясной ряд",
					"cost": 89.99,
					"weight": 600,
					"store": "Самбери",
					"category": "Еда",
					"image": "https://ratimir.ru/storage/app/uploads/public/5d4/0e1/9f6/5d40e19f6d430397032295.jpg"
				},
				{
					"name": "Крупа рис круглозерный",
					"company": "Гудвилл",
					"cost": 69.99,
					"weight": 800,
					"store": "Самбери",
					"category": "Еда",
					"image": "https://avatars.mds.yandex.net/get-mpic/1543318/img_id8773926956998573672.jpeg/orig"
				}
			]
		},
		{
			"name": "Реми",
			"image": "https://static.baza.farpost.ru/v/1536891843438_bulletin",
			"products": [
				{
					"name": "Нектар Фруктовый сад апельсин",
					"company": "Фруктовый сад",
					"cost": 92.45,
					"weight": 950,
					"store": "Реми",
					"category": "Еда",
					"image": "https://shop.samberi.com/upload/iblock/cbf/cbf4871abb798a76bd74ef91b762f51f.jpg"
				},
				{
					"name": "Мицеллярная вода д/лица Garnier",
					"company": "Garnier",
					"cost": 308.45,
					"weight": 400,
					"store": "Реми",
					"category": "Химия",
					"image": "https://cdn1.ozone.ru/multimedia/1018733649.jpg"
				},
				{
					"name": "Сыр плавленный чизбургер Хохланд",
					"company": "Hohland",
					"cost": 95.95,
					"weight": 150,
					"store": "Реми",
					"category": "Еда",
					"image": "https://cdn1.ozone.ru/multimedia/1026911433.jpg"
				},
				{
					"name": "Хлебцы карамельные Dr.Korner",
					"company": "Dr.Korner",
					"cost": 87.80,
					"weight": 90,
					"store": "Реми",
					"category": "Еда",
					"image": "https://www.perekrestok.ru/src/product.file/full/image/62/17/51762.jpeg"
				}
			]
		}
	],
}
*/


function Row({attr, obj}) {
	const [open, setOpen] = React.useState(false);
	const classes = useRowStyles();

	const states = Object.fromEntries(attr.map(({name}) => {
		const [value, setValue] = useState(obj[name]);
		return [name, {value, setValue}];
	}))


	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
					</IconButton>
				</TableCell>

				{attr.map(({value, name}) =>
					<TableCell component="th" scope="row">
						{name === 'image' ?
							<img style={{width: 'auto', height: '80px', objectFit: 'contain'}} src={states[name].value}/>
							:
							states[name].value
						}
					</TableCell>
				)}
			</TableRow>
			<TableRow>
				<TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={attr.length + 1}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography variant="h6" gutterBottom component="div" style={{paddingBottom: '15px'}}>
								Редактировать
							</Typography>
							<Grid container spacing={2}>
								{attr.map(({value, name}) => {
										const [open, setOpen] = useState(false)
										return <Grid item xs={12}>
											{name === 'image' ? <div style={{display: 'flex', alignItems: 'center'}}>

													<img style={{
														width: 'auto',
														height: '105px',
														objectFit: 'contain',
														display: 'inline-block',
														outline: '1px solid #ddd'
													}}
													     src={states[name].value}/>
													<Button
														style={{display: 'inline-block', marginLeft: '40px'}}
														color="primary"
														onClick={() => setOpen(true)}>
														Загрузить изображение
													</Button>
													<DropzoneDialog
														acceptedFiles={['image/*']}
														cancelButtonText={"Отмена"}
														submitButtonText={"Применить"}
														maxFileSize={5000000}
														dropzoneText='Перетащите файл сюда'
														dialogTitle={'Загрузить изображение'}
														filesLimit={1}
														open={open}
														onClose={() => setOpen(false)}
														onSave={async (files) => {
															const res = await toBase64(files[0])
															states[name].setValue(res)
															setOpen(false);
														}}
														showPreviews={true}
														showFileNamesInPreview={true}

													/>
												</div>
												:
												<TextField
													variant='outlined'
													label="Название"
													value={states[name].value}
													onChange={({target}) => states[name].setValue(target.value)}
												/>
											}
										</Grid>
									}
								)}
								<Grid item>
									<Button
										style={{marginRight: 10}}
										variant="contained"
										color="primary"
										onClick={async (e) => {
											e.preventDefault()

											await apiCall({
												url: 'stores',
												method: 'POST',
												data: {
													_id: obj._id,
													...Object.fromEntries(attr.map(({name}) => ([name, states[name].value]))),
												}
											})
										}}>
										Сохранить
									</Button>
									<Button
										variant="contained"
										color="secondary"
										onClick={async (e) => {
											e.preventDefault()
											await apiCall({
												url: 'stores',
												method: 'DELETE',
												data: {
													_id: obj._id,
												}
											})
										}}>
										Удалить
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}


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