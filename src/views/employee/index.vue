<script setup>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getDepartmentList, getEmployeeList } from '@/api/employee'
import { listToTree } from '@/utils/transListToTree'

const inputValue = ref('')
const departmentList = ref([])
const tableData = ref([])
const multipleTableRef = ref(null)
const selectedRows = ref([])
const total = ref(0)

const params = ref({
  page: 1,
  pageSize: 10,
  keyword: '',
  departmentId: ''
})

async function getDepartment() {
  const { data } = await getDepartmentList()
  departmentList.value = listToTree(data, 0)
}

async function getEmployee() {
  const { data } = await getEmployeeList()
  tableData.value = data?.rows || data?.list || []
  total.value = data?.total || 0
}

function selectable() {
  return true
}

function handleSelectionChange(rows) {
  selectedRows.value = rows
}

function handleCurrentChange(page) {
  params.value.page = page
  getEmployee()
}

function handleNodeClick(node) {
  params.value.departmentId = node?.id || ''
  params.value.page = 1
  getEmployee()
}

onMounted(() => {
  getDepartment()
  getEmployee()
})
</script>

<template>
  <div class="employee-page">
    <aside class="left-panel">
      <el-input
        v-model="inputValue"
        clearable
        :prefix-icon="Search"
        placeholder="输入员工姓名全员搜索"
      />

      <el-tree
        class="department-tree"
        :data="departmentList"
        :props="{ label: 'name' }"
        node-key="id"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      />
    </aside>

    <section class="right-panel">
      <div class="toolbar-row">
        <el-button type="primary" plain>群发通知</el-button>
        <div class="toolbar-actions">
          <el-button type="primary">添加员工</el-button>
          <el-button>excel导入</el-button>
          <el-button>excel导出</el-button>
        </div>
      </div>

      <el-table
        ref="multipleTableRef"
        :data="tableData"
        row-key="id"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column label="头像" width="120">
          <template #default="{ row }">
            <el-image
              v-if="row.staffPhoto"
              style="width: 24px; height: 24px; border-radius: 50%"
              :src="row.staffPhoto"
              fit="cover"
            />
            <span v-else>{{ row.username.slice(0, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" width="120">
          <template #default="{ row }">{{ row.username }}</template>
        </el-table-column>
        <el-table-column property="mobile" label="手机号" width="140" sortable>
          <template #default="{ row }">{{ row.mobile }}</template>
        </el-table-column>
        <el-table-column property="jobNumber" label="工号" width="140" sortable>
          <template #default="{ row }">{{ row.workNumber }}</template>
        </el-table-column>
        <el-table-column property="formOfEmployment" label="聘用形式" width="120">
          <template #default="{ row }">{{ row.formOfEmployment }}</template>
        </el-table-column>
        <el-table-column property="departmentName" label="部门" width="120">
          <template #default="{ row }">{{ row.departmentName }}</template>
        </el-table-column>
        <el-table-column property="entryTime" label="入职时间" width="120" sortable>
          <template #default="{ row }">{{ row.timeOfEntry }}</template>
        </el-table-column>
        <el-table-column label="操作" min-width="160">
          <template #default>
            <el-button type="primary" link>查看</el-button>
            <el-button type="primary" link>角色</el-button>
            <el-button type="primary" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-row">
        <span>共{{ total }}条</span>
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="params.page"
          :total="total"
          :page-size="params.pageSize"
          @current-change="handleCurrentChange"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.employee-page {
  display: flex;
  gap: 16px;
}

.left-panel {
  width: 220px;
  flex-shrink: 0;
  padding: 16px;
  border: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color);
}

.department-tree {
  margin-top: 12px;
}

.right-panel {
  flex: 1;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color);
}

.toolbar-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.pagination-row {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>