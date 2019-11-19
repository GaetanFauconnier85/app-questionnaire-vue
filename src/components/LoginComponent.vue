<template>
  <div>
    <b-container>
      <b-form @reset="gfOnReset" v-if="show">
        <b-form-group id="input-group-2" aria-required="true" label="Your first name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.gfFirstName"
            required
            placeholder="Enter first name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" aria-required="true" label="Your last name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.gfLastName"
            required
            placeholder="Enter last name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" aria-required="true" label="Your compagny name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.gfCompagnyName"
            required
            placeholder="Enter compagny name"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" v-on:click="gfInsertOnPoutchDb" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
const gfshortid = require('shortid')

export default {
  mixins: [validationMixin],
  data () {
    return {
      form: {
        _id: '',
        gfFirstName: '',
        gfLastName: '',
        gfCompagnyName: ''
      },
      show: true
    }
  },
  validations: {
    form: {
      gfFirstName: {
        required
      },
      gfLastName: {
        required
      },
      gfCompagnyName: {
        required
      }
    }
  },
  methods: {
    gfOnReset (evt) {
      evt.preventDefault()

      // reset les valeurs du formulaire
      this.form.gfFirstName = ''
      this.form.gfLastName = ''
      this.form.gfCompagnyName = ''

      // Astuce pour réinitialiser / effacer l'état de validation du formulaire du navigateur natif
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    gfInsertOnPoutchDb () {
      // si les champs du formulaires sont remplies alors on enregistre les données dans la base
      this.$v.form.$touch()
      if (this.$v.form.$anyError) {
        // on ne fais rien
      } else {
        var vm = this

        // on genere un id aléatoire
        this._id = gfshortid.generate()

        // on enregistre l'utilisateur
        this.$pouchdb.put({
          _id: this._id,
          gfFirstName: this.form.gfLastName,
          gfLastName: this.form.gfLastName,
          gfCompagnyName: this.form.gfCompagnyName
        }).then(function (doc) {
          // on le redirige sur la page du questionnaire
          vm.$router.push({ name: 'questionnaire' })
        })

        // on replique les données sur la bdd distante
        this.$pouchdb.replicate.to('http://127.0.0.1:5984/epsi')
      }
    }
  }
}
</script>
