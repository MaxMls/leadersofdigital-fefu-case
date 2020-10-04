import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import apiCall from "../../scripts/api";
import {useRouter} from "next/router";
import AdminHeader from "../../components/AdminHeader";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();

	const [name, setName] = useState('')
	const [password, setPassword] = useState('')

	const router = useRouter()

	return <>
		<AdminHeader/>
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Войти в админ-панель
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={(event) => {
						event.preventDefault()

						apiCall({method: 'post', url: 'admin-sign-in', data: {name, password}}).then(()=>{
							router.push('/admin-panel/manage_products');
						})

					}}

				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Имя пользователя"
						name="email"
						autoComplete="email"
						autoFocus
						value={name}
						onChange={({target}) => setName(target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Пароль"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={({target}) => setPassword(target.value)}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary"/>}
						label="Запомнить"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Вход
					</Button>
					{/*<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Забыли пароль?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Увас нет аккаунта? Зарегистрироваться"}
							</Link>
						</Grid>
					</Grid>*/}
				</form>
			</div>
		</Container>
	</>
}