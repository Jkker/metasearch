import AddEngineModal from '@/components/AddEngineModal';
import { useState } from 'react';
export default function Test(props) {
	const [modalVisible, setModalVisible] = useState(true);
	return (
		<div>
			<button
				className='rounded-sm responsive-element h-8 p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center focus:outline-none '
				onClick={(e) => setModalVisible(true)}
			>
				Config
			</button>
			<AddEngineModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
		</div>
	);
}
