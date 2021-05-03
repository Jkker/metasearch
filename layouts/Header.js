import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Tooltip } from 'antd'
import Loading from 'components/Loading.js'
import { signIn, signOut, useSession } from 'next-auth/client'
import ThemeSwitch from '../components/ThemeSwitch'

export default function navbar() {
  const [session, sessionLoading] = useSession()

  return (
    <header className="fixed top-0 z-50 w-full my-2 mr-1 flex items-center justify-end bg-transparent text-white dark:text-gray-100">
      <nav className="nav-bar flex items-center text-base leading-5 space-x-3">
        <Loading spinning={sessionLoading}>
          {session ? (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item className="flex justify-between items-center">
                    <button onClick={() => signOut()}>
                      Logout <LogoutOutlined className="ml-2" />
                    </button>
                  </Menu.Item>
                </Menu>
              }
            >
              {session.user?.image ? (
                <Avatar
                  icon={<UserOutlined />}
                  src={session?.user?.image}
                  size={28}
                  className="flex-center"
                />
              ) : (
                <Avatar>{session.user?.name?.charAt(0)}</Avatar>
              )}
            </Dropdown>
          ) : (
            <Tooltip title="Sign In">
              <button onClick={() => signIn()}>
                <Avatar icon={<UserOutlined />} size={28} className="flex-center" />
              </button>
            </Tooltip>
          )}
        </Loading>
        <ThemeSwitch override="bg-transparent text-white" className="ml-1 mr-1 sm:ml-4" />
      </nav>
    </header>
  )
}
