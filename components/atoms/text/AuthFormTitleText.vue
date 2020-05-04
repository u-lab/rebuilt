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
    return createElement(this.element, { class: 'text-center p-4' }, this.title)
  }
}
</script>
