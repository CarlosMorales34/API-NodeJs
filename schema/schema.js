const z = require('zod')

// Validación de datos con Zod
const brainSchema = z.object({
  estructuraCerebral: z.string({
    invalid_type_error: 'Estructura cerebral debe ser un string',
    required_error: 'Estructura cerebral es requerida'
  }),
  areaCerebral: z.array(z.object({
    area: z.string({
      invalid_type_error: 'La area debe ser un string',
      required_error: 'La area es requerida'
    }),
    descripcion: z.string({
      invalid_type_error: 'La descripcion debe ser un string',
      required_error: 'La descripcion es requerida'
    })
  }))
})

function validateBrain (data) {
  return brainSchema.safeParse(data)
}

function validatePartialBrain (data) {
  return brainSchema.partial().safeParse(data)
}

module.exports = {
  validateBrain,
  validatePartialBrain
}
