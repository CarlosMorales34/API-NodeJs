const express = require('express')
const { validateBrain, validatePartialBrain } = require('./schema/schema.js')

const app = express()
app.use(express.json())
const brain = require('./API/brain.json')

const PORT = process.env.PORT || 3000

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({message: 'que onda'})
})
// Método GET para recuperar las estructuras del cerebro con filtrado
app.get('/brain', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { estructura } = req.query
  if (estructura) {
    const data = brain[estructura]
    return res.json(data)
  }
  res.json(brain)
})
// Método GET para recuperar cierta estructura del cerebro
app.get('/brain/:estructura/:area', (req, res) => {
  const { estructura, area } = req.params
  const data = brain[estructura][area]
  if (data) {
    res.json(data)
  } else {
    res.status(404).json({message: 'Estructura no encontrada'})
  }
})
// Método POST para crear una nueva estructura del cerebro
app.post('/brain', (req, res) => {
  const result = validateBrain(req.body)
  const estructuraCerebral = result.data.estructuraCerebral
  if (result.error) return res.status(400).json({message: JSON.parse(result.error.message)})

  const newBrain = {
    ...result.data
  }
  brain[estructuraCerebral] = newBrain

  res.status(201).json(newBrain)
})
// Método PATCH para actualizar una estructura del cerebro existente
app.patch('/brain/:estructura', (req, res) => {
  const {estructura} = req.params
  const findEstructura = brain[estructura]
  const result = validatePartialBrain(req.body)

  if (!result.success) return res.status(404).json({message: 'Error estructura no encontrada', error: result.error})

  const {areaCerebral} = result.data
  if (areaCerebral) findEstructura.areaCerebral = areaCerebral
  res.status(200).json({
    message: 'Estructura actualizada correctamente',
    estructura: findEstructura
  })
})

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`)
})

