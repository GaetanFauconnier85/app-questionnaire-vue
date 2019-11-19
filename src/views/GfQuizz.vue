<template>
  <QuizzComponent>
      <img alt="Vue logo" src="../assets/logo.png">
  </QuizzComponent>
</template>

<script>
// @ is an alias to /src
import QuizzComponent from '@/components/QuizzComponent.vue'

export default {
  name: 'questionnaire',
  components: {
    QuizzComponent
  }
}
</script>
