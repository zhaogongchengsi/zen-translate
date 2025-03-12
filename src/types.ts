

export interface VolcanoTranslationResponseMetadata {
	RequestId: string,
	Action: string,
	Version: string,
	Service: string,
	Region: string,
	Error: {
		Code: string,
		Message: string,
	}
}

export interface VolcanoTranslationItem {
	Translation: string;
	DetectedSourceLanguage: string;
}

export interface VolcanoTranslationResponse {
	TranslationList: VolcanoTranslationItem[]
	ResponseMetadata: VolcanoTranslationResponseMetadata
}