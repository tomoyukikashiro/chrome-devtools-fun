import React from "react"
import Typography from "@material-ui/core/Typography"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, connectAutoComplete } from "react-instantsearch-dom"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core"
import SearchField from "../components/SearchField"

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 700,
    lineHeight: 1.5,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 6}px`,
  },
  heroTitle: {
    lineHeight: 1.5,
  },
  heroSearch: {
    marginTop: theme.spacing.unit * 4,
  },
})

const Hero = ({
  classes,
  title,
  description,
  showSearch = false,
  handleModalOpen,
}) => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APPLICATION_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
  )
  const AlgoliaSearchField = connectAutoComplete(({ hits }) => (
    <SearchField hits={hits} handleModalOpen={handleModalOpen} />
  ))
  return (
    <div className={classes.heroUnit}>
      <div className={classes.heroContent}>
        <Typography
          className={classes.heroTitle}
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            {" "}
            {description}{" "}
          </Typography>
        )}
        {showSearch && (
          <div className={classes.heroSearch}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={9}>
                <InstantSearch
                  indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
                  searchClient={searchClient}
                >
                  <AlgoliaSearchField />
                </InstantSearch>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  )
}

export default withStyles(styles)(Hero)
