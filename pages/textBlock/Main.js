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
        На данном макете можно посмотреть как будет выглядеть: 
      </Typography>
      <Typography variant="h6" gutterBottom>
        список доступных магазинов и предоставленных ими товаров (Кнопка сверху 'Магазины');
      </Typography>
      <Typography variant="h6" gutterBottom>
        офорление заказа (Кнопка сверху);
      </Typography>
      <Typography variant="h6" gutterBottom>
        станица исполнителя заказа (Кнопка сверху 'Для исполнителя');
      </Typography>
      <Typography variant="h6" gutterBottom>
        станица заказчика (Админ-панель) (Кнопка сверху 'Для заказчика').
      </Typography>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
