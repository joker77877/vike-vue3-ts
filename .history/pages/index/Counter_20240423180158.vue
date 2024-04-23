<template>
  <button type="button" @click="state.count++">Counter {{ state.count }}</button>
  <el-button>saf</el-button>
  <a-button>saf</a-button>
  <!-- <el-button>saf</el-button> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const state = reactive({ count: 0 })
</script>
