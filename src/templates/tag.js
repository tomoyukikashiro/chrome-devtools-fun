import React, { useState } from 'react'
import classNames from 'classnames';
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

const VersionPage = ({ classes, pageContext: { videos, tag } }) => {
  const title = `Chrome DevTools '${tag}' updates`
  const [modalOpen, handleModal] = useState(false);
  const [youtube, activateYoutube] = useState(false);
  const handleModalOpen = (id, fn) => {
    activateYoutube({id, fn});
    handleModal(true);
  }
  const handleModalClose = () => handleModal(false);

  return (
    <React.Fragment>
      <SEO title={title} />
      <CssBaseline />
      <Layout>
        {/* Hero unit */}
        <Hero title={title} />
        {/* End hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Typography variant="h6" gutterBottom>
            Tag: {tag}
          </Typography>
          <Divider />
          <VideoList videos={videos} handleModalOpen={handleModalOpen} />
        </div>
      </Layout>
      <VideoModal youtube={youtube} modalOpen={modalOpen} handleModalClose={handleModalClose} />
    </React.Fragment>
  )
}

export default withStyles(styles)(VersionPage)
