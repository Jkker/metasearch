import { Form, Input, InputNumber, message, Modal, Select, Switch } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
const { Option } = Select;
const urlRegex = new RegExp(
	/https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)%s[-a-zA-Z0-9@:%._\+~#=]*/
);

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
						<Select mode='multiple' placeholder='Select regions that has blocked this site'>
							<Option value='CN' label='China'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='China'>
										🇨🇳
									</span>
									China (中国)
								</div>
							</Option>
							<Option value='US' label='USA'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='USA'>
										🇺🇸
									</span>
									USA (美国)
								</div>
							</Option>
							<Option value='JP' label='Japan'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='Japan'>
										🇯🇵
									</span>
									Japan (日本)
								</div>
							</Option>
							<Option value='KR' label='Korea'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='Korea'>
										🇰🇷
									</span>
									Korea (韩国)
								</div>
							</Option>
						</Select>
					</Form.Item>
					<Form.Item label='Locale' name='locale'>
						<Select placeholder='Default language of this site' allowClear>
							<Option value='CN' label='China'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='China'>
										🇨🇳
									</span>
									China (中国)
								</div>
							</Option>
							<Option value='US' label='USA'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='USA'>
										🇺🇸
									</span>
									USA (美国)
								</div>
							</Option>
							<Option value='JP' label='Japan'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='Japan'>
										🇯🇵
									</span>
									Japan (日本)
								</div>
							</Option>
							<Option value='KR' label='Korea'>
								<div className='demo-option-label-item'>
									<span className='mr-1' role='img' aria-label='Korea'>
										🇰🇷
									</span>
									Korea (韩国)
								</div>
							</Option>
						</Select>
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
