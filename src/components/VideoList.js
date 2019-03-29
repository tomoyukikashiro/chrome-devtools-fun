import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {withStyles} from '@material-ui/core'

const styles = theme => ({
  gridContainer: {
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 16}px`,
  },
  gridItem: {
    width: '100%'
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
})

const VideoList = ({ classes, video, handleModalOpen }) => (
  <Grid container spacing={40} className={classes.gridContainer}>
    {video.items.map((fn, k) => (
      <Grid item key={k} sm={6} md={4} lg={3} className={classes.gridItem}>
        <Card className={classes.card} onClick={() => handleModalOpen(video.youtube_id, fn)}>
          <CardMedia
            className={classes.cardMedia}
            image={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`} // eslint-disable-line max-len
            title={fn.update_name}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="subtitle1" component="h2">
              {fn.update_name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
)


export default withStyles(styles)(VideoList);
