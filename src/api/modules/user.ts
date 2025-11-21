import request from '../req';

export default {
  // 测试接口
  userTest(data: object) {
    return request({
      url: '/user/user-test',
      data,
    });
  },
};
