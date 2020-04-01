<template>
  <div id="app">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="triggerDrawer">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      VueViewer
      <mu-menu slot="right" :open.sync="actionMenu">
        <mu-button flat><mu-icon value="more_vert"></mu-icon></mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="actionClick('undo')">
            <mu-icon value="undo"></mu-icon>撤销
          </mu-list-item>
          <mu-list-item button  @click="actionClick('redo')">
            <mu-icon value="redo"></mu-icon>回撤
          </mu-list-item>
          <mu-list-item button @click="actionClick('info')">
            <mu-icon value="info"></mu-icon>信息
          </mu-list-item>
          <mu-list-item button @click="actionClick('tag')">
            <mu-icon value="format_list_bulleted"></mu-icon>标签
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-flex class="demo-linear-progress">
      <mu-linear-progress mode="determinate" :value="progressPercent" color="secondary"></mu-linear-progress>
    </mu-flex>
    <div class="viewer-container">
      <viewer
        ref="viewer"
        :data="urls"
        :tool="selectTool"
        :draw-tool="selectDrawTool"
        :line-color="lineColor"
        v-on:on-image-change="onImageChange"
        v-on:on-progress="displayProgress"></viewer>
    </div>
    <div class="float-button-area">
      <draw-tool v-if="selectTool=='Draw'" v-on:on-select="selectDrawTool = $event"></draw-tool>
    </div>
    <div class="float-button-area" v-if="selectTool=='Livewire'||selectTool=='Floodfill'">
      <mu-button small fab :color="lineColor" @click="selectColor">
      </mu-button>
      <input v-model="lineColor" ref="input-color" type="color" hidden/>
    </div>
    <div style="margin: 1rem;background: white;display: flex;flex-direction: column" v-if="selectTool=='Filter'">
      <iv-slider v-model="filterRange" :max="filterMax" :min="filterMin" range showTip="always"></iv-slider>
      <mu-button @click="runThresholdFilter">应用</mu-button>
    </div>
    <mu-drawer :open.sync="toolDrawer"  :docked="false" :right="false">
      <mu-list>
        <mu-list-item v-for="option in toolOptions" :key="option.name" button @click="onSelectTool(option.name)">
          <mu-icon v-if="selectTool==option.name" value="check"></mu-icon>
          <mu-list-item-title>{{option.label}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>

import Viewer from '../lib/Viewer.vue'
import DrawTool from './DrawTool'
import dcmData from './assets/data'
function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

let type = getQueryString('type')
type = type == null ? 'MR' : type
let dcmFiles = dcmData[type]
const urls = []
for (let fileName of dcmFiles) {
  let url = 'http://' + window.location.host + '/' + type + '/' + fileName
  urls.push(url)
  console.log(url)
}
export default {
  name: 'app',
  components: { DrawTool, Viewer },
  data () {
    return {
      filterRange: [0, 100],
      filterMax: 100,
      filterMin: 0,
      toolDrawer: false,
      toolShift: 'ZoomAndPan',
      actionMenu: false,
      progressPercent: 100,
      urls: urls,
      viewer: null,
      selectDrawTool: '',
      selectTool: 'ZoomAndPan',
      lineColor: '#FFFF00',
      toolOptions: [
        {
          label: '移动缩放',
          name: 'ZoomAndPan'
        },
        {
          label: '滑动浏览',
          name: 'Scroll'
        },
        {
          label: '窗宽窗位',
          name: 'WindowLevel'
        },
        {
          label: '标注工具',
          name: 'Draw'
        },
        {
          label: '分割',
          name: 'Livewire'
        },
        {
          label: '滤波器',
          name: 'Filter'
        }// ,
        // {
        //   label: '等值线',
        //   name: 'Floodfill'
        // }
      ]
    }
  },
  mounted () {
    this.viewer = this.$refs['viewer'].getViewer()
  },
  watch: {
  },
  methods: {
    onSelectTool (toolName) {
      if (toolName === 'Filter') {
        this.onImageChange(this.viewer.getImage())
      }
      this.selectTool = toolName
      this.toolDrawer = false
    },
    triggerDrawer () {
      this.toolDrawer = !this.toolDrawer
    },
    displayProgress (percent) {
      this.progressPercent = percent
    },
    selectColor () {
      let inputColor = this.$refs['input-color']
      inputColor.click()
    },
    onImageChange (data) {
      let range = data.getDataRange()
      this.filterMax = range.max
      this.filterMin = range.min
      this.filterRange = [range.min, range.max]
    },
    runThresholdFilter () {
      this.viewer.onChangeMinMax({ max: this.filterRange[1], min: this.filterRange[0] })
    },
    actionClick (action) {
      this.actionMenu = false
      switch (action) {
        case 'undo':
          this.viewer.onUndo()
          break
        case 'redo':
          this.viewer.onRedo()
          break
        case 'info':
          this.viewer.onToggleInfoLayer()
          break
        case 'tag':
          break
      }
    }
  }
}
</script>

<style>
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
}
.viewer-container {
  position: absolute;
  top: 58px;
  bottom: 0px;
  right: 0px;
  left: 0px;
}
.bottom-nav {
  overflow: auto;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
}
.float-button-area {
  position: absolute;
  right: 30px;
  bottom: 30px;
}
</style>
