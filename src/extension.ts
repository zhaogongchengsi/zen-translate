import { defineExtension, useCommand } from 'reactive-vscode'
import { window } from 'vscode'
import config from './configs'
import { logger } from './utils'

export = defineExtension(() => {
  logger.info('@zen/translate Activated')

  useCommand('@zen/translate.translate', async () => {
    logger.info('Command @zen/translate.translate executed')

    const value = await window.showInputBox({
      prompt: '请输入要翻译的文本',
      placeHolder: '请输入要翻译的文本',
    })

    if (!value) {
      logger.warn('用户取消了输入')
      return
    }

    logger.info(`用户输入了: ${value}`)

    window.showInformationMessage(`你输入的中文字符串是: ${value} 🎉`);
    window.showInformationMessage(`volcano : ${config.volcano.value.access_key} ${config.volcano.value.secret_key}`);
  })
})
