const AJV = require("ajv").default;
const ajv = new AJV();
const schema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
        password: { type: "string" }
    },
    required: [ "email", "password"],
    additionalProperties: false
    ,
}
module.exports = ajv.compile(schema);