import Page from "../../components/Page";
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { CardMedia } from "@material-ui/core";
import apiCall from "../../scripts/api";
import Link from "next/link";

export async function getServerSideProps() {
	const {data} = await apiCall({url: "stores", method: "get"})
	return {props: {jsonData: JSON.stringify(data)}}
}

export default function listOfShops({jsonData}) {
  const [data] = useState(JSON.parse(jsonData));
  const stores = data.stores;

  return (
    <Page pageTitle='Магазины'>
      <div className='listOfShops'>
        <Container maxWidth="md">
          <Grid container spacing={5}>
            {stores.map((store, i) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card key={i} className='Card'>
                  <Grid
                      container
                      alignItems="center"
                      justify="center"
                  >
                    <CardMedia className='Avatar' component="img" src={store.image}  />
                  </Grid>
                  <CardContent className='CardContent'>
                    <Typography gutterBottom align="center" variant="h5" component="h2">
                      {store.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={'/shops/shopItems/' + store._id}>
                      <a>
                        <Button size="small" color="primary"> 
                          Сделать покупки в {store.name}
                        </Button>
                      </a>
                    </Link>
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
