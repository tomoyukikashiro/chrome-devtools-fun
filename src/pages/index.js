import React, { useState } from 'react';
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
import Modal from '@material-ui/core/Modal';
import SEO from "../components/seo"
import Layout from '../components/Layout'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalInner: {
    width: '90%',
    maxWidth: 1280
  },
  modalItem: {
    position: 'relative',
    paddingTop: '56.25%', // 16:9
  },
  modalItemInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  }
});

function IndexPage(props) {
  const { classes } = props;
  const { data: { allVideo: { edges } } } = props;
  const versions = edges.map(i => i.node);

  const [modalOpen, handleModal] = useState(false);
  const [youtube, activateYoutubeId] = useState(false);
  const handleModalOpen = (id, fn) => {
    activateYoutubeId({id, fn});
    handleModal(true);
  }
  const handleModalClose = () => handleModal(false);

  return (
    <React.Fragment>
      <SEO title="Home" />
      <CssBaseline />
      <Layout>
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
          {versions.map((video, i) => (
            <React.Fragment key={i}>
              <Typography variant="h6" gutterBottom>
                Version {video.version}
              </Typography>
              <Divider />
              <Grid container spacing={40} className={classes.gridContainer}>
                {video.items.map((fn, k) => (
                  <Grid item key={k} sm={6} md={4} lg={3} className={classes.gridItem}>
                    <Card className={classes.card} onClick={() => handleModalOpen(video.youtube_id, fn)}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`} // eslint-disable-line max-len
                        title={fn.function_name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="subtitle1" component="h2">
                          { fn.function_name }
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
      </Layout>
      <Modal open={modalOpen} onClose={handleModalClose} className={classes.modal}>
       {youtube ?
        <div className={classes.modalInner}>
          <div className={classes.modalItem}>
            <iframe className={classes.modalItemInner}
              title={youtube.fn.function_name}
              src={`https://www.youtube-nocookie.com/embed/${youtube.id}?autoplay=1&showinfo=0&rel=0&start=${youtube.fn.start}&end=${youtube.fn.end}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
        : null}
      </Modal>
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
      sort: {fields: [version], order: ASC}
    ) {
      edges {
        node {
          version
          youtube_id
          items {
            function_name
            start
            end
          }
        }
      }
    }
  }
`
