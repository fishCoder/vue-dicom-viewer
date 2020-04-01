import dwv from 'dwv/dist/dwv'
import viewerUIInit from './viewerUI'
import hook from './hook'
/**
 * 初始化viewer UI
 */
viewerUIInit(dwv)
dwv.image.decoderScripts = {
  'jpeg2000': 'node_modules/dwv/decoders/pdfjs/decode-jpeg2000.js',
  'jpeg-lossless': 'node_modules/dwv/decoders/rii-mango/decode-jpegloss.js',
  'jpeg-baseline': 'node_modules/dwv/decoders/pdfjs/decode-jpegbaseline.js',
  'rle': 'node_modules/dwv/decoders/dwv/decode-rle.js'
}

export default {
  data () {
    return {
      viewer: null,
      options: {
        'containerDivId': 'viewer',
        'gui': ['undo'],
        'loaders': ['File', 'Url', 'GoogleDrive', 'Dropbox'],
        'tools': ['ZoomAndPan', 'Scroll', 'WindowLevel', 'Draw', 'Livewire', 'Filter', 'Floodfill'],
        'filters': ['Threshold', 'Sharpen', 'Sobel'],
        'shapes': ['Arrow', 'Ruler', 'Protractor', 'Rectangle', 'Roi', 'Ellipse', 'FreeHand'],
        'isMobile': true,
        'helpResourcesPath': 'resources/help',
        'defaultCharacterSet': 'chinese'
      }
    }
  },
  methods: {
    init () {
      let viewer = new dwv.App()
      hook(viewer)
      let vm = this
      let listener = function (event) {
        if (event.type === 'load-start') {
          console.time('load-data')
        } else if (event.type === 'load-end') {
          vm.onSliceChangeListener()
          console.timeEnd('load-data')
        } else if (event.type === 'slice-change') {
          vm.onSliceChangeListener()
        } else {
          console.log(event.type, event)
        }
      }
      viewer.addEventListener('load-start', listener)
      viewer.addEventListener('load-end', listener)
      viewer.addEventListener('frame-change', listener)
      viewer.addEventListener('slice-change', listener)
      viewer.addEventListener('wl-width-change', listener)
      viewer.init(this.options)
      if (dwv.browser.hasInputDirectory()) {
        this.options.loaders.splice(1, 0, 'Folder')
      }
      viewer.loadURLs(this.data, {})
      dwv.gui.displayProgress = this.onDisplayProgress
      this.viewer = viewer
    },
    getViewer () {
      return this.viewer
    },
    onDisplayProgress (percent) {
      this.$emit('on-progress', percent)
    },
    selectViewerTool (toolName) {
      if (this.viewer && toolName) {
        console.log('tool:', toolName)
        this.viewer.onChangeTool({ currentTarget: { value: toolName } })
      }
    },
    selectViewerDrawTool (drawToolName) {
      if (this.viewer && drawToolName) {
        console.log('draw tool:', drawToolName)
        this.viewer.onChangeShape({ currentTarget: { value: drawToolName } })
      }
    },
    onSliceChangeListener () {
      this.$emit('on-image-change', this.viewer.getImage())
    },
    selectLineColor (color) {
      if (this.viewer) {
        this.viewer.onChangeLineColour({ currentTarget: { value: color } })
      }
    }
  }
}
