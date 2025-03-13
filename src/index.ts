import { defineExtension, useActiveTextEditor, useCommand } from 'reactive-vscode'
import { StatusBarAlignment, StatusBarItem, window } from 'vscode'
import { logger } from './utils'
import { useTranslateRequest } from './request'

const { activate, deactivate } = defineExtension(() => {
  logger.info('@zen/translate Activated')

  const translatedCache = new Map<string, string>()

  const request = useTranslateRequest()

  const editor = useActiveTextEditor()

  const statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 100)
  statusBarItem.text = '$(globe)'
  statusBarItem.tooltip = 'Zen Translate 插件已激活'
  statusBarItem.command = 'translate.insert'
  statusBarItem.show()

  async function onTranslate() {
    logger.info('translate.insert command triggered')

    const value = await window.showInputBox({
      prompt: '请输入要翻译的文本',
      placeHolder: '请输入要翻译的文本',
    })

    if (!value || !value.trim()) {
      logger.warn('用户取消了输入')
      return
    }

    logger.info(`用户输入了: ${value}`)

    try {
      let translated = null

      if (translatedCache.has(value)) {
        translated = translatedCache.get(value)
      } else {
        translated = await request.tencentTranslate(value)
        if (translated)
          translatedCache.set(value, translated)
      }

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

  useCommand('translate.insert', onTranslate)
})

export { activate, deactivate }