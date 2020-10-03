import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default function Main(props) {
  const { title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Typography variant="h5" gutterBottom>
        На данном макете можно: 
      </Typography>
      <Typography variant="h6" gutterBottom>
        посмотреть как будет выглять список доступных магазинов (Кнопка сверху магазины);
      </Typography>
      <Typography variant="h6" gutterBottom>
        можно посмотреть как будет выглядеть список товаров (Кнопка сверху товары);
      </Typography>
      <Typography variant="h6" gutterBottom>
        посмотреть как будет выглядеть офорление заказа (Кнопка внизу);
      </Typography>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
