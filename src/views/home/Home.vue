<template>
  <div class="wrapper">
    <StaticPart />
    <Near />
  </div>
  <Docker />
</template>

<script>
import Docker from '../../components/Docker'
import StaticPart from './StaticPart'
import Near from './Near'

export default {
  name: 'Home',
  components: {
    Docker,
    StaticPart,
    Near
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: .5rem;
    left: 0;
    padding: 0 .18rem;
  }
</style>
