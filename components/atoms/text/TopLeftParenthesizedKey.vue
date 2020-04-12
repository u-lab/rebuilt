<script>
export default {
  props: {
    element: {
      type: String,
      default: 'p'
    },

    text: {
      type: String,
      default: null
    }
  },

  render(createElement) {
    return createElement(this.element, { class: 'text' }, this.text)
  }
}
</script>

<style lang="scss" scoped>
.text {
  position: relative;
  padding: 0.25rem 0 0.25rem 1rem;

  &::before {
    position: absolute;
    content: '';
    width: 1rem;
    height: 1rem;

    top: 0;
    left: 0;
    border-top: 0.25rem solid $font-color-light-navy;
    border-left: 0.25rem solid $font-color-light-navy;
  }
}
</style>
