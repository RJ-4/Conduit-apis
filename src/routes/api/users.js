const { Router } = require('express')
const { createUser,findUserByUsername } = require('../../controllers/users')

const route = Router()


route.post('/', async (req, res) => {
  try {

    const user = await createUser(
      req.body.user.username,
      req.body.user.email,
      req.body.user.password
    )
    res.status(201).send({ user })

  } catch (e) {
    res.status(500).json({
      message: e.errors[0].message
    })
  }
})

route.post('/login', async (req, res) => {
  let user;
  try {
    user = await findUserByUsername(
      req.body.user.username
    )

  } catch (e) {
    res.status(500).json({
      message: e.message
    })
  }
  if (user === null || user.password !== req.body.user.password)
    res.status(401).json({ Error: "Wrong username or password" })


  res.status(200).send({ user })

})


module.exports = route
