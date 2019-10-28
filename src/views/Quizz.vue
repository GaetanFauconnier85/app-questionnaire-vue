<template>
  <QuizzComponent>
    <div class="quizz">
      <img alt="Vue logo" src="../assets/logo.png">
      <QuizzComponent msg="ntm"/>
    </div>
  </QuizzComponent>
</template>

<script>
// @ is an alias to /src
import QuizzComponent from '@/components/QuizzComponent.vue'

export default {
  name: 'quizz',
  components: {
    QuizzComponent
  }
}
</script>
