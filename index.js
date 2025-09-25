const express = require('express')
const fetch = require('node-fetch')
const app = express()
app.use(express.json())


const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1420886120777912340/BTHVyv_XV5nE2TFRIFnwH_-o9uvCkahrZEhtf8oisaxffF3MP1vxmvUJvUgiOQqf93JB"
const SERVER_KEY = "222KJSDFNMJWETUHIW3jnsdfnjhsdf@*@*@*@*@*////adsfkk67655"

app.post('/forward', async (req, res) => {
  const key = req.headers['x-server-key']
  if (key !== SERVER_KEY) return res.status(401).send('Unauthorized')

  try {
    const discordResp = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    })
    res.status(discordResp.status).send(await discordResp.text())
  } catch (err) {
    res.status(500).send('Error forwarding request')
  }
})


app.listen(process.env.PORT || 3000, () => console.log('Server running'))
