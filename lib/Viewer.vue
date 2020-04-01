<template>
  <div id="viewer">
    <div ref="layerContainer" class="layerContainer">
      <canvas class="imageLayer">Only for HTML5 compatible browsers...</canvas>
      <div class="drawDiv"></div>
      <div class="infoLayer">
        <div class="infotl info"></div>
        <div class="infotc infoc"></div>
        <div class="infotr info"></div>
        <div class="infocl infoc"></div>
        <div class="infocr infoc"></div>
        <div class="infobl info"></div>
        <div class="infobc infoc"></div>
        <div class="infobr info"></div>
      </div>
      <div class="history" title="History" style="display:none;"></div>
    </div>
  </div>
</template>

<script>
import Viewer from './Viewer'
export default {
  name: 'Viewer',
  mixins: [Viewer],
  props: {
    data: {
      type: Array,
      required: false
    },
    tool: {
      type: String,
      required: false
    },
    drawTool: {
      type: String,
      required: false
    },
    lineColor: {
      type: String,
      required: false,
      default: '#FFFF00'
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.init()
    this.selectViewerTool(this.tool)
    this.selectViewerDrawTool(this.drawTool)
  },
  watch: {
    tool (n, o) {
      this.selectViewerTool(n)
    },
    drawTool (n, o) {
      this.selectViewerDrawTool(n)
    },
    lineColor (n, o) {
      this.selectLineColor(n)
    }
  },
  methods: {
  }
}
</script>

<style>
  #viewer {
    width: 100%;
    height: 100%;
    background-color: #222;
    display: flex;
    align-items: center;
  }
  .layerContainer {
    position: relative;
    padding: 0;
    background-color: #1e1e1e;
  }
  .imageLayer {
    position: absolute;
    left: 0px; }
  .drawDiv {
    position: absolute;
    pointer-events: none;
  }
  /* Info */
  .info { color: #cde; text-shadow: 1px 1px #000; font-size: 80%; }
  .infoc { color: #ff0; text-shadow: 1px 1px #000; font-size: 120%; }
  .infotl { position: absolute; top: 0; left: 0; text-align: left; }
  .infotc { position: absolute; top: 0; left: 50%; right: 50%; text-align: center; }
  .infotr { position: absolute; top: 0; right: 0; text-align: right; }
  .infocl { position: absolute; bottom: 50%; left: 0; text-align: left; }
  .infocr { position: absolute; bottom: 50%; right: 2px; text-align: right; }
  .infobl { position: absolute; bottom: 0; left: 0; text-align: left; }
  .infobc { position: absolute; bottom: 0; left: 50%; right: 50%; text-align: center; }
  .infobr { position: absolute; bottom: 0; right: 0; text-align: right; }

  .infoLayer ul { margin: 0; padding: 2px; list-style: none; }
  .infoLayer li { margin-top: 0; }
  .infoLayer canvas { margin: 0; padding: 2px; }
</style>
