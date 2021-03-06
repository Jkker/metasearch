import { CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { message, Popconfirm, Tabs } from 'antd'
import axios from 'axios'
import ClientOnly from 'components/ClientOnly'
import ConfigItemForm from 'components/ConfigItemForm'
import path from 'path'
import React, { useRef, useState } from 'react'
import SVGFromString from '../components/SVGFromString'

const { TabPane } = Tabs

const BASE_URL = '/api/configs/'

export default function Editor(props) {
  /*   if (!props.session) {
    signIn()
    return null
  } */
  const { session, DEBUG } = props

  const { loading, setLoading } = props
  /*   useEffect(() => {
    setLoading(props.loading)
  }, [props.loading]) */
  const { config, setConfig } = props
  const [activeKey, setActiveKey] = useState(config[0]._id)
  const newTabIndex = useRef(0)
  const getURL = (id = '') => path.join(BASE_URL, props.name, id)

  const onTabEdit = (targetKey, action) => {
    console.log(targetKey)
    switch (action) {
      case 'add': {
        const newConfig = {
          title: 'new engine ' + newTabIndex.current,
          newTabIndex: newTabIndex.current++,
        }
        setConfig([...config, newConfig])
        setActiveKey(newConfig.title)
        break
      }
      case 'remove': {
        break
      }
      default: {
        console.log(action)
        return
      }
    }
  }
  async function handleDelete(engine) {
    setLoading(true)
    if (!engine._id) {
      // deleting unsaved item
      setConfig(config.filter((e) => e.title !== engine.title))
    } else {
      const res = await axios({
        method: 'DELETE',
        url: getURL(engine._id),
      }).catch((err) => message.error('Error: ' + err))
      console.log(res.data)
      if (res.data.success) {
        message.success(`${res.data.delta.title} deleted successfully`)
        setConfig(config.filter((e) => e._id !== res.data.delta._id))
        setActiveKey(config[0]._id ?? config[0].title)
      } else {
        message.error('Error: ' + err)
      }
    }
    setLoading(false)
  }
  async function handleChange(engine) {
    setLoading(true)

    if (!engine._id) {
      // post
      console.log('Create', engine.title)
      const res = await axios({
        method: 'POST',
        url: getURL(),
        data: engine,
      }).catch((err) => message.error('Error: ' + err?.response?.data?.message ?? err.message))
      if (res?.data?.success) {
        console.log(res.data)
        message.success(`${res.data.delta.title} created successfully`)

        setConfig(config.map((e) => (e.newTabIndex === engine.newTabIndex ? res.data.delta : e)))
        setActiveKey(res.data.delta._id)
      }
    } else {
      console.log('Modify', engine.title)

      const res = await axios({
        method: 'PATCH',
        url: getURL(engine._id),
        data: engine,
      }).catch((err) => message.error('Error: ' + err?.response?.data?.message ?? err.message))
      console.log(res.data)
      if (res.data.success) {
        message.success(`${res.data.delta.title} modified successfully`)
        setConfig(config.map((e) => (e._id === res.data.delta._id ? res.data.delta : e)))
      }
    }
    setLoading(false)
  }

  return (
    <Tabs
      // tabPosition="left"
      activeKey={activeKey}
      onChange={setActiveKey}
      type="editable-card"
      onEdit={onTabEdit}
      centered={true}
    >
      {config.map((e) => (
        <TabPane
          className="w-full h-full flex-col flex-center flex-nowrap max-w-screen"
          tab={
            <div className="tab-title flex-center">
              <SVGFromString
                svg={e.style?.svg}
                style={props.resolvedTheme === 'dark' ? { filter: 'invert(1)' } : {}}
              />
              {e.title}
            </div>
          }
          key={e._id ?? e.title}
          closable={true}
          closeIcon={
            <Popconfirm
              title="Are you sure to delete this engine?"
              onConfirm={() => handleDelete(e)}
              okType="primary"
              okButtonProps={{ danger: true }}
              okText="Confirm"
              cancelText="Cancel"
              icon={<DeleteOutlined style={{ color: '#ff4d4f' }} />}
            >
              <CloseOutlined />
            </Popconfirm>
          }
        >
          <ClientOnly className="w-full h-full flex-center mt-4">
            <ConfigItemForm config={e} onFinish={handleChange} />
          </ClientOnly>
          {DEBUG ? (
            <ul className="ml-24 h-full flex flex-col justify-center leading-loose list-disc dark:text-white break-all m-2">
              <h2>
                <b>User</b>
              </h2>
              <li>Username: {session?.user?.name}</li>
              <li>Email: {session?.user?.email}</li>
              <li>Icon: {session?.user?.image}</li>
              <li>AccessToken: {session?.accessToken}</li>
            </ul>
          ) : null}
        </TabPane>
      ))}
    </Tabs>
  )
}
