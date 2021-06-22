// 验证是否登录的中间件，处理页面访问权限
export default function ({ store, redirect }) {
  // 如果没有登录，跳转到登录页
  if (!store.state.user) {
    return redirect('/login')
  }

}