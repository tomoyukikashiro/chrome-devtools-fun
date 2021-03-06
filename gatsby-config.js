const GA_TRACKING_ID = 'UA-137379002-1'

module.exports = {
  siteMetadata: {
    url: `https://chromedevtools.fun`,
    title: `Chrome DevTools Fun 🎉`,
    description: `You can search Chrome DevTools updates and functions.`,
    account: `tomoyukikashiro`,
    author: `Tomoyuki Kashiro`,
    gaTrackingId: GA_TRACKING_ID
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `video`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `video`,
        path: `${__dirname}/static/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-TDQ82ZF"
      },
    },
  ],
}
