<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    element: {
      type: String,
      default: 'h1'
    }
  },

  render(createElement) {
    return createElement('div', { class: 'py-2' }, [
      createElement(this.element, { class: 'user-title-text' }, this.title)
    ])
  }
}
</script>

<style lang="scss" scoped>
.user-title-text {
  font-size: 1.75rem;
}
</style>
