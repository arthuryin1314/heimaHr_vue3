import { getDepartmentList } from '@/api/department'
import { ref } from 'vue'
import { listToTree } from '@/utils/transListToTree'
const dataSource = ref([])
export const getDepartment = async () => {
  const res = await getDepartmentList()
  const DepartmentList = res.data
  dataSource.value = listToTree(DepartmentList, 0)
}
export { dataSource}