import { window } from 'vscode'
import config from './configs'
import got, { Got } from 'got';
import { shallowRef, watchEffect } from 'reactive-vscode';
import { logger } from './utils';

const urls = {
	volcano: 'translate.volcengineapi.com',
	google: 'translate.google.cn',
	baidu: 'fanyi-api.baidu.com',
}

export function useTranslateRequest() {
	const request = shallowRef<Got | null>(null)
	watchEffect(() => {
		const order = config.order.value.split(',').map((item: string) => item.trim()).find(Boolean) as keyof typeof urls

		if (!order) {
			window.showErrorMessage('请配置翻译服务')
			return
		}

		const url = urls[order]

		logger.info(`使用翻译服务: ${order} url: ${url}`)

		const authConfig = {
			volcano: config.volcano.value,
			google: config.google.value,
			baidu: config.baidu.value,
		}

		const autoKey = authConfig[order]

		if (!autoKey.access_key || !autoKey.secret_key) {
			window.showErrorMessage(`请配置 ${order} 的 access_key 和 secret_key`)
			return
		}

		request.value = createTranslateRequest({
			url,
			access_key: autoKey.access_key,
			secret_key: autoKey.secret_key,
			timeout: config.timeout.value,
		})
	})

	return request
}


function createTranslateRequest({ url, access_key, secret_key, timeout = 5000 }: { url: string, access_key: string, secret_key: string, timeout: number }) {
	const client = got.extend({
		prefixUrl: `https://${url}`,
		headers: {
			'Content-Type': 'application/json',
			'AccessKey': access_key,
			'SecretKey': secret_key,
		},
		timeout: {
			response: timeout,
			request: timeout,
		},
	})
	return client
}