<script setup>
import { onMounted, ref } from 'vue'
//1.设置树形组件
import { getDepartment, dataSource } from './composable/getDepartment'
onMounted(() => {
  getDepartment()
})
//2.添加子部门
import { addDepartment,getManagerList,delDepartment } from '@/api/department'
import { ElMessage } from 'element-plus'
const formRef = ref(null)
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
const managerList = ref([])
const form = ref({
  code: '',
  introduce: '',
  managerId: '',
  name: ''
})
let pid = ref('')
const rules = ref({
  code: [{ required: true, message: '请输入部门编码', trigger: 'blur' },],
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  managerId: [{ required: true, message: '请输入负责人ID', trigger: 'blur' }],
  introduce: [{ required: true, message: '请输入部门介绍', trigger: 'blur' }]
})
async function handleCommand(command, data) {
  if (command === 'add') {
    console.log('添加子部门', data)
    dialogFormVisible.value = true
    pid.value = data.id  // 当前部门的 id 作为父级 id
    const res = await getManagerList()
    managerList.value = res.data
  } else if (command === 'edit') {
    console.log('编辑部门', data)
  } else if (command === 'delete') {
    delDepartment(data.id)
    await getDepartment()
    ElMessage.success('删除成功')
  }
}
function btnClose() {
  formRef.value?.resetFields()
  dialogFormVisible.value = false
}
function btnOk(){
  formRef.value.validate(async (valid) => {
    if (valid) {
      
        await addDepartment({
          ...form.value,
          pid: pid.value
        })
        btnClose()
        await getDepartment()
    }
  })
}
</script>
<template>
  <div class="department-page">
    <div class="tree-wrap">
      <div class="tree-head">
        <div>部门</div>
        <div class="head-manager">负责人</div>
        <div class="head-action">操作</div>
      </div>
      <el-tree ref="treeRef" class="tree-body" :data="dataSource" node-key="id" default-expand-all
        :expand-on-click-node="false" :props="{ label: 'name' }">
        <template #default="{ node, data }">
          <div class="tree-row">
            <div class="row-name">{{ node.label }}</div>
            <div class="row-manager">{{ data.managerName || '-' }}</div>
            <div class="row-action">
              <el-dropdown @command="handleCommand($event, data)">
                <span class="action-trigger">
                  操作
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                    <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="新增部门" width="500">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="部门介绍" :label-width="formLabelWidth" prop="introduce">
        <el-input v-model="form.introduce" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="负责人名称" :label-width="formLabelWidth" prop="managerId">
        <el-select v-model="form.managerId" placeholder="请选择负责人">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="btnOk">
          确定
        </el-button>
        <el-button @click="btnClose">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.department-page {
  --page-bg: #f5f6f8;
  --head-bg: #eef3ff;
  --text-strong: #1f2a44;
  --text-muted: #7a819a;
  --border-soft: #e6e9f5;
  min-height: calc(100vh - 60px);
  padding: 20px 24px 32px;
  background: var(--page-bg);
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.tree-wrap {
  background: #ffffff;
  border: 1px solid var(--border-soft);
  border-radius: 8px;
  overflow: hidden;
}

.tree-head {
  display: grid;
  grid-template-columns: 1fr 140px 90px;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  background: var(--head-bg);
  color: #3a5bd6;
  font-size: 13px;
  font-weight: 600;
}

.head-manager,
.head-action {
  text-align: right;
}

.tree-body :deep(.el-tree-node__content) {
  height: 44px;
  padding-right: 20px;
}

.tree-row {
  display: grid;
  grid-template-columns: 1fr 140px 90px;
  align-items: center;
  gap: 16px;
  width: 100%;
  color: var(--text-strong);
  font-size: 13px;
}

.row-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-manager,
.row-action {
  text-align: right;
  color: #6d748c;
}

.action-trigger {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #6d748c;
  cursor: pointer;
  font-size: 12px;
}

.action-trigger:hover {
  color: #3a5bd6;
}

.action-trigger:focus,
.action-trigger:focus-visible {
  outline: none;
}

@media (max-width: 768px) {

  .tree-head,
  .tree-row {
    grid-template-columns: 1fr 90px 70px;
  }
}
</style>