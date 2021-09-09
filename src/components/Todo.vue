<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      @change="changeInputValue($event)"
      :value="inputVaule"
    />
    <a-button type="primary" @click="addEventItem()">添加事项</a-button>

    <a-list bordered :dataSource="getSelectType" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="checkEventItem(item.id)">{{
          item.info
        }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeEventItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ getRemainNumber }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="selectType === 'all' ? 'primary': 'default'" @click="doSelectType('all')">全部</a-button>
          <a-button :type="selectType === 'todo' ? 'primary': 'default'" @click="doSelectType('todo')">未完成</a-button>
          <a-button :type="selectType === 'done' ? 'primary': 'default'" @click="doSelectType('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="cleanDoneEventItem()">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapState(['list', 'inputVaule', 'selectType']),
    ...mapGetters(['getRemainNumber', 'getSelectType'])
  },
  created() {
    this.$store.dispatch('initList')
  },
  methods: {
    ...mapMutations([
      'setInputValue',
      'setAddEventItem',
      'setRemoveEventItem',
      'setCheckEventItem',
      'setSelectType',
      'setCleanDoneEventItem'
    ]),
    changeInputValue(e) {
      this.setInputValue(e.target.value)
    },
    addEventItem() {
      if (this.inputVaule && this.inputVaule === '') {
        this.$message.warning('Todo cant not be empty!')
      }
      this.setAddEventItem(this.inputVaule)
    },
    removeEventItem(id) {
      this.setRemoveEventItem(id)
    },
    checkEventItem(id) {
      this.setCheckEventItem(id)
    },
    doSelectType(val) {
      this.setSelectType(val)
    },
    cleanDoneEventItem() {
      this.setCleanDoneEventItem()
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
