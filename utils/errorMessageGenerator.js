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

module.exports = {invalidDataMsg, invalidIdMsg, unexistingModelId, unexistingModel}
