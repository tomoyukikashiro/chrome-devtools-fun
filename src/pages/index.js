import React, { useState } from "react"
import classNames from "classnames"
import { graphql } from "gatsby"
import Divider from "@material-ui/core/Divider"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import VideoList from "../components/VideoList"
import VideoModal from "../components/VideoModal"
import withRoot from "../withRoot"

const styles = theme => ({
  layout: {
    maxWidth: 1440,
    margin: `0 auto`,
    paddingTop: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
})

function IndexPage(props) {
  const { classes } = props
  const {
    data: {
      allVideo: { edges },
    },
  } = props
  const versions = edges.map(i => i.node)
  const heroDescription = "Search Chrome DevTools Updates !!"

  const [modalOpen, handleModal] = useState(false)
  const [youtube, activateYoutube] = useState(false)
  const handleModalOpen = (id, chapter) => {
    activateYoutube({ id, chapter })
    handleModal(true)
  }
  const handleModalClose = () => handleModal(false)
  const mergeId = (videos, youtubeId) => videos.map(v => ({ ...v, youtubeId }))

  return (
    <React.Fragment>
      <Seo title="Home" />
      <CssBaseline />
      <Layout>
        {/* Hero unit */}
        <Hero
          title="Chrome DevTools Fun"
          description={heroDescription}
          handleModalOpen={handleModalOpen}
          showSearch={true}
        />
        {/* End hero unit */}
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {versions.map((video, i) => (
            <React.Fragment key={i}>
              <Typography variant="h6" gutterBottom>
                Version {video.version}
              </Typography>
              <Divider />
              <VideoList
                videos={mergeId(video.chapters, video.youtube_id)}
                handleModalOpen={handleModalOpen}
              />
            </React.Fragment>
          ))}
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

export default withRoot(withStyles(styles)(IndexPage))

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allVideo(sort: { fields: [version], order: DESC }) {
      edges {
        node {
          version
          youtube_id
          chapters {
            name
            start
            end
          }
        }
      }
    }
  }
`
