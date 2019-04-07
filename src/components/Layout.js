import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import LabelIcon from "@material-ui/icons/Label"
import HistoryIcon from "@material-ui/icons/History"
import MenuIcon from "@material-ui/icons/Menu"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import CodeIcon from "@material-ui/icons/Code"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"
import flatMap from "lodash/flatMap"

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: "flex",
  },
  homeLink: {
    color: "#fff",
    textDecoration: "none",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  listLink: {
    display: "block",
    textDecoration: "none",
  },
  listItem: {
    paddingRight: 0,
  },
  iconText: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  listNested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
})

class Layout extends React.Component {
  state = {
    mobileOpen: false,
    versionOpen: false,
    tagOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }
  handleVersionToggle = () => {
    this.setState(state => ({ versionOpen: !state.versionOpen }))
  }
  handleTagToggle = () => {
    this.setState(state => ({ tagOpen: !state.tagOpen }))
  }

  render() {
    const { classes, theme, children } = this.props

    const drawer = (
      <StaticQuery
        query={graphql`
          query {
            site {
              siteMetadata {
                account
                author
              }
            }
            allVideo(sort: { fields: [version], order: DESC }) {
              edges {
                node {
                  version
                  chapters {
                    tags
                  }
                }
              }
            }
          }
        `}
        render={({ site: { siteMetadata }, allVideo: { edges } }) => {
          const { account } = siteMetadata
          const versions = edges.map(e => e.node.version)
          let tags = Array.from(
            new Set(flatMap(edges, e => flatMap(e.node.chapters, i => i.tags)))
          ).sort()

          return (
            <>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <ListItem button onClick={this.handleVersionToggle}>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Versions" />
                  {this.state.versionOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse
                  in={this.state.versionOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {versions.map(v => (
                      <Link
                        className={classes.listLink}
                        to={`/versions/v${v}/`}
                        key={v}
                      >
                        <ListItem button className={classes.listNested}>
                          <ListItemText inset primary={`Ver. ${v}`} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </List>
              <Divider />
              <List>
                <ListItem button onClick={this.handleTagToggle}>
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Tags" />
                  {this.state.tagOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.tagOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {tags.map(t => (
                      <Link
                        className={classes.listLink}
                        to={`/tags/${t}/`}
                        key={t}
                      >
                        <ListItem button className={classes.listNested}>
                          <ListItemText inset primary={t} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </List>
              <Divider />
              <List>
                <ListItem
                  className={classes.listItem}
                  button
                  component="a"
                  href="https://www.youtube.com/playlist?list=PLNYkxOF6rcIBDSojZWBv4QJNoT4GNYzQD"
                >
                  <ListItemIcon>
                    <VideoLibraryIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.iconText}
                    primary="What's New in DevTools"
                  />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component="a"
                  href="https://www.youtube.com/playlist?list=PLNYkxOF6rcIC74v_mCLUXbjj7Ng7oTAPE"
                >
                  <ListItemIcon>
                    <VideoLibraryIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.iconText}
                    primary="DevTools 101"
                  />
                </ListItem>
                <Divider />
                <ListItem
                  className={classes.listItem}
                  button
                  component="a"
                  href={`https://twitter.com/${account}/`}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.iconText}
                    primary="Developed by"
                  />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  button
                  component="a"
                  href={`https://github.com/tomoyukikashiro/chrome-devtools-fun`}
                >
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText
                    className={classes.iconText}
                    primary="Repository"
                  />
                </ListItem>
              </List>
            </>
          )
        }}
      />
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Link className={classes.homeLink} to="/">
              <Typography variant="h6" color="inherit" noWrap>
                Chrome DevTools Fun
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
          <footer className={classes.footer}>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              component="p"
            >
              Made with{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>{" "}
              to Chrome DevTools
            </Typography>
          </footer>
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout)
