import { getDepartmentList } from '@/api/department'
import { ref } from 'vue'
import { listToTree } from '@/utils/transListToTree'
const dataSource = ref([])
export const getDepartment = async () => {
  const res = await getDepartmentList()
  dataSource.value = listToTree(res.data, 0)
}
export { dataSource }