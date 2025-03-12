import { defineExtension, useActiveTextEditor, useCommand } from 'reactive-vscode'
import { window } from 'vscode'
import { logger } from './utils'
import { useTranslateRequest } from './request'

export = defineExtension(() => {
  logger.info('@zen/translate Activated')

  const request = useTranslateRequest()

  const editor = useActiveTextEditor()

  async function onTranslate() {
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

    try {
      const translated = await request.tencentTranslate(value)
      if (translated) {
        if (editor.value) {
          const position = editor.value.selection.active;
          editor.value.edit((editBuilder) => {
            editBuilder.insert(position, translated)
          })
        } else {
          window.showInformationMessage(`翻译结果: ${translated}`)
        }
      }
    } catch (error: any) {
      logger.error(error.message)
      window.showErrorMessage(error.message)
    }
  }

  useCommand('@zen/translate.translate', onTranslate)
})
