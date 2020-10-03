import Page from "../../../components/Page";
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import apiCall from "../../../scripts/api";

export async function getServerSideProps(context) {
	const {data} = await apiCall({url: "products", method: "get", data: {storeId: context.params.id}})
	data.storeId = context.params.id

	return {props: {jsonData: JSON.stringify(data)}}
}

export default function shopItems({jsonData}) {
  const [data, setData] = useState(JSON.parse(jsonData))
  const products = data.products

  return (
    <Page pageTitle='Товары'>
      <div className='shopItems'>
        <Container maxWidth="md" fixed>
          <Grid container spacing={5}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card className='Card'>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                      <Avatar
                        className='Avatar'
                        src={product.image}
                        title={product.name}
                      />
                    </Grid>
                    <CardContent className='Description'>
                      <Typography gutterBottom align="center" variant="h5">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Изготовитель: {product.company}<br/>
                        Вес: {product.weight} гр.<br/>
                        Категория: {product.category}
                      </Typography>
                      <br/>
                    </CardContent>
                    <CardContent>
                      <Typography  gutterBottom align="center" variant="h4">
                          <strong>{product.cost} руб.</strong>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary"> 
                      {
                          // TODO Сделать логику для корзины.
                      }
                        Добавить в корзину
                      </Button>
                    </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Page>
  );
}
