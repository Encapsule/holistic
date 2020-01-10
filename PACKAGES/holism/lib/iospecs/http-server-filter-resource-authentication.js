// http-server-filter-resource-authentication.js

module.exports = {
    ____label: "Resource Authentication Settings",
    ____description: "Optional settings to limit resource access to authenticated users.",
    ____types: "jsObject",
    ____defaultValue: {},
    required: {
        ____label: "Require Authorization Flag",
        ____description: "Boolean value indicating if resource access is restricted to authorized users.",
        ____accept: "jsBoolean",
        ____defaultValue: false
    }
};
