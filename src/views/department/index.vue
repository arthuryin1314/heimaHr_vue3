<script setup>
import { onMounted, ref } from 'vue'
//1.设置树形组件
import { getDepartmentList } from '@/api/department'
import { listToTree } from '@/utils/transListToTree'
const treeRef = ref(null)
const dataSource = ref([])
const getDepartment = async () => {
  const res = await getDepartmentList()
  dataSource.value = listToTree(res.data, 0)
}
onMounted(() => {
  getDepartment()
})
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
              <el-dropdown>
                <span class="action-trigger">
                  操作
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
  </div>
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