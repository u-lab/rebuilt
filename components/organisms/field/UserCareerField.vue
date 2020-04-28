<template>
  <div>
    <user-career-data-table
      :items="items"
      @add="add"
      @edit="edit"
      @delete="deleted"
    />

    <v-dialog v-model="dialog" width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">追加</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="history.name" :label="$t('name')" outlined />

          <v-dialog
            ref="dialog"
            v-model="dateDialog"
            :return-value.sync="history.date"
            width="300px"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="history.date"
                v-on="on"
                label="日付選択"
                readonly
              />
            </template>
            <v-date-picker v-model="history.date" type="month" scrollable>
              <v-spacer />
              <v-btn
                @click="dateDialog = false"
                v-text="$t('cancel')"
                text
                color="primary"
              />

              <v-btn
                @click="$refs.dialog.save(history.date)"
                v-text="$t('ok')"
                text
                color="primary"
              />
            </v-date-picker>
          </v-dialog>

          <v-select v-model="history.type" :items="typeList" label="カテゴリ" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="dialog = false"
            v-text="$t('cancel')"
            color="blue darken-1"
            text
          />
          <v-btn
            @click="historyAdd()"
            v-text="$t('ok')"
            color="blue darken-1"
            text
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <user-career-alert-dialog
      :dialog="deleteDialog"
      @cancel="deleteDialog = false"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { convertToDate, formatDate } from '@/utils/date'
const UserCareerAlertDialog = () =>
  import('@/components/organisms/dialog/UserCareerAlertDialog')
const UserCareerDataTable = () =>
  import('@/components/organisms/dataTable/UserCareerDataTable')

const History = class {
  constructor(lid, date = null, id = null, name = null, type = null) {
    this.date = date
      ? convertToDate(date)
          .toISOString()
          .substr(0, 7)
      : new Date().toISOString().substr(0, 7)
    this.id = id
    this.lid = lid
    this.name = name
    this.type = type
  }

  get formatDate() {
    return formatDate(convertToDate(this.date), 'yyyy-MM')
  }
}

export default {
  components: {
    UserCareerAlertDialog,
    UserCareerDataTable
  },

  props: {
    value: {
      type: Array,
      required: true
    },

    did: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      dialog: false,
      dateDialog: false,
      deleteDialog: false,
      deleteLid: '',
      history: new History(this.value.length + 1)
    }
  },

  computed: {
    typeList() {
      return [
        { text: this.$t('career'), value: 'career' },
        { text: this.$t('reward'), value: 'reward' },
        { text: this.$t('skill'), value: 'skill' }
      ]
    },

    valueModel: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    },

    didModel: {
      get() {
        return this.did
      },
      set(newVal) {
        return this.$emit('did', newVal)
      }
    },

    items() {
      return this.value.map((obj, idx) => {
        return new History(idx + 1, obj.date, obj.id, obj.name, obj.type)
      })
    }
  },

  methods: {
    add() {
      this.history = new History(this.value.length + 1)
      this.dialog = true
    },

    edit(lid) {
      this.history = clonedeep(this.items.find((obj) => obj.lid === lid))
      this.dialog = true
    },

    deleted(lid) {
      this.deleteLid = lid
      this.deleteDialog = true
    },

    onDelete() {
      const item = this.items.find((obj) => obj.lid === this.deleteLid)
      if (item.id) {
        this.didModel.push(item.id)
      }
      if (this.valueModel.length > 0) {
        this.valueModel = clonedeep(
          this.items.filter((obj) => {
            return obj.lid !== this.deleteLid
          })
        )
      } else {
        this.valueModel = []
      }
      this.deleteDialog = false
    },

    updateDid() {
      return this.$emit('did')
    },

    historyAdd() {
      if (this.history.lid <= this.value.length) {
        this.valueModel.splice(this.history.lid - 1, 1, clonedeep(this.history)) // 配列置換
      } else {
        this.valueModel.push(clonedeep(this.history))
      }

      this.history = new History(this.value.length + 1)
      this.dialog = false
    }
  }
}
</script>

<style></style>
