import overlays from 'dwv/locales/zh/overlays'
/**
 * Application GUI.
 */
export default function (dwv) {
  dwv.gui.info.overlayMaps = overlays
  // Default colour maps.
  dwv.tool.colourMaps = {
    'plain': dwv.image.lut.plain,
    'invplain': dwv.image.lut.invPlain,
    'rainbow': dwv.image.lut.rainbow,
    'hot': dwv.image.lut.hot,
    'hotiron': dwv.image.lut.hot_iron,
    'pet': dwv.image.lut.pet,
    'hotmetalblue': dwv.image.lut.hot_metal_blue,
    'pet20step': dwv.image.lut.pet_20step
  }
  // Default window level presets.
  dwv.tool.defaultpresets = {}
  // Default window level presets for CT.
  dwv.tool.defaultpresets.CT = {
    'mediastinum': { 'center': 40, 'width': 400 },
    'lung': { 'center': -500, 'width': 1500 },
    'bone': { 'center': 500, 'width': 2000 },
    'brain': { 'center': 40, 'width': 80 },
    'head': { 'center': 90, 'width': 350 }
  }

  // decode query
  dwv.utils.decodeQuery = function (query, callback) {
    dwv.utils.base.decodeQuery(query, callback)
  }

  // Prompt
  dwv.gui.prompt = dwv.gui.base.prompt
  // Progress
  dwv.gui.displayProgress = function (percent) {
  }
  // Focus
  dwv.gui.focusImage = function () {
  }
  // get element
  dwv.gui.getElement = dwv.gui.base.getElement
  // refresh
  dwv.gui.refreshElement = function (element) {
  }
  // Slider
  dwv.gui.Slider = function (app) {
    this.append = function () {}
    this.initialise = function () {}
  }
  // plot
  dwv.gui.plot = function (div, data, options) {
  }
  // Post process table
  dwv.gui.postProcessTable = function (table) {
    let tableClass = table.className
    // css
    table.className += ' table-stripe ui-responsive'
    // add columntoggle
    table.setAttribute('data-role', 'table')
    table.setAttribute('data-mode', 'columntoggle')
    table.setAttribute('data-column-btn-text', dwv.i18n('basics.columns') + '...')
    // add priority columns for columntoggle
    let addDataPriority = function (cell) {
      let text = cell.firstChild.data
      if (tableClass === 'tagsTable') {
        if (text !== 'value' && text !== 'name') {
          cell.setAttribute('data-priority', '5')
        }
      } else if (tableClass === 'drawsTable') {
        if (text === 'description') {
          cell.setAttribute('data-priority', '1')
        } else if (text === 'frame' || text === 'slice') {
          cell.setAttribute('data-priority', '5')
        }
      }
    }
    if (table.rows.length !== 0) {
      let hCells = table.rows.item(0).cells
      for (let c = 0; c < hCells.length; ++c) {
        addDataPriority(hCells[c])
      }
    }
    // return
    return table
  }
  // Tags table
  dwv.gui.DicomTags = dwv.gui.base.DicomTags
  // DrawList table
  dwv.gui.DrawList = dwv.gui.base.DrawList

  // Loaders
  dwv.gui.Loadbox = dwv.gui.base.Loadbox
  // File loader
  dwv.gui.FileLoad = dwv.gui.base.FileLoad
  dwv.gui.FileLoad.prototype.onchange = function (/* event */) {
  }
  // Folder loader
  dwv.gui.FolderLoad = dwv.gui.base.FolderLoad
  dwv.gui.FolderLoad.prototype.onchange = function (/* event */) {
  }
  // Url loader
  dwv.gui.UrlLoad = dwv.gui.base.UrlLoad
  dwv.gui.UrlLoad.prototype.onchange = function (/* event */) {
  }

  // Toolbox
  dwv.gui.Toolbox = function (app) {
    let base = new dwv.gui.base.Toolbox(app)

    this.setup = function (list) {
      base.setup(list)
    }
    this.display = function (flag) {
      base.display(flag)
    }
    this.initialise = function (list) {
      base.initialise(list)
    }
  }
  // Window/level
  dwv.gui.WindowLevel = dwv.gui.base.WindowLevel
  // Draw
  dwv.gui.Draw = dwv.gui.base.Draw
  // ColourTool
  dwv.gui.ColourTool = dwv.gui.base.ColourTool
  // ZoomAndPan
  dwv.gui.ZoomAndPan = dwv.gui.base.ZoomAndPan
  // Scroll
  dwv.gui.Scroll = dwv.gui.base.Scroll
  // Filter
  dwv.gui.Filter = dwv.gui.base.Filter

  // Filter: threshold
  dwv.gui.Threshold = function (app) {
    this.setup = function () {}
    this.display = function (flag) {}
    this.initialise = function () {}
  }
  // Filter: sharpen
  dwv.gui.Sharpen = dwv.gui.base.Sharpen
  // Filter: sobel
  dwv.gui.Sobel = dwv.gui.base.Sobel

  // Undo/redo
  dwv.gui.Undo = dwv.gui.base.Undo
  // Help
  dwv.gui.appendHelpHtml = dwv.gui.base.appendHelpHtml
  // Version
  dwv.gui.appendVersionHtml = dwv.gui.base.appendVersionHtml
}
