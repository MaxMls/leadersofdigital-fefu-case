import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Button, Grid} from "@material-ui/core";
import {DropzoneDialog} from "material-ui-dropzone";
import {toBase64} from "../scripts/functions";
import TextField from "@material-ui/core/TextField";
import apiCall from "../scripts/api";


const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
});

export default function Row({attr, obj}) {
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
													label={value}
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