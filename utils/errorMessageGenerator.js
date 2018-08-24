function invalidIdMsg (model, modelId) {
  return `Invalid ${model} id: ${modelId}`
}

function invalidDataMsg (name, expected, value) {
  return `Invalid data: ${name} should be a ${expected}. Got ${value}.`
}

function unexistingModelId (model, modelId) {
  return `${model} with id: ${modelId} does not exist!`
}

function unexistingModel (modelName) {
  return `${modelName} model not found!`
}

function invalidRegisterData () {
  return (
    `Username must be between 3 and 20 symbols long, start with latin letter and contain only digits and latin letters.
    The password must be between 6 and 20 symbols long, contain uppercase, lowercase and digit.`
  )
}
module.exports = {
  invalidRegisterData,
  invalidDataMsg,
  invalidIdMsg,
  unexistingModelId,
  unexistingModel
}
