<template>
  <div>
    <H1>
      Votre score est de {{gfScore}} !
    </H1>
    <div>
      <b-button type="submit" v-on:click="returnToAcceuil" variant="primary">Débuter un nouveau questionaire</b-button>
    </div>
  </div>

</template>

<script>
export default {
  data: function () {
    return {
      gfScore: null
    }
  },
  created: function () {
    this.gfGetScore()
  },
  methods: {
    gfGetScore () {
      this.gfScore = this.$route.params.score
      this.$pouchdb.get(this.$route.params.score).then((doc) => {
        this.gfScore = doc
      }).catch((err) => {
        console.log(err)
      })
    },
    returnToAcceuil () {
      this.$router.push({ name: 'questionnaire' })
    }
  }
}
</script>
