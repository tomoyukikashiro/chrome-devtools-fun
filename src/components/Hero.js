import React from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 700,
    lineHeight: 1.5,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 6}px`,
  },
  heroSearch: {
    marginTop: theme.spacing.unit * 4,
  },
})

const Hero = ({ classes, title, description }) => (
  <div className={classes.heroUnit}>
    <div className={classes.heroContent}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        {description}
      </Typography>
      <div className={classes.heroSearch}>
        <Grid container spacing={16} justify="center">
          <Grid item xs={9}>
            <TextField
              id="standard-search"
              label="Search Chrome DevTools"
              type="search"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Hero);
