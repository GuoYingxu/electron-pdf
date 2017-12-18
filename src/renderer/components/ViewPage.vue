<template lang="pug">
  .viewer
    webview(ref='pdfviewer',:src="viewUrl")
</template>

<script>

const isRenderer = require('is-electron-renderer')
const electron = require('electron')
const path = require('path')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const extend = require('deep-extend')
const got = require('got')

const BrowserWindow = isRenderer
  ? electron.remote.BrowserWindow : electron.BrowserWindow
console.log(path.resolve(__dirname))
const PDF_JS_PATH = path.join(path.resolve(__dirname), '../../pdfjs', 'web', 'viewer.html')
function isAlreadyLoadedWithPdfJs (url) {
  return url.startsWith(`file://${PDF_JS_PATH}?file=`)
}

function isFile (url) {
  return url.match(/^file:\/\//i)
}

function getMimeOfFile (url) {
  const fileUrl = url.replace(/^file:\/\//i, '')
  const buffer = readChunk.sync(fileUrl, 0, 262)
  const ft = fileType(buffer)

  return ft ? ft.mime : null
}

function hasPdfExtension (url) {
  return url.match(/\.pdf$/i)
}

function isPDF (url) {
  return new Promise((resolve, reject) => {
    if (isAlreadyLoadedWithPdfJs(url)) {
      resolve(false)
    } else if (isFile(url)) {
      resolve(getMimeOfFile(url) === 'application/pdf')
    } else if (hasPdfExtension(url)) {
      resolve(true)
    } else {
      got.head(url).then(res => {
        if (res.headers.location) {
          isPDF(res.headers.location).then(isit => resolve(isit))
          .catch(err => reject(err))
        } else {
          resolve(res.headers['content-type'].indexOf('application/pdf') !== -1)
        }
      }).catch(err => reject(err))
    }
  })
}
export default {
  data(){
    return {
      viewer: null,
      url: "",
    }
  },
  mounted(){
    this.viewer = this.$refs.pdfviewer;
    this.url = path.join(electron.remote.app.getPath('desktop'),'pdf.pdf')
  },
  computed:{
    viewUrl(){
      return  `file://${PDF_JS_PATH}?file=file://${this.url}`
      // return `file://${path.join(electron.remote.app.getAppPath(), 'pdfjs', 'web', 'viewer.html')}?file=`
    }
  },
  methods:{
  },
  
}
</script>
<style lang="scss" scoped>
.viewer{
  height: 100%;
  width: 100%; 
}
webview{
  height: 100%;
  width: 100%
}
</style>
