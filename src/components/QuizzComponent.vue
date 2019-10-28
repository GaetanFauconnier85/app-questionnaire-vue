<template>
  <h1></h1>
</template>

<script>
export default {
  data () {
    return {
      testos: '',
      idUser: ''
    }
  },
  created: function () {
    this.getDoc()
  },
  methods: {
    getDoc () {
      this.$pouchdb.get(this.$route.params.idUser).then((doc) => {
        this.testos = doc
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
