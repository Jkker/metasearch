export default function SVGFromString(props) {
  if (!props.svg) {
    return null
  } else
    return (
      <img
        style={props.style}
        className="icon mr-1 h-4"
        src={`data:image/svg+xml;utf8,${unescape(props.svg)}`}
      />
    )
}
