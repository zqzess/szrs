<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title" style="color: #242f42">数字孪生</div>
      <el-form :model="ruleForm" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.id" placeholder="username">
            <template #prepend>
              <el-button><el-icon><user /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.pass"
                    @keyup.enter="submitForm()">
            <template #prepend>
              <el-button><el-icon><lock /></el-icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { User, Lock } from '@element-plus/icons-vue'
export default {
  components: {
    User,
    Lock
  },
  data () {
    const checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      setTimeout(() => {
        const numReg = /^[0-9]*$/
        const numRe = new RegExp(numReg)
        if (!numRe.test(value)) {
          callback(new Error('账号必须为数字'))
        }
      }, 1000)
    }
    const checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
    }
    return {
      ruleForm: {
        id: '',
        pass: ''
      },
      rules: {
        id: [
          {
            validator: checkId,
            trigger: 'blur'
          }
        ],
        pass: [
          {
            validator: checkPwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    ...mapMutations(['setToken']),
    submitForm () {
      let v = this
      let data = {
        userid: v.ruleForm.id,
        password: v.ruleForm.pass
      }
      // let data = JSON.stringify(fd);

      // if (v.ruleForm.id.length <= 0 | v.ruleForm.pass.length <= 0) {
      if (v.ruleForm.id.length <= 0) {
        this.$message('请填写账号密码')
      } else {
        this.$axios.post('/user/login', data).then(res => {
          if (res.data.code === 200) {
            console.log(res.data)
            let type = res.data.type
            // console.log('身份类型:' + type)
            if (type == 0) {
              // 非管理员账号
              v.$message.error('你不是管理员，无法登录，请联系管理员')
              return false
            } else if (type == 1 || type == 2 || type == 3) {
              // 是管理员账号
              this.setToken({
                userid: v.ruleForm.id,
                type: type
              }) // 缓存登录信息
              this.$message.success(res.data.msg) // 登录成功通知
              const redirectpath = '/test'
              setTimeout(() => {
                this.$router.push({ path: redirectpath }) // 强制切换当前路由 path
                // loading.close();
              }, 3000) // 延迟三秒进入管理页
            }
          } else {
            this.$message.error(res.data.msg) // 错误通知
          }
        }).catch(res => {
          console.log(res)
          v.$notify.error('操作失败，请检查网络或稍后重试')
        })
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
