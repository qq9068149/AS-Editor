/**请求路径
 * 
 */
import { post } from '@/api/request'

export default {
	// 登录
  loginAdminTest: params => {
    return post('/loginAdminTest', params)
  }
}