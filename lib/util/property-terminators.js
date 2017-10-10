var PROPERTY_TERMINATORS = [
  'ok',
  'true',
  'false',
  'null',
  'undefined',
  'exist',
  'empty',
  'arguments'
];

module.exports = function(options) {
  var propertyTerminators = PROPERTY_TERMINATORS;
  var propOptions = options[0];
  if (propOptions && propOptions.properties) {
    propertyTerminators = propertyTerminators.concat(propOptions.properties);
  }
  return propertyTerminators;
};

module.exports.schema = [
  {
    "type": "object",
    "properties": {
      "properties": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "uniqueItems": true
      }
    },
    "required": [ "properties" ],
    "additionalProperties": false
  }
];
