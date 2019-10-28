<template>
  <div>
    <div>
      <div v-for="question in questionnaire" v-bind:key="question">
        <div v-if="question.id === currentQuestion">
          <h3>{{question.title}}</h3>
          <div v-for="response in question.result" v-bind:key="response">
            <input class="form-check-input" type="checkbox" v-model="checkedNames" v-bind:value="response" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              {{response}}
            </label>
          </div>
          <button v-on:click="onSubmit" type="submit">Valider</button>
        </div>
      </div><span>Noms cochés : {{ checkedNames }}</span>
    </div>
  </div>

</template>

<script>
const shortid = require('shortid')

export default {
  data () {
    return {
      checkedNames: [],
      currentQuestion: null,
      idUser: '',
      questionnaire: '',
      questionsList: [],
      index: 0
    }
  },
  created: function () {
    this.getDoc()
    this.getQuestion()
    this.getQuestionsList()
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      console.log(this.checkedNames)
      var d = new Date()
      console.log(shortid.generate() + '_' + d.getDate() + d.getMonth() + d.getHours())
      this.$pouchdb.put({
        _id: shortid.generate() + '_' + d.getDate(),
        checkbox: this.checkedNames
      })
      this.nextQuestion()
    },
    getDoc () {
      this.$pouchdb.get(this.$route.params.idUser).then((doc) => {
        this.testos = doc
      }).catch((err) => {
        console.log(err)
      })
    },
    getQuestionsList () {
      while (this.questionsList.length < 10) {
        var oui = true
        var r = Math.floor(Math.random() * 10) + 1
        for (var i = 0; i < 9; i++) {
          if (this.questionsList[i] === r) {
            oui = false
          }
        }
        if (oui === true) {
          this.questionsList.push(r)
        }
      }
      this.currentQuestion = this.questionsList[0]
    },
    nextQuestion () {
      this.currentQuestion = this.questionsList[this.questionsList.indexOf(this.currentQuestion) + 1]
    },
    getQuestion () {
      this.$pouchdb.get('8a7903c0-bcdd-460b-a91b-edc508abaf26').then((doc) => {
        this.questionnaire = doc.questions
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
