<script setup>
//1.初始化页面
import { getRoleList } from '@/api/role'
import { ref, onMounted, computed } from 'vue'
const tableData = ref([])
const total = ref(0)
const params = ref({
  page: 1,
  pagesize: 5
})
async function fetchRoleList() {
  const { data } = await getRoleList({
    page: params.value.page,
    pagesize: params.value.pagesize
  })
  total.value = data.total
  tableData.value = data.rows.map(item => ({
    id: item.id,
    name: item.name,
    state: item.state === 1 ? '已启用' : '已禁用',
    description: item.description
  }))
}
function pageChange(page) {
  params.value.page = page
  fetchRoleList()
}
onMounted(() => {
  fetchRoleList()
})
//2.添加角色
import { addRole } from '@/api/role'
import { ElMessage } from 'element-plus'
const formLabelWidth = '80px'
const dialogFormVisible = ref(false)
const formRef = ref(null)
const form = ref({
  name: '',
  description: '',
  state: 1,
  id: ''
})
const isEdit = ref(false)
const title = computed(() => {
  return isEdit.value ? '编辑角色' : '添加角色'
})
const rules = ref({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
})
const isState = computed({
  get() {
    return form.value.state === 1
  },
  set(value) {
    form.value.state = value ? 1 : 0
  }
})
function btnClose() {
  formRef.value?.resetFields()
  dialogFormVisible.value = false
}
function btnOk() {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (isEdit.value) {
        // 编辑角色
        await updateRole({
          ...form.value
        })
      } else {
        // 添加角色
        await addRole({
          ...form.value
        })
      }
      fetchRoleList()
      ElMessage.success(isEdit.value ? '编辑成功' : '添加成功')
      btnClose()
    }
  })
}
function addRoleOpen(){
  dialogFormVisible.value = true
  isEdit.value = false
}
//3.编辑角色
import { getRoleDetail, updateRole } from '@/api/role'
async function handleEdit(row) {
  isEdit.value = true
  dialogFormVisible.value = true
  console.log(row);
  const { data } = await getRoleDetail(row.id)
  form.value = {
    ...data
  }
}
//4.删除角色
import { delRole } from '@/api/role'
async function handleDelete(row) {
  await delRole(row.id)
  await fetchRoleList()
  ElMessage.success('删除成功')
}
//5.分配权限
import { getAllRoleList,assignPermissions } from '@/api/role'
const id = ref('')
const PermissionList = ref([])
onMounted(async ()=>{
  const { data } = await getAllRoleList()
  PermissionList.value = data.slice(0,7)
})
const permissionDialogFormVisible = ref(false)
const permIds = ref([])
async function handleAssign(row) {
  // 这里可以打开一个新的对话框，展示权限列表，并允许用户选择分配给该角色的权限
  // console.log('分配权限', row)
  permIds.value = []
  id.value = row.id
  permissionDialogFormVisible.value = true
  const { data } = await getRoleDetail(row.id)
  permIds.value = (data.permIds || []).map(id => String(id))

}
function perClose(){
  permIds.value = []
  permissionDialogFormVisible.value = false
}
async function PerOk(){
  // 这里可以调用接口将选择的权限分配给角色
  console.log('分配权限确认', id.value, permIds.value)
  await assignPermissions({
    id: id.value,
    permIds: permIds.value
  })
  // perClose()
  ElMessage.success('权限分配成功')
  perClose()
}
</script>
<template>
  <div class="role-page">
    <div class="role-card">
      <div class="role-toolbar">
        <el-button type="primary" @click="addRoleOpen">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="name" label="角色" width="180" />
      <el-table-column prop="state" label="启用" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="handleAssign(scope.row)">分配权限</el-button>
          <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <div class="role-pagination">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="params.pagesize"
          @change="pageChange" />
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="启用状态" :label-width="formLabelWidth">
        <el-switch v-model="isState" class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
      </el-form-item>
      <el-form-item label="角色描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" autocomplete="off" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="btnClose">Cancel</el-button>
        <el-button type="primary" @click="btnOk">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
   <el-dialog v-model="permissionDialogFormVisible" title="分配权限" width="500">
    <el-checkbox-group v-model="permIds">
      <el-checkbox v-for="permission in PermissionList" :key="permission.id" :label="String(permission.id)">
        {{ permission.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="perClose">Cancel</el-button>
        <el-button type="primary" @click="PerOk">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.role-page {
  padding: 20px;
}

.role-card {
  padding: 16px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
}

.role-toolbar {
  margin-bottom: 16px;
}

.role-pagination {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
</style>