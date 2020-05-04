<template>
  <div>
    <h2 v-text="title" />

    <v-row justify="center">
      <v-card
        v-for="(item, key) in items"
        :key="key"
        width="150px"
        class="mr-2"
      >
        <div class="pa-2 text-center">
          <library01 v-if="isLibrary" height="80px" />
          <school01 v-if="isSchool" height="80px" />
          <skill01 v-if="isSkill" height="80px" />
          <trophy01 v-if="isReward" height="80px" />
        </div>

        <v-card-text v-text="item.name" class="pa-2 text-center" />
      </v-card>
    </v-row>
  </div>
</template>

<script>
const Library01 = () => import('@/components/atoms/icons/Library01')
const School01 = () => import('@/components/atoms/icons/School01')
const Skill01 = () => import('@/components/atoms/icons/Skill01')
const Trophy01 = () => import('@/components/atoms/icons/Trophy01')

export default {
  components: {
    School01,
    Skill01,
    Trophy01,
    Library01
  },

  props: {
    title: {
      type: String,
      required: true
    },

    iconName: {
      type: String,
      default: 'school'
    },

    items: {
      type: Array,
      required: true
    }
  },

  computed: {
    isLibrary() {
      return this.iconName === 'library'
    },

    isSchool() {
      return this.iconName === 'school'
    },

    isSkill() {
      return this.iconName === 'skill'
    },

    isReward() {
      return this.iconName === 'reward'
    }
  }
}
</script>
