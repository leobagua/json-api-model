import _ from 'lodash'

export default class Model {

  static snakeCase(attribute) {
    return _.snakeCase(attribute)
  }

  static isObject(data) {
    return _.isObject(data)
  }

  static convertObjectToModel(data) {
    let instance = new Model()

    Object.entries(data).forEach(([key, value]) => {
      instance[key] = value
    })

    return instance
  }

  constructor() {
    return new Proxy(this, {
      get: (instance, attribute) => {
        let snakeCaseAttribute = instance.constructor.snakeCase(attribute)

        return instance[snakeCaseAttribute]
      },
      set: (instance, attribute, value) => {
        let snakeCaseAttribute = instance.constructor.snakeCase(attribute)

        if(instance.constructor.isObject(value)) value = instance.constructor.convertObjectToModel(value)

        instance[snakeCaseAttribute] = value

        return true
      }
    })
  }
}
