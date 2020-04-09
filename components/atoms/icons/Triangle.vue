<script>
export default {
  render(createElement) {
    return createElement('div', { class: 'triangle' })
  }
}
</script>

<style lang="scss" scoped>
.triangle {
  border-top: 50px solid #000000;
  border-right: 50px solid transparent;
  border-bottom: 50px solid #bdbdbd;
  border-left: 50px solid transparent;
  border-left-width: 30px;
  border-right-width: 30px;
  border-bottom-width: 35px;
  border-top-width: 35px;

  @include mq(sm) {
    border-left-width: 40px;
    border-right-width: 40px;
    border-bottom-width: 40px;
    border-top-width: 40px;
  }

  @include mq(md) {
    border-left-width: 50px;
    border-right-width: 50px;
    border-bottom-width: 50px;
    border-top-width: 50px;
  }
}
</style>
