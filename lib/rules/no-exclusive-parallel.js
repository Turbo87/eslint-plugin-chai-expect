'use strict';

var getAdditionalTestFunctions = require('../util/settings').getAdditionalTestFunctions;

module.exports = function (context) {
    var mochaTestFunctions = [
            'parallel'
        ],
        settings = context.settings,
        additionalTestFunctions = getAdditionalTestFunctions(settings);

    mochaTestFunctions = mochaTestFunctions.concat(additionalTestFunctions);

    function matchesMochaTestFunction(object) {
        return object && mochaTestFunctions.indexOf(object.name) !== -1;
    }

    function isPropertyNamedOnly(property) {
        return property && (property.name === 'only' || property.value === 'only');
    }

    function isCallToMochasOnlyFunction(callee) {
        return callee.type === 'MemberExpression' &&
            matchesMochaTestFunction(callee.object) &&
            isPropertyNamedOnly(callee.property);
    }

    return {
        CallExpression: function (node) {
            var callee = node.callee;

            if (callee && isCallToMochasOnlyFunction(callee)) {
                context.report({
                    node: callee.property,
                    message: 'Unexpected exclusive parallel mocha test.'
                });
            }
        }
    };
};

module.exports.schema = [
    {
        type: 'object',
        properties: {
            additionalTestFunctions: {
                type: 'array',
                items: {
                    type: 'string'
                },
                minItems: 1,
                uniqueItems: true
            }
        }
    }
];
