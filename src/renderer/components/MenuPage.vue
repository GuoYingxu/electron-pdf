<template lang="pug">
  .list
    Row(v-for='name in list',:key="name")
      Button(@click='viewPdf(name)') {{name}} 
</template>
<script>
export default {
  data(){
    return {
      list: ['pdf','pdf1']
    }
  },
  methods:{
    viewPdf(index){
      this.$router.push({
        path:`/view/${index}`
      })
    }
  }
}
</script>
