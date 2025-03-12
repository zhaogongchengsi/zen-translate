import { defineConfigs } from 'reactive-vscode'

export default defineConfigs('@zen/translate', {
  order: 'volcano, google, baidu',
  timeout: 5000,
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
  }
})
