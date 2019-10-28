<template>
  <div>
    <b-container>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="input-group-2" aria-required="true" label="Your first name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.firstName"
            required
            placeholder="Enter first name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" aria-required="true" label="Your last name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.lastName"

            placeholder="Enter last name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" aria-required="true" label="Your compagny name:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.compagnyName"

            placeholder="Enter compagny name"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" v-on:click="insertOnPoutchDb" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
const shortid = require('shortid')

export default {
  data () {
    return {
      form: {
        _id: '',
        firstName: '',
        lastName: '',
        compagnyName: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$router.push({ name: 'questionnaire', params: { idUser: this._id } })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.compagnyName = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    insertOnPoutchDb () {
      this._id = shortid.generate()
      this.$pouchdb.put({
        _id: this._id,
        firstName: this.form.lastName,
        lastName: this.form.lastName,
        compagnyName: this.form.compagnyName
      })

      this.$pouchdb.replicate.to('http://127.0.0.1:5984/epsi')
    }
  }
}
</script>
