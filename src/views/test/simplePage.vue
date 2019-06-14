<template>
  <div class="app-container">
    SmplePage
    <el-input
      v-model="input"
      placeholder="请输入内容"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: 'SimplePage',
  data() {
    return {
      input: 'value'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
