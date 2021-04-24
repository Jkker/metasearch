import { Form, Input, InputNumber, message, Modal, Select, Switch } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
const { Option } = Select;
const urlRegex = new RegExp(
	/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)%s[-a-zA-Z0-9@:%._\+~#=]*/
);
const countries = [
	{ value: 'AF', label: 'Afghanistan [AF]' },
	{ value: 'AX', label: 'Åland Islands [AX]' },
	{ value: 'AL', label: 'Albania [AL]' },
	{ value: 'DZ', label: 'Algeria [DZ]' },
	{ value: 'AS', label: 'American Samoa [AS]' },
	{ value: 'AD', label: 'Andorra [AD]' },
	{ value: 'AO', label: 'Angola [AO]' },
	{ value: 'AI', label: 'Anguilla [AI]' },
	{ value: 'AQ', label: 'Antarctica [AQ]' },
	{ value: 'AG', label: 'Antigua and Barbuda [AG]' },
	{ value: 'AR', label: 'Argentina [AR]' },
	{ value: 'AM', label: 'Armenia [AM]' },
	{ value: 'AW', label: 'Aruba [AW]' },
	{ value: 'AU', label: 'Australia [AU]' },
	{ value: 'AT', label: 'Austria [AT]' },
	{ value: 'AZ', label: 'Azerbaijan [AZ]' },
	{ value: 'BS', label: 'Bahamas [BS]' },
	{ value: 'BH', label: 'Bahrain [BH]' },
	{ value: 'BD', label: 'Bangladesh [BD]' },
	{ value: 'BB', label: 'Barbados [BB]' },
	{ value: 'BY', label: 'Belarus [BY]' },
	{ value: 'BE', label: 'Belgium [BE]' },
	{ value: 'BZ', label: 'Belize [BZ]' },
	{ value: 'BJ', label: 'Benin [BJ]' },
	{ value: 'BM', label: 'Bermuda [BM]' },
	{ value: 'BT', label: 'Bhutan [BT]' },
	{ value: 'BO', label: 'Bolivia, Plurinational State of [BO]' },
	{ value: 'BQ', label: 'Bonaire, Sint Eustatius and Saba [BQ]' },
	{ value: 'BA', label: 'Bosnia and Herzegovina [BA]' },
	{ value: 'BW', label: 'Botswana [BW]' },
	{ value: 'BV', label: 'Bouvet Island [BV]' },
	{ value: 'BR', label: 'Brazil [BR]' },
	{ value: 'IO', label: 'British Indian Ocean Territory [IO]' },
	{ value: 'BN', label: 'Brunei Darussalam [BN]' },
	{ value: 'BG', label: 'Bulgaria [BG]' },
	{ value: 'BF', label: 'Burkina Faso [BF]' },
	{ value: 'BI', label: 'Burundi [BI]' },
	{ value: 'KH', label: 'Cambodia [KH]' },
	{ value: 'CM', label: 'Cameroon [CM]' },
	{ value: 'CA', label: 'Canada [CA]' },
	{ value: 'CV', label: 'Cape Verde [CV]' },
	{ value: 'KY', label: 'Cayman Islands [KY]' },
	{ value: 'CF', label: 'Central African Republic [CF]' },
	{ value: 'TD', label: 'Chad [TD]' },
	{ value: 'CL', label: 'Chile [CL]' },
	{ value: 'CN', label: 'China [CN]' },
	{ value: 'CX', label: 'Christmas Island [CX]' },
	{ value: 'CC', label: 'Cocos (Keeling) Islands [CC]' },
	{ value: 'CO', label: 'Colombia [CO]' },
	{ value: 'KM', label: 'Comoros [KM]' },
	{ value: 'CG', label: 'Congo [CG]' },
	{ value: 'CD', label: 'Congo, the Democratic Republic of the [CD]' },
	{ value: 'CK', label: 'Cook Islands [CK]' },
	{ value: 'CR', label: 'Costa Rica [CR]' },
	{ value: 'CI', label: "Côte d'Ivoire [CI]" },
	{ value: 'HR', label: 'Croatia [HR]' },
	{ value: 'CU', label: 'Cuba [CU]' },
	{ value: 'CW', label: 'Curaçao [CW]' },
	{ value: 'CY', label: 'Cyprus [CY]' },
	{ value: 'CZ', label: 'Czech Republic [CZ]' },
	{ value: 'DK', label: 'Denmark [DK]' },
	{ value: 'DJ', label: 'Djibouti [DJ]' },
	{ value: 'DM', label: 'Dominica [DM]' },
	{ value: 'DO', label: 'Dominican Republic [DO]' },
	{ value: 'EC', label: 'Ecuador [EC]' },
	{ value: 'EG', label: 'Egypt [EG]' },
	{ value: 'SV', label: 'El Salvador [SV]' },
	{ value: 'GQ', label: 'Equatorial Guinea [GQ]' },
	{ value: 'ER', label: 'Eritrea [ER]' },
	{ value: 'EE', label: 'Estonia [EE]' },
	{ value: 'ET', label: 'Ethiopia [ET]' },
	{ value: 'FK', label: 'Falkland Islands (Malvinas) [FK]' },
	{ value: 'FO', label: 'Faroe Islands [FO]' },
	{ value: 'FJ', label: 'Fiji [FJ]' },
	{ value: 'FI', label: 'Finland [FI]' },
	{ value: 'FR', label: 'France [FR]' },
	{ value: 'GF', label: 'French Guiana [GF]' },
	{ value: 'PF', label: 'French Polynesia [PF]' },
	{ value: 'TF', label: 'French Southern Territories [TF]' },
	{ value: 'GA', label: 'Gabon [GA]' },
	{ value: 'GM', label: 'Gambia [GM]' },
	{ value: 'GE', label: 'Georgia [GE]' },
	{ value: 'DE', label: 'Germany [DE]' },
	{ value: 'GH', label: 'Ghana [GH]' },
	{ value: 'GI', label: 'Gibraltar [GI]' },
	{ value: 'GR', label: 'Greece [GR]' },
	{ value: 'GL', label: 'Greenland [GL]' },
	{ value: 'GD', label: 'Grenada [GD]' },
	{ value: 'GP', label: 'Guadeloupe [GP]' },
	{ value: 'GU', label: 'Guam [GU]' },
	{ value: 'GT', label: 'Guatemala [GT]' },
	{ value: 'GG', label: 'Guernsey [GG]' },
	{ value: 'GN', label: 'Guinea [GN]' },
	{ value: 'GW', label: 'Guinea-Bissau [GW]' },
	{ value: 'GY', label: 'Guyana [GY]' },
	{ value: 'HT', label: 'Haiti [HT]' },
	{ value: 'HM', label: 'Heard Island and McDonald Islands [HM]' },
	{ value: 'VA', label: 'Holy See (Vatican City State) [VA]' },
	{ value: 'HN', label: 'Honduras [HN]' },
	{ value: 'HK', label: 'Hong Kong [HK]' },
	{ value: 'HU', label: 'Hungary [HU]' },
	{ value: 'IS', label: 'Iceland [IS]' },
	{ value: 'IN', label: 'India [IN]' },
	{ value: 'ID', label: 'Indonesia [ID]' },
	{ value: 'IR', label: 'Iran, Islamic Republic of [IR]' },
	{ value: 'IQ', label: 'Iraq [IQ]' },
	{ value: 'IE', label: 'Ireland [IE]' },
	{ value: 'IM', label: 'Isle of Man [IM]' },
	{ value: 'IL', label: 'Israel [IL]' },
	{ value: 'IT', label: 'Italy [IT]' },
	{ value: 'JM', label: 'Jamaica [JM]' },
	{ value: 'JP', label: 'Japan [JP]' },
	{ value: 'JE', label: 'Jersey [JE]' },
	{ value: 'JO', label: 'Jordan [JO]' },
	{ value: 'KZ', label: 'Kazakhstan [KZ]' },
	{ value: 'KE', label: 'Kenya [KE]' },
	{ value: 'KI', label: 'Kiribati [KI]' },
	{ value: 'KP', label: "Korea, Democratic People's Republic of [KP]" },
	{ value: 'KR', label: 'Korea, Republic of [KR]' },
	{ value: 'KW', label: 'Kuwait [KW]' },
	{ value: 'KG', label: 'Kyrgyzstan [KG]' },
	{ value: 'LA', label: "Lao People's Democratic Republic [LA]" },
	{ value: 'LV', label: 'Latvia [LV]' },
	{ value: 'LB', label: 'Lebanon [LB]' },
	{ value: 'LS', label: 'Lesotho [LS]' },
	{ value: 'LR', label: 'Liberia [LR]' },
	{ value: 'LY', label: 'Libya [LY]' },
	{ value: 'LI', label: 'Liechtenstein [LI]' },
	{ value: 'LT', label: 'Lithuania [LT]' },
	{ value: 'LU', label: 'Luxembourg [LU]' },
	{ value: 'MO', label: 'Macao [MO]' },
	{ value: 'MK', label: 'Macedonia, the Former Yugoslav Republic of [MK]' },
	{ value: 'MG', label: 'Madagascar [MG]' },
	{ value: 'MW', label: 'Malawi [MW]' },
	{ value: 'MY', label: 'Malaysia [MY]' },
	{ value: 'MV', label: 'Maldives [MV]' },
	{ value: 'ML', label: 'Mali [ML]' },
	{ value: 'MT', label: 'Malta [MT]' },
	{ value: 'MH', label: 'Marshall Islands [MH]' },
	{ value: 'MQ', label: 'Martinique [MQ]' },
	{ value: 'MR', label: 'Mauritania [MR]' },
	{ value: 'MU', label: 'Mauritius [MU]' },
	{ value: 'YT', label: 'Mayotte [YT]' },
	{ value: 'MX', label: 'Mexico [MX]' },
	{ value: 'FM', label: 'Micronesia, Federated States of [FM]' },
	{ value: 'MD', label: 'Moldova, Republic of [MD]' },
	{ value: 'MC', label: 'Monaco [MC]' },
	{ value: 'MN', label: 'Mongolia [MN]' },
	{ value: 'ME', label: 'Montenegro [ME]' },
	{ value: 'MS', label: 'Montserrat [MS]' },
	{ value: 'MA', label: 'Morocco [MA]' },
	{ value: 'MZ', label: 'Mozambique [MZ]' },
	{ value: 'MM', label: 'Myanmar [MM]' },
	{ value: 'NA', label: 'Namibia [NA]' },
	{ value: 'NR', label: 'Nauru [NR]' },
	{ value: 'NP', label: 'Nepal [NP]' },
	{ value: 'NL', label: 'Netherlands [NL]' },
	{ value: 'NC', label: 'New Caledonia [NC]' },
	{ value: 'NZ', label: 'New Zealand [NZ]' },
	{ value: 'NI', label: 'Nicaragua [NI]' },
	{ value: 'NE', label: 'Niger [NE]' },
	{ value: 'NG', label: 'Nigeria [NG]' },
	{ value: 'NU', label: 'Niue [NU]' },
	{ value: 'NF', label: 'Norfolk Island [NF]' },
	{ value: 'MP', label: 'Northern Mariana Islands [MP]' },
	{ value: 'NO', label: 'Norway [NO]' },
	{ value: 'OM', label: 'Oman [OM]' },
	{ value: 'PK', label: 'Pakistan [PK]' },
	{ value: 'PW', label: 'Palau [PW]' },
	{ value: 'PS', label: 'Palestine, State of [PS]' },
	{ value: 'PA', label: 'Panama [PA]' },
	{ value: 'PG', label: 'Papua New Guinea [PG]' },
	{ value: 'PY', label: 'Paraguay [PY]' },
	{ value: 'PE', label: 'Peru [PE]' },
	{ value: 'PH', label: 'Philippines [PH]' },
	{ value: 'PN', label: 'Pitcairn [PN]' },
	{ value: 'PL', label: 'Poland [PL]' },
	{ value: 'PT', label: 'Portugal [PT]' },
	{ value: 'PR', label: 'Puerto Rico [PR]' },
	{ value: 'QA', label: 'Qatar [QA]' },
	{ value: 'RE', label: 'Réunion [RE]' },
	{ value: 'RO', label: 'Romania [RO]' },
	{ value: 'RU', label: 'Russian Federation [RU]' },
	{ value: 'RW', label: 'Rwanda [RW]' },
	{ value: 'BL', label: 'Saint Barthélemy [BL]' },
	{ value: 'SH', label: 'Saint Helena, Ascension and Tristan da Cunha [SH]' },
	{ value: 'KN', label: 'Saint Kitts and Nevis [KN]' },
	{ value: 'LC', label: 'Saint Lucia [LC]' },
	{ value: 'MF', label: 'Saint Martin (French part) [MF]' },
	{ value: 'PM', label: 'Saint Pierre and Miquelon [PM]' },
	{ value: 'VC', label: 'Saint Vincent and the Grenadines [VC]' },
	{ value: 'WS', label: 'Samoa [WS]' },
	{ value: 'SM', label: 'San Marino [SM]' },
	{ value: 'ST', label: 'Sao Tome and Principe [ST]' },
	{ value: 'SA', label: 'Saudi Arabia [SA]' },
	{ value: 'SN', label: 'Senegal [SN]' },
	{ value: 'RS', label: 'Serbia [RS]' },
	{ value: 'SC', label: 'Seychelles [SC]' },
	{ value: 'SL', label: 'Sierra Leone [SL]' },
	{ value: 'SG', label: 'Singapore [SG]' },
	{ value: 'SX', label: 'Sint Maarten (Dutch part) [SX]' },
	{ value: 'SK', label: 'Slovakia [SK]' },
	{ value: 'SI', label: 'Slovenia [SI]' },
	{ value: 'SB', label: 'Solomon Islands [SB]' },
	{ value: 'SO', label: 'Somalia [SO]' },
	{ value: 'ZA', label: 'South Africa [ZA]' },
	{ value: 'GS', label: 'South Georgia and the South Sandwich Islands [GS]' },
	{ value: 'SS', label: 'South Sudan [SS]' },
	{ value: 'ES', label: 'Spain [ES]' },
	{ value: 'LK', label: 'Sri Lanka [LK]' },
	{ value: 'SD', label: 'Sudan [SD]' },
	{ value: 'SR', label: 'Suriname [SR]' },
	{ value: 'SJ', label: 'Svalbard and Jan Mayen [SJ]' },
	{ value: 'SZ', label: 'Swaziland [SZ]' },
	{ value: 'SE', label: 'Sweden [SE]' },
	{ value: 'CH', label: 'Switzerland [CH]' },
	{ value: 'SY', label: 'Syrian Arab Republic [SY]' },
	{ value: 'TW', label: 'Taiwan, Province of China [TW]' },
	{ value: 'TJ', label: 'Tajikistan [TJ]' },
	{ value: 'TZ', label: 'Tanzania, United Republic of [TZ]' },
	{ value: 'TH', label: 'Thailand [TH]' },
	{ value: 'TL', label: 'Timor-Leste [TL]' },
	{ value: 'TG', label: 'Togo [TG]' },
	{ value: 'TK', label: 'Tokelau [TK]' },
	{ value: 'TO', label: 'Tonga [TO]' },
	{ value: 'TT', label: 'Trinidad and Tobago [TT]' },
	{ value: 'TN', label: 'Tunisia [TN]' },
	{ value: 'TR', label: 'Turkey [TR]' },
	{ value: 'TM', label: 'Turkmenistan [TM]' },
	{ value: 'TC', label: 'Turks and Caicos Islands [TC]' },
	{ value: 'TV', label: 'Tuvalu [TV]' },
	{ value: 'UG', label: 'Uganda [UG]' },
	{ value: 'UA', label: 'Ukraine [UA]' },
	{ value: 'AE', label: 'United Arab Emirates [AE]' },
	{ value: 'GB', label: 'United Kingdom [GB]' },
	{ value: 'US', label: 'United States [US]' },
	{ value: 'UM', label: 'United States Minor Outlying Islands [UM]' },
	{ value: 'UY', label: 'Uruguay [UY]' },
	{ value: 'UZ', label: 'Uzbekistan [UZ]' },
	{ value: 'VU', label: 'Vanuatu [VU]' },
	{ value: 'VE', label: 'Venezuela, Bolivarian Republic of [VE]' },
	{ value: 'VN', label: 'Viet Nam [VN]' },
	{ value: 'VG', label: 'Virgin Islands, British [VG]' },
	{ value: 'VI', label: 'Virgin Islands, U.S. [VI]' },
	{ value: 'WF', label: 'Wallis and Futuna [WF]' },
	{ value: 'EH', label: 'Western Sahara [EH]' },
	{ value: 'YE', label: 'Yemen [YE]' },
	{ value: 'ZM', label: 'Zambia [ZM]' },
	{ value: 'ZW', label: 'Zimbabwe [ZW]' },
];

const locales = [
	{ value: 'af-ZA', label: 'Afrikaans [af-ZA]' },
	{ value: 'ar', label: 'العربية [ar]' },
	{ value: 'bg-BG', label: 'Български [bg-BG]' },
	{ value: 'ca-AD', label: 'Català [ca-AD]' },
	{ value: 'cs-CZ', label: 'Čeština [cs-CZ]' },
	{ value: 'cy-GB', label: 'Cymraeg [cy-GB]' },
	{ value: 'da-DK', label: 'Dansk [da-DK]' },
	{ value: 'de-AT', label: 'Deutsch (Österreich) [de-AT]' },
	{ value: 'de-CH', label: 'Deutsch (Schweiz) [de-CH]' },
	{ value: 'de-DE', label: 'Deutsch (Deutschland) [de-DE]' },
	{ value: 'el-GR', label: 'Ελληνικά [el-GR]' },
	{ value: 'en-GB', label: 'English (UK) [en-GB]' },
	{ value: 'en-US', label: 'English (US) [en-US]' },
	{ value: 'es-CL', label: 'Español (Chile) [es-CL]' },
	{ value: 'es-ES', label: 'Español (España) [es-ES]' },
	{ value: 'es-MX', label: 'Español (México) [es-MX]' },
	{ value: 'et-EE', label: 'Eesti keel [et-EE]' },
	{ value: 'eu', label: 'Euskara [eu]' },
	{ value: 'fa-IR', label: 'فارسی [fa-IR]' },
	{ value: 'fi-FI', label: 'Suomi [fi-FI]' },
	{ value: 'fr-CA', label: 'Français (Canada) [fr-CA]' },
	{ value: 'fr-FR', label: 'Français (France) [fr-FR]' },
	{ value: 'he-IL', label: 'עברית [he-IL]' },
	{ value: 'hi-IN', label: 'हिंदी [hi-IN]' },
	{ value: 'hr-HR', label: 'Hrvatski [hr-HR]' },
	{ value: 'hu-HU', label: 'Magyar [hu-HU]' },
	{ value: 'id-ID', label: 'Bahasa Indonesia [id-ID]' },
	{ value: 'is-IS', label: 'Íslenska [is-IS]' },
	{ value: 'it-IT', label: 'Italiano [it-IT]' },
	{ value: 'ja-JP', label: '日本語 [ja-JP]' },
	{ value: 'km-KH', label: 'ភាសាខ្មែរ [km-KH]' },
	{ value: 'ko-KR', label: '한국어 [ko-KR]' },
	{ value: 'la', label: 'Latina [la]' },
	{ value: 'lt-LT', label: 'Lietuvių kalba [lt-LT]' },
	{ value: 'lv-LV', label: 'Latviešu [lv-LV]' },
	{ value: 'mn-MN', label: 'Монгол [mn-MN]' },
	{ value: 'nb-NO', label: 'Norsk bokmål [nb-NO]' },
	{ value: 'nl-NL', label: 'Nederlands [nl-NL]' },
	{ value: 'nn-NO', label: 'Norsk nynorsk [nn-NO]' },
	{ value: 'pl-PL', label: 'Polski [pl-PL]' },
	{ value: 'pt-BR', label: 'Português (Brasil) [pt-BR]' },
	{ value: 'pt-PT', label: 'Português (Portugal) [pt-PT]' },
	{ value: 'ro-RO', label: 'Română [ro-RO]' },
	{ value: 'ru-RU', label: 'Русский [ru-RU]' },
	{ value: 'sk-SK', label: 'Slovenčina [sk-SK]' },
	{ value: 'sl-SI', label: 'Slovenščina [sl-SI]' },
	{ value: 'sr-RS', label: 'Српски / Srpski [sr-RS]' },
	{ value: 'sv-SE', label: 'Svenska [sv-SE]' },
	{ value: 'th-TH', label: 'ไทย [th-TH]' },
	{ value: 'tr-TR', label: 'Türkçe [tr-TR]' },
	{ value: 'uk-UA', label: 'Українська [uk-UA]' },
	{ value: 'vi-VN', label: 'Tiếng Việt [vi-VN]' },
	{ value: 'zh-CN', label: '中文 (中国大陆) [zh-CN]' },
	{ value: 'zh-TW', label: '中文 (台灣) [zh-TW]' },
];

export default function modal(props) {
	const [form] = Form.useForm();
	const router = useRouter();
	const { modalVisible, setModalVisible } = props;

	const handleOk = async () => {
		const values = await form.validateFields().catch((info) => {
			console.log('Validate Failed:', info);
			return;
		});
		try {
			const res = await axios({
				url: '/api/configs/default',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json;charset=UTF-8',
				},
				data: values,
			});
			console.log(res);
			form.resetFields();
			setModalVisible(false);
			message.success(`Successfully added: ${res.data.delta.name}`);
			router.reload();
		} catch (err) {
			message.error(err?.response?.data?.message);
			return;
		}
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	return (
		<>
			<Modal
				title='Add New Engine'
				visible={modalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Submit'
			>
				<Form
					{...layout}
					name='basic'
					initialValues={{ priority: 0, blockedRegions: [], embeddable: false }}
					form={form}
				>
					<Form.Item
						label='Name'
						name='name'
						rules={[{ required: true, message: 'Please enter a name!' }]}
					>
						<Input placeholder='Enter a name' />
					</Form.Item>

					<Form.Item
						label='URL'
						name='url'
						rules={[
							{
								required: true,
								message: 'Please enter a valid URL!',
								pattern: urlRegex,
							},
						]}
					>
						<Input placeholder='Replace search key with %s' />
					</Form.Item>
					<Form.Item label='Priority' name='priority'>
						<InputNumber min={0} max={20} />
					</Form.Item>
					<Form.Item label='Unavailable in' name='blockedRegions' rules={[{ type: 'array' }]}>
						<Select
							mode='multiple'
							placeholder='Regions that has blocked this site'
							options={countries}
						/>
					</Form.Item>
					<Form.Item label='Locale' name='locale'>
						<Select placeholder='Default language of this site' allowClear options={locales} />
					</Form.Item>
					<Form.Item label='Embeddable'>
						<Form.Item name='embeddable' valuePropName='checked' noStyle>
							<Switch />
						</Form.Item>
						<span className='text-sm ml-1.5'> in an iFrame</span>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
