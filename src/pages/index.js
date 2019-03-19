import React from 'react';
import classNames from 'classnames';
import { graphql } from "gatsby"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SEO from "../components/seo"

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  gridContainer: {
    padding: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 16}px`,
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

function IndexPage(props) {
  const { classes } = props;
  const { data: { allVideo: { group } } } = props;
  const versions = group.map(g => g.edges.map(e => e.node));

  return (
    <React.Fragment>
      <SEO title="Home" />
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
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
        {/* End hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {versions.map((videos, i) => (
            <React.Fragment key={i}>
              <Typography variant="h6" gutterBottom>
                Version {videos[0].version}
              </Typography>
              <Divider />
              <Grid container spacing={40} className={classes.gridContainer}>
                {videos.map((video, k) => (
                  <Grid item key={k} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`} // eslint-disable-line max-len
                        title={video.function_name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="subtitle1" component="h2">
                          { video.function_name }
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
            </React.Fragment>
          ))}
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withStyles(styles)(IndexPage);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allVideo(
      sort: {fields: [version, start], order: ASC}
    ) {
      group (field: version) {
        edges {
          node {
            function_name
            version
            youtube_id
            start
            end
            tags
          }
        }
      }
    }
  }
`
