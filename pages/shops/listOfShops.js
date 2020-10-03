import Page from "../../components/Page";
import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const jsonStr = "{\"stories\":[{\"name\":\"\u0421\u0430\u043c\u0431\u0435\u0440\u0438\",\"image\":\"https:\/\/sakhalinmachinery.ru\/upload\/iblock\/e22\/e22f1eafc3055f84d49133f87195160e.jpg\",\"products\":[{\"name\":\"\u0425\u043e\u0442\u0441\u0442\u0435\u0440\u044b\",\"company\":\"\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u0448\u0442\u0443\u0447\u043a\u0430\",\"cost\":119.99,\"weight\":250,\"store\":\"\u0421\u0430\u043c\u0431\u0435\u0440\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/avatars.mds.yandex.net\/get-mpic\/2008488\/img_id2392478754379013939.jpeg\/orig\"},{\"name\":\"\u0411\u043b\u0438\u043d\u0447\u0438\u043a\u0438 \u0432\u0435\u0442\u0447\u0438\u043d\u0430 \u0441 \u0433\u0440\u0438\u0431\u0430\u043c\u0438\",\"company\":\"\u0420\u0430\u0442\u0438\u043c\u0438\u0440\",\"cost\":97.99,\"weight\":420,\"store\":\"\u0421\u0430\u043c\u0431\u0435\u0440\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/shop.samberi.com\/upload\/iblock\/3b0\/3b00bd6afd887851e78ea5e403a8f830.jpg\"},{\"name\":\"\u0421\u043e\u0441\u0438\u0441\u043a\u0438 \u0441\u0438\u0431\u0438\u0440\u0441\u043a\u0438\u0435\",\"company\":\"\u041c\u044f\u0441\u043d\u043e\u0439 \u0440\u044f\u0434\",\"cost\":89.99,\"weight\":600,\"store\":\"\u0421\u0430\u043c\u0431\u0435\u0440\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/ratimir.ru\/storage\/app\/uploads\/public\/5d4\/0e1\/9f6\/5d40e19f6d430397032295.jpg\"},{\"name\":\"\u041a\u0440\u0443\u043f\u0430 \u0440\u0438\u0441 \u043a\u0440\u0443\u0433\u043b\u043e\u0437\u0435\u0440\u043d\u044b\u0439\",\"company\":\"\u0413\u0443\u0434\u0432\u0438\u043b\u043b\",\"cost\":69.99,\"weight\":800,\"store\":\"\u0421\u0430\u043c\u0431\u0435\u0440\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/avatars.mds.yandex.net\/get-mpic\/1543318\/img_id8773926956998573672.jpeg\/orig\"}]},{\"name\":\"\u0420\u0435\u043c\u0438\",\"image\":\"https:\/\/static.baza.farpost.ru\/v\/1536891843438_bulletin\",\"products\":[{\"name\":\"\u041d\u0435\u043a\u0442\u0430\u0440 \u0424\u0440\u0443\u043a\u0442\u043e\u0432\u044b\u0439 \u0441\u0430\u0434 \u0430\u043f\u0435\u043b\u044c\u0441\u0438\u043d\",\"company\":\"\u0424\u0440\u0443\u043a\u0442\u043e\u0432\u044b\u0439 \u0441\u0430\u0434\",\"cost\":92.45,\"weight\":950,\"store\":\"\u0420\u0435\u043c\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/shop.samberi.com\/upload\/iblock\/cbf\/cbf4871abb798a76bd74ef91b762f51f.jpg\"},{\"name\":\"\u041c\u0438\u0446\u0435\u043b\u043b\u044f\u0440\u043d\u0430\u044f \u0432\u043e\u0434\u0430 \u0434\/\u043b\u0438\u0446\u0430 Garnier\",\"company\":\"Garnier\",\"cost\":308.45,\"weight\":400,\"store\":\"\u0420\u0435\u043c\u0438\",\"category\":\"\u0425\u0438\u043c\u0438\u044f\",\"image\":\"https:\/\/cdn1.ozone.ru\/multimedia\/1018733649.jpg\"},{\"name\":\"\u0421\u044b\u0440 \u043f\u043b\u0430\u0432\u043b\u0435\u043d\u043d\u044b\u0439 \u0447\u0438\u0437\u0431\u0443\u0440\u0433\u0435\u0440 \u0425\u043e\u0445\u043b\u0430\u043d\u0434\",\"company\":\"Hohland\",\"cost\":95.95,\"weight\":150,\"store\":\"\u0420\u0435\u043c\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/cdn1.ozone.ru\/multimedia\/1026911433.jpg\"},{\"name\":\"\u0425\u043b\u0435\u0431\u0446\u044b \u043a\u0430\u0440\u0430\u043c\u0435\u043b\u044c\u043d\u044b\u0435 Dr.Korner\",\"company\":\"Dr.Korner\",\"cost\":87.8,\"weight\":90,\"store\":\"\u0420\u0435\u043c\u0438\",\"category\":\"\u0415\u0434\u0430\",\"image\":\"https:\/\/www.perekrestok.ru\/src\/product.file\/full\/image\/62\/17\/51762.jpeg\"}]}]}";
const json = JSON.parse(jsonStr)

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100vh",
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function listOfShops() {
  const classes = useStyles();

  return (
    <Page className='testPage' pageTitle='Магазины'>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={5}>
            {json.stories.map((store) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={store.image}
                    title={store.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom align="center" variant="h5" component="h2">
                      {store.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href="/"> 
                    {
                        // TODO Сделать переход на страницу магазина.
                    }
                      Сделать покупки в {store.name}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </Page>
  );
}
