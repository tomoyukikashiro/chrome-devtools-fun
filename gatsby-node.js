/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
const flatMap = require('lodash/flatMap')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const VersionPage = path.resolve('src/templates/version.js')
  const TagPage = path.resolve('src/templates/tag.js')

  const versions = await graphql(`
    query {
      allVideo(sort: {fields: [version], order: ASC}) {
        edges {
          node {
            version
            youtube_id
            chapters {
              name
              start
              end
              tags
            }
          }
        }
      }
    }`)

  versions.data.allVideo.edges.forEach(({ node }) => {
    createPage({
      path: `versions/v${node.version}`,
      component: VersionPage,
      context: {
        version: node.version
      }
    })
  })
  let tags = Array.from(new Set(flatMap(versions.data.allVideo.edges, e => flatMap(e.node.chapters, i => i.tags)))).sort()
  const mergeId = (videos, youtubeId) => videos.map(v => ({ ...v, youtubeId }))
  tags.forEach(tag => {
    const videos = flatMap(versions.data.allVideo.edges, ({ node }) => mergeId(node.chapters, node.youtube_id))
    const taggedVideos = videos.filter(video => video.tags.includes(tag))

    createPage({
      path: `tags/${tag}`,
      component: TagPage,
      context: {
        tag,
        videos: taggedVideos
      }
    })
  })

}
