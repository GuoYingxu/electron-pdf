<template lang="pug">
  .enter
    Button(@click='toMenu') 这里是入口
</template>
<script>
export default {
  methods:{
    toMenu(){
      this.$router.push('/menu')
    }
  }
}
</script>
