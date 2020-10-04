import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm({onChange}) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')

  useEffect(()=>{
    onChange({firstName, lastName, address1})
  }, [firstName, lastName, address1])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Адресс доставки
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Имя"
            fullWidth
            autoComplete="given-name"
            value={firstName}
            onChange={({target})=> setFirstName(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Фамилия"
            fullWidth
            autoComplete="family-name"
            value={lastName}
            onChange={({target})=> setLastName(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Адресс"
            fullWidth
            autoComplete="shipping address-line1"
            value={address1}
            onChange={({target})=> setAddress1(target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Использовать этот адресс для платёжных реквизитов"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
