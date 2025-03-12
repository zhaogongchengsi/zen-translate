import config from './configs'
import type { TextTranslateResponse } from 'tencentcloud-sdk-nodejs-tmt/tencentcloud/services/tmt/v20180321/tmt_models';
import { tmt } from 'tencentcloud-sdk-nodejs-tmt';

// const urls = {
// 	volcano: 'https://translate.volcengineapi.com',
// 	google: 'https://translate.google.cn',
// 	baidu: 'https://fanyi-api.baidu.com',
// }

export function useTranslateRequest() {
	const client = new tmt.v20180321.Client({
		credential: {
			secretId: config.tencent.value.access_key,
			secretKey: config.tencent.value.secret_key,
		},
		region: "ap-shanghai",
	})

	async function tencentTranslate(value: string) {
		const translate = (value: string) => {
			return new Promise<string | undefined>((resolve, reject) => {
				if (!value.trim()) {
					reject(new Error('请输入要翻译的文本'))
				}

				client.TextTranslate({
					SourceText: value,
					Source: 'auto',
					Target: config.target.value,
					ProjectId: 0
				}, (error: string, rep: TextTranslateResponse) => {
					if (error) {
						reject(error)
					}
					resolve(rep.TargetText)
				})

			})
		}

		return await translate(value)
	}


	return {
		tencentTranslate
	}
}
