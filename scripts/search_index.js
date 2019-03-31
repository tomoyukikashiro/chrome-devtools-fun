#!/usr/bin/env node
require('dotenv').config()
const path = require('path')
const fs = require('fs')
const flatMap = require('lodash/flatMap')
const slugify = require('slugify')

const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_ADMIN_API_KEY)
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME)
const data_path = path.resolve(process.cwd(), 'static/data')

const convert_data_for_index = data => {
  return flatMap(data, video => {
    return video.chapters.map(chapter => {
      return {
        objectID: slugify(`${video.version} ${chapter.name}`, { lower: true }),
        youtube_id: video.youtube_id,
        version: video.version,
        ...chapter
      }
    })
  })
}

fs.readdir(data_path, (e, files) => {
  const data = files.map(file => {
    const file_path = path.join(data_path, file)
    return JSON.parse(fs.readFileSync(file_path))
  })

  const data_for_index = convert_data_for_index(data)
  index.saveObjects(data_for_index, (error, content) => {
    if(error) throw error
    console.info(`Finished indexing (${content.objectIDs.length}) objects`)
  })
})

