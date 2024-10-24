const AJV = require("ajv").default;
const ajv = new AJV();
const schema = {
    type: "object",
    properties: {
        name: { type: "string" },
        id: { type: "integer" }
    },
    required: ["name"],
    additionalProperties: false
    ,
}
module.exports = ajv.compile(schema);