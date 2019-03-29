import React, { useState } from 'react';
import classNames from 'classnames';
import { graphql } from "gatsby"
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SEO from "../components/seo"
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import VideoList from '../components/VideoList'
import VideoModal from '../components/VideoModal'

const styles = theme => ({
  layout: {
    width: 'auto',
    paddingTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

function IndexPage(props) {
  const { classes } = props;
  const { data: { allVideo: { edges } } } = props;
  const versions = edges.map(i => i.node);
  const heroDescription = 'Search Chrome DevTools Updates !!'

  const [modalOpen, handleModal] = useState(false);
  const [youtube, activateYoutube] = useState(false);
  const handleModalOpen = (id, fn) => {
    activateYoutube({id, fn});
    handleModal(true);
  }
  const handleModalClose = () => handleModal(false);

  return (
    <React.Fragment>
      <SEO title="Home" />
      <CssBaseline />
      <Layout>
        {/* Hero unit */}
        <Hero title="Chrome DevTools Fun" description={heroDescription} />
        {/* End hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {versions.map((video, i) => (
            <React.Fragment key={i}>
              <Typography variant="h6" gutterBottom>
                Version {video.version}
              </Typography>
              <Divider />
              <VideoList video={video} handleModalOpen={handleModalOpen} />
            </React.Fragment>
          ))}
        </div>
      </Layout>
      <VideoModal youtube={youtube} modalOpen={modalOpen} handleModalClose={handleModalClose} />
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
            update_name
            start
            end
          }
        }
      }
    }
  }
`
