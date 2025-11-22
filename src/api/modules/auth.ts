import request from '../req';

export default {
  // 测试接口
  test(data: object) {
    return request({
      url: '/auth/get-login-pow',
      data,
    });
  },
};
