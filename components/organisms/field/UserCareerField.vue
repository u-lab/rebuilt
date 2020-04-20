<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items()"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>経歴</v-toolbar-title>

          <v-spacer />

          <v-btn v-text="$t('add_new_career')" @click="add" color="primary" />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="edit(item.lid)"
          v-text="$t('edit')"
          color="warning"
          class="mr-2"
        />
        <v-icon @click="deleted(item.lid)" v-text="`mdi-delete`" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">追加</span>
        </v-card-title>

        <v-card-text>
          <v-text-field v-model="history.name" :label="$t('name')" outlined />

          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              v-on="on"
              label="Picker in dialog"
              prepend-icon="event"
              readonly
            />
          </template>

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
              <v-spacer></v-spacer>
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
          <v-spacer></v-spacer>
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

    <v-dialog v-model="deleteDialog" width="300px">
      <v-card>
        <v-alert
          v-text="$t('are_you_sure_you_want_to_delete')"
          width="100%"
          type="error"
        />

        <v-card-actions>
          <v-btn
            @click="deleteDialog = false"
            v-text="$t('cancel')"
            color="primary"
            text
          />
          <v-spacer></v-spacer>
          <v-btn @click="onDelete" v-text="$t('ok')" color="red" text />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { convertToDate, formatDate } from '@/utils/date'

export default {
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
      history: {
        lid: this.value.length,
        name: '',
        date: new Date().toISOString().substr(0, 10),
        type: ''
      }
    }
  },

  computed: {
    headers() {
      return [
        { text: this.$t('name'), value: 'name' },
        { text: '日付', value: 'date' },
        { text: this.$t('category'), value: 'typeText' },
        { text: '', value: 'actions' }
      ]
    },

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
    }
  },

  methods: {
    add() {
      this.dialog = true
      this.history = {
        lid: this.value.length,
        id: '',
        name: '',
        date: new Date().toISOString().substr(0, 10),
        type: ''
      }
    },

    edit(lid) {
      this.dialog = true
      this.history = clonedeep(this.items().find((obj) => obj.lid === lid))
    },

    deleted(lid) {
      this.deleteLid = lid
      this.deleteDialog = true
    },

    onDelete() {
      const item = this.items().find((obj) => obj.lid === this.deleteLid)
      if (item.id) {
        this.didModel.push(item.id)
      }
      if (this.valueModel.length > 1) {
        this.valueModel = clonedeep(
          this.valueModel.splice(this.deleteLid - 1, 1)
        )
      } else {
        this.valueModel = []
      }
      this.deleteDialog = false
    },

    updateDid() {
      return this.$emit('did')
    },

    items() {
      return this.value.map((obj, idx) => ({
        lid: idx,
        name: obj.name,
        date: formatDate(convertToDate(obj.date), 'yyyy-MM'),
        type: obj.type,
        typeText: this.$t(obj.type !== null ? this.$sanitize(obj.type) : null),
        id: obj.id
      }))
    },

    historyAdd() {
      if (this.history.lid < this.value.length) {
        this.valueModel[this.history.lid] = clonedeep(this.history)
      } else {
        this.valueModel.push(clonedeep(this.history))
      }

      this.history = {
        lid: this.value.length,
        id: '',
        name: '',
        date: new Date().toISOString().substr(0, 10),
        type: ''
      }
      this.dialog = false
    }
  }
}
</script>

<style></style>
