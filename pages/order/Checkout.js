import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import {useRouter} from 'next/router'
import apiCall from "../../scripts/api";

const steps = ['Адресс доставки', 'Детали оплаты', 'Проверка заказа'];


export default function Checkout({jsonData}) {
	const [data, setData] = useState({products: {}})

	const router = useRouter()
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = async () => {
		if (activeStep === steps.length - 1) {
			const d = {
				orderInfo: {...data, products: undefined},
				products: data.products || {}
			}
			await apiCall({url: 'cart', data: d, method: 'post'})
		}

		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	useEffect(()=>{
	}, [data])


	useEffect(()=>{
		const products = JSON.parse(localStorage.getItem('productsCart')) || {};
		setData({...data, products})
	}, [])




	return (
		<React.Fragment>
			<div className='Checkout'>
				<main className='layout'>
					<Paper className='paper'>
						<Typography component="h1" variant="h4" align="center">
							Оформление заказа
						</Typography>
						<Stepper activeStep={activeStep} className='stepper'>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						<React.Fragment>
							{activeStep === steps.length ? (
								<React.Fragment>
									<Typography variant="h5" gutterBottom>
										Спасибо за заказ.
									</Typography>
									<Typography variant="subtitle1">
										Номер вашего заказа #2001539. На ваш email будет выслана подробная информация по заказу.
									</Typography>
									<Button variant="subtitle1" href='/executorMainPage'>
										Прейти на страницу заказов
									</Button>
								</React.Fragment>
							) : (
								<React.Fragment>
									{[
										<AddressForm
											onChange={(value) => setData({...data, ...value})}
										/>,
										<PaymentForm
											onChange={(value) => setData({...data, ...value})}
										/>,
										<Review
											data={data}
										/>
									][activeStep]}
									<div className='buttons'>
										{activeStep !== 0 && (
											<Button onClick={handleBack} className='button'>
												Назад
											</Button>
										)}
										<Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className='button'
										>
											{activeStep === steps.length - 1 ? 'Создать заказ' : 'Далее'}
										</Button>
									</div>
								</React.Fragment>
							)}
						</React.Fragment>
					</Paper>
				</main>
			</div>
		</React.Fragment>
	);
}
