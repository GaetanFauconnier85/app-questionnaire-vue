<template>
  <div>
    <div>
      <div v-for="question in gfQuestionnaire" v-bind:key="question">
        <div v-if="question.id === gfCurrentQuestion">
          <h3>{{question.title}}</h3>
          <div v-for="response in question.result" v-bind:key="response">
            <input class="form-check-input" type="checkbox" v-model="gfCheckedNames" v-bind:value="response"
                   id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              {{response}}
            </label>
          </div>
          <b-button v-on:click="gfOnSubmit" type="submit">Valider</b-button>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import gfQuestionJson from '../questions'

export default {
  data () {
    return {
      gfCheckedNames: [],
      gfCurrentQuestion: null,
      gfIdUser: '',
      gfQuestionnaire: '',
      gfQuestionsList: [],
      gfIndex: 1,
      gfScore: 0
    }
  },
  created: function () {
    this.gfGetQuestion()
    this.gfGetQuestionsList()
  },
  methods: {
    gfOnSubmit (evt) {
      // methode qui permet de vérifier le(s) choix de l'utilisateurs et de passer a la question suivante
      evt.preventDefault()

      // on vérifie si l'utilisateur a coché une réponse
      if (JSON.stringify(this.gfCheckedNames) === JSON.stringify([])) {
        // si non on ne fais rien
      } else {
        // pour le nombre de questions totals
        for (var i = 0; i < this.gfQuestionnaire.length; i++) {
          // on regarde la question dont l'id correspond a la question courante
          if (this.gfQuestionnaire[i].id === this.gfCurrentQuestion) {
            // si la reponse correspond a ce qu'a donné l'utilisateur alors on augmente le score de 1
            if (JSON.stringify(this.gfQuestionnaire[i].response) === JSON.stringify(this.gfCheckedNames)) {
              this.gfScore += 1
            }
          }
        }

        // on reinitialise les case a cocher
        this.gfCheckedNames = []

        // si on a atteint la dixieme question alors on est redirigé vers la page de resultat
        if (this.gfIndex >= 10) {
          this.$router.push({ name: 'result', params: { score: this.gfScore } })
        } else { // sinon on augmente l'index
          this.gfIndex += 1
        }
        // permet de passer a la question suivante
        this.gfNextQuestion()
      }
    },
    gfGetQuestionsList () {
      // permet d'organiser les questions dans un ordre aléatoire
      while (this.gfQuestionsList.length < 10) {
        var gfVerify = true
        var r = Math.floor(Math.random() * 10) + 1
        for (var i = 0; i < 9; i++) {
          if (this.gfQuestionsList[i] === r) {
            gfVerify = false
          }
        }
        if (gfVerify === true) {
          this.gfQuestionsList.push(r)
        }
      }

      this.gfCurrentQuestion = this.gfQuestionsList[0]
    },
    gfNextQuestion () {
      // permet de recuperer la prochaine question
      this.gfCurrentQuestion = this.gfQuestionsList[this.gfQuestionsList.indexOf(this.gfCurrentQuestion) + 1]
    },
    gfGetQuestion () {
      // on recupere la liste des questions
      this.gfQuestionnaire = gfQuestionJson.questions
    }
  }
}
</script>
