<template>
  <mu-menu :open.sync="open" placement="top-start" open-on-hover>
    <mu-button fab small color="primary">
      <mu-icon value="create"></mu-icon>
    </mu-button>
    <mu-list slot="content">
      <mu-list-item button v-for="option in drawToolOptions" :key="option.name" @click="onSelectDrawTool(option.name)">
        <mu-icon value="check" v-if="option.name == selectDrawTool"></mu-icon>
        <mu-list-item-title>{{option.label}}</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-menu>
</template>

<script>
export default {
  name: 'DrawTool',
  data () {
    return {
      open: false,
      selectDrawTool: 'Arrow',
      drawToolOptions: [
        {
          name: 'Arrow',
          label: '箭头'
        },
        {
          name: 'Ruler',
          label: '测量尺'
        },
        {
          name: 'Protractor',
          label: '量角器'
        },
        {
          name: 'Rectangle',
          label: '矩形'
        },
        {
          name: 'Roi',
          label: '标靶'
        },
        {
          name: 'Ellipse',
          label: '椭圆'
        },
        {
          name: 'FreeHand',
          label: '手绘'
        }
      ]
    }
  },
  methods: {
    onSelectDrawTool (toolName) {
      this.selectDrawTool = toolName
      this.$emit('on-select', toolName)
      this.open = false
    }
  }
}
</script>

<style scoped>

</style>
