import { attendanceRouter } from './attendance'
import { authorizeRouter } from './authorize'
import { dashboardRouter } from './dashboard'
import { departmentRouter } from './department'
import { employeeRouter } from './employee'
import { insuranceRouter } from './insurance'
import { reviewRouter } from './review'
import { roleRouter } from './role'
import { salaryRouter } from './salary'
export const layoutRoutes = {
    path:'/',
    name:'layout',
    component:()=>import('@/views/layout/index.vue'),
    children:[
        attendanceRouter,
        authorizeRouter,
        dashboardRouter,
        departmentRouter,
        employeeRouter,
        insuranceRouter,
        reviewRouter,
        roleRouter,
        salaryRouter
    ]
}