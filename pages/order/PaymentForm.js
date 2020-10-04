import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm({onChange}) {


   const [cardNumber, setCardNumber] = useState('')
   const [cvv, setCvv] = useState('')

   useEffect(()=>{
      onChange({cardNumber, cvv})
   }, [cardNumber, cvv])

   return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Детали оплаты
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Номер карты"
            fullWidth
            autoComplete="cc-number"
            value={cardNumber}
            onChange={({target})=> setCardNumber(target.value)}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Действительна до" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            value={cvv}
            onChange={({target})=> setCvv(target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
