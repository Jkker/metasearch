import Loading from 'components/Loading.js'

export default function loading(props) {
  return (
    <Loading spinning={true}>
      <div className="h-screen w-screen">1</div>
    </Loading>
  )
}
