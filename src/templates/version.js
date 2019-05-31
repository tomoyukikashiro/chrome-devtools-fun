import React, {useEffect, useState} from 'react'
import classNames from "classnames"
import { graphql } from "gatsby"
import Divider from "@material-ui/core/Divider"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import VideoList from "../components/VideoList"
import VideoModal from "../components/VideoModal"
import withRoot from "../withRoot"
import { getVideoByHash } from '../lib/video'

const styles = theme => ({
  layout: {
    maxWidth: 1440,
    margin: `0 auto`,
    paddingTop: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
})

const VersionPage = ({
  classes,
  data: {
    allVideo: { edges },
  },
}) => {
  const video = edges[0].node
  const title = `Chrome DevTools Version ${video.version} updates`
  const [modalOpen, handleModal] = useState(false)
  const [youtube, activateYoutube] = useState(false)
  const handleModalOpen = (id, chapter) => {
    activateYoutube({ id, chapter })
    handleModal(true)
  }
  const handleModalClose = () => handleModal(false)
  const mergeId = (videos, youtubeId) => videos.map(v => ({ ...v, youtubeId }))

  useEffect(() => {
    const hashSelectedChapeter = getVideoByHash(props.location.hash)
    if (hashSelectedChapeter) {
      hashSelectedChapeter.click();
    }
  }, []);

  return (
    <React.Fragment>
      <Seo title={title} />
      <CssBaseline />
      <Layout>
        {/* Hero unit */}
        <Hero title={title} />
        {/* End hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Typography variant="h6" gutterBottom>
            Version {video.version}
          </Typography>
          <Divider />
          <VideoList
            videos={mergeId(video.chapters, video.youtube_id)}
            handleModalOpen={handleModalOpen}
          />
        </div>
      </Layout>
      <VideoModal
        youtube={youtube}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      />
    </React.Fragment>
  )
}

export default withRoot(withStyles(styles)(VersionPage))

export const pageQuery = graphql`
  query videos($version: Int) {
    allVideo(filter: { version: { eq: $version } }, limit: 1) {
      edges {
        node {
          youtube_id
          version
          chapters {
            name
            start
            end
            tags
          }
        }
      }
    }
  }
`
