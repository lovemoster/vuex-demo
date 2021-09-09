import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputVaule: '',
    nextId: 5,
    selectType: 'all'
  },
  mutations: {
    setList(state, val) {
      state.list = val
    },
    setInputValue(state, val) {
      state.inputVaule = val
    },
    setAddEventItem(state, val) {
      const list = state.list
      const item = {
        id: state.nextId,
        info: val,
        done: false
      }
      state.nextId++
      list.push(item)
    },
    setRemoveEventItem(state, id) {
      const list = state.list
      const index = list.findIndex(item => item.id === id)
      list.splice(index, 1)
    },
    setCheckEventItem(state, id) {
      const item = state.list.find(item => item.id === id)
      item.done = !item.done
    },
    setSelectType(state, val) {
      state.selectType = val
    },
    setCleanDoneEventItem(state) {
      state.list = state.list.filter(item => !item.done)
    }
  },
  actions: {
    initList(context) {
      Axios.get('/list.json').then(res => {
        context.commit('setList', res.data)
      })
    }
  },
  getters: {
    getRemainNumber(state) {
      return state.list.filter(item => item.done !== true).length
    },
    getSelectType(state) {
      if (state.selectType === 'all') {
        return state.list
      } else if (state.selectType === 'done') {
        return state.list.filter(item => item.done === true)
      } else if (state.selectType === 'todo') {
        return state.list.filter(item => item.done === false)
      }
    }
  },
  modules: {}
})
