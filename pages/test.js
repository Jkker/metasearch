// import AddEngineModal from "@/components/AddEngineModal"
// import dbConnect from "lib/dbConnect.js"
// import User from "models/User.js"
import React from "react"
import Form from "components/ConfigItemForm"
import ClientOnly from "components/ClientOnly"

/* export async function getStaticProps(context) {
  await dbConnect()

  const user = await User.findOne({
    username: context.locale,
  })
    .populate("config")
    .exec()
    .catch(console.log)
  const config = await JSON.parse(JSON.stringify(user.config))
  return {
    props: {
      config,
    },
  }
} */
export default function Test(props) {
  /* const [modalVisible, setModalVisible] = useState(true)
  return (
    <div>
      <button
        className="rounded-sm responsive-element h-8 p-2 flex flex-nowrap whitespace-nowrap justify-evenly items-center focus:outline-none "
        onClick={(e) => setModalVisible(true)}
      >
        Config
      </button>
       <AddEngineModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </div>
  ) */
  return (
    <ClientOnly>
      <Form />
    </ClientOnly>
  )
}
