<template>
  <div class="about">
    <input v-model="testos.firstName"/>
  </div>
</template>

<script>

export default {
  data () {
    return {
      testos: ''
    }
  },
  created: function () {
    this.getOnPoutchDb()
  },
  methods: {
    getOnPoutchDb () {
      console.log('oui')
      this.$pouchdb.get('test').then((doc) = {
        console.log('vvvvvvvvvvvvvvvvvvv')
        this.testos = doc
        console.log(doc)
        console.log('vvvvvvvvvvvvvvvvvvv')
      })
    }
  }
}
</script>
