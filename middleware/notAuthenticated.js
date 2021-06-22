// 验证是否已经登录的中间件，处理页面访问权限
export default function ({ store, redirect }) {
  // 如果没有登录，跳转到登录页
  if (store.state.user) {
    return redirect('/')
  }
}