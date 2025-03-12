import { defineConfigs } from 'reactive-vscode'

export default defineConfigs('@zen/translate', {
  order: 'tencent, volcano, google, baidu',
  timeout: 5000,
  target: 'en',
  volcano: {
    access_key: '',
    secret_key: '',
  },
  google: {
    access_key: '',
    secret_key: '',
  },
  baidu: {
    access_key: '',
    secret_key: '',
  },
  tencent: {
    access_key: '',
    secret_key: '',
  },
})
