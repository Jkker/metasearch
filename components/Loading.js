import { Spin } from 'antd'
import Image from 'next/image'

export default function Loading({ children, ...props }) {
  return (
    <Spin
      {...props}
      size='large'
      indicator={<Image src="/static/images/loading-cat-transparent.gif" height={32} width={32} />}
    >
      {children}
    </Spin>
  )
}
