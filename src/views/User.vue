<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="user">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset(form)">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate" v-has:add="'user-create'">新增</el-button>
        <el-button type="danger" @click="handlePatchDel" v-has="'user-patch-delete'">批量删除</el-button>

      </div>
      <el-table :data="userList" @selection-change="handleSelectionChange" empty-text="没有更多数据了">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="item in columns" :key="item.userId" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="success" size="small" @click="handleEdit(scope.row)" v-has="'user-edit'">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteBtn(scope.row)" v-has="'user-delete'">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination @current-change="handleCurrentChange" :page-size="pager.pageSize" class="pagination" background
        layout="prev, pager, next" :total="pager.total" />

    </div>
    <el-dialog :title="title" v-model="showCreate" :show-close="false" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dialogForm" :model="userForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" :disabled="action === 'edit'" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" :disabled="action === 'edit'" placeholder="请输入用户邮箱">
            <template #append>@qq.com</template>

          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入用户手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入用户岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="userForm.roleList" placeholder="请选择系统角色" multiple style="width:100%">
            <el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader v-model="userForm.deptId" placeholder="请选择部门" :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }" clearable style="width:100%">
          </el-cascader>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose(dialogForm)">取消</el-button>
          <el-button type="primary" @click="handleSubmit(dialogForm)">确认</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
<script>
import { nextTick, onMounted, reactive, ref, toRaw } from 'vue';
import { getUserListAPI, deleteUserAPI, getRoleListAPI, getDeptListAPI, userCreateSubmitAPI } from '../api/index'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

export default {
  name: "user",
  setup() {
    let title = ref('')
    const user = reactive({
      state: 1
    });
    const userList = ref([])
    const pager = reactive({
      pageNum: 1,
      pageSize: 10
    })
    const checkUserId = ref([])
    const showCreate = ref(false)
    const userForm = reactive({
      state: 3

    })
    const rules = reactive({
      userName: [
        {
          required: true,
          message: "请输入用户名"
        }
      ],
      userEmail: [
        {
          required: true,
          message: "请输入用户邮箱"
        }
      ],
      mobile: [
        {
          required: true,
          message: "请输入用户手机号"
        },
        {
          pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
          message: "请输入正确的手机号"
        }
      ],
      deptId: [{
        required: true,
        message: "请选择部门"

      }]

    })

    const roleList = ref([])
    const deptList = ref([])
    const action = ref('add')





    const getUserList = async () => {
      const params = { ...user, ...pager }
      const { list, page } = await getUserListAPI(params)
      userList.value = list
      // console.log(list);

      pager.total = page.total
    }
    const columns = reactive([
      {
        label: '用户ID',
        prop: 'userId'
      }, {
        label: '用户名',
        prop: 'userName'
      }, {
        label: '用户邮箱',
        prop: 'userEmail'
      },
      {
        label: '用户角色',
        prop: 'role',
        formatter(value) {
          switch (value.role) {
            case 0: {
              return '管理员'
            }
            case 1: {
              return '普通员工'
            }


          }
        }
      }, {
        label: '用户状态',
        prop: 'state',
        formatter(value) {
          switch (value.state) {
            case 1: {
              return '在职'
            }
            case 2: {
              return '离职'
            }
            case 3: {
              return '试用期'
            }


          }
        }

      }, {
        label: '注册时间',
        prop: 'createTime',
        width: 190,
        formatter(value) {

          return dayjs(value.createTime).format('YYYY-MM-DD HH:mm:ss')

        }

      }, {
        label: '最后登录时间',
        prop: 'lastLoginTime',
        width: 190,
        formatter(value) {
          console.log(value.lastLoginTime);
          return dayjs(value.lastLoginTime).format('YYYY-MM-DD HH:mm:ss')

        }
      },

    ])
    //查询用户
    const handleQuery = () => {
      getUserList()

    }
    //重置用户
    const form = ref(null)  //vue3的写法，把ref作为参数传下来

    const handleReset = (form) => {
      // console.log(form);
      form.resetFields()

    }
    //删除
    const deleteBtn = async (row) => {
      console.log(row);
      const res = await deleteUserAPI({
        userIds: [row.userId]
      })
      if (res.modifiedCount > 0) {
        ElMessage.success('删除成功')
        getUserList()
      } else {
        ElMessage.error('删除失败')

      }

    }
    //批量删除 
    const handlePatchDel = async () => {
      if (checkUserId.value.length === 0) {
        ElMessage.error('请选择需要删除的用户')
        return
      }
      const res = await deleteUserAPI({
        userIds: checkUserId.value
      })
      if (res.modifiedCount > 0) {
        ElMessage.success('删除成功')
        getUserList()
      } else {
        ElMessage.error('删除失败')

      }


    }
    const handleSelectionChange = (list) => {
      // console.log(list);
      const arr = []
      list.map(item => {
        arr.push(item.userId)
      })
      checkUserId.value = arr
      // console.log(checkUserId.value);



    }

    const handleCurrentChange = (val) => {
      pager.pageNum = val
      getUserList()

    }
    //新增
    const handleCreate = () => {
      action.value = 'add'
      title.value = "用户新增"
      showCreate.value = true

    }

    //获取部门列表
    const getDeptList = async () => {
      const res = await getDeptListAPI()
      deptList.value = res
    }

    //获取角色列表
    const getRoleList = async () => {
      const res = await getRoleListAPI()
      roleList.value = res
    }
    //确认
    const handleSubmit = (dialogForm) => {
      dialogForm.validate(async (valid) => {
        if (valid) {
          const params = toRaw(userForm)
          params.userEmail += '@qq.com'
          params.action = action.value
          const res = await userCreateSubmitAPI(params)
          console.log(res);
          showCreate.value = false
          if (action.value === 'add') {
            ElMessage.success('用户创建成功')
          }
          else {
            ElMessage.success('用户更新成功')

          }
          dialogForm.resetFields()
          getUserList()


        }
      })

    }

    //取消
    const dialogForm = ref(null)
    const handleClose = (dialogForm) => {

      showCreate.value = false
      dialogForm.resetFields()   //ref不用绑定


    }
    //编辑
    const handleEdit = (row) => {

      title.value = "用户编辑"
      showCreate.value = true
      nextTick(() => {
        action.value = 'edit'
        Object.assign(userForm, row)

      })

    }


    onMounted(() => {
      getUserList()
      getDeptList()
      getRoleList()

    })



    return { action, handleEdit, title, dialogForm, handleClose, handleSubmit, deptList, roleList, getDeptList, getRoleList, rules, userForm, handleCreate, showCreate, handlePatchDel, checkUserId, handleSelectionChange, user, userList, columns, pager, handleQuery, handleReset, form, handleCurrentChange, deleteBtn }
  }


}
</script>

<style lang="scss">
.el-button--primary {

  background: #3c9566 !important;
  border-color: #fff !important;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #3c9566 !important;
  color: #fff !important;
}
</style>