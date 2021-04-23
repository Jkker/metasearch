import { Button, Modal } from 'antd';

export default function modal(props) {
	const { modalVisible, setModalVisible } = props;
	const handleOk = () => {
		setModalVisible(false);
	};

	const handleCancel = () => {
		setModalVisible(false);
	};
	return (
		<>
			<Modal title='Basic Modal' visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<Button>Button</Button>
			</Modal>
		</>
	);
}
