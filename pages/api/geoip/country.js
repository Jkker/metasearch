const { lookup } = require('geoip-country')
const requestIp = require('request-ip')

const DEFAULT_IP = '1.0.1.0' // default CN

export default (req, res) => {
  const clientIp = requestIp.getClientIp(req)
  const geo = lookup(clientIp?.replace('::1', '')?.replace('127.0.0.1', '') || DEFAULT_IP)
  res.status(200).json({ ...geo, ip: clientIp })
}
