// content-type-spec.js

// Reference:
// https://www.nginx.com/resources/wiki/start/topics/examples/full/
// http://stackoverflow.com/questions/2871655/proper-mime-type-for-fonts

module.exports = {
    ____label: "Content Type",
    ____description: "The value of the Content-Type header to return along with the indicated resource.",
    ____accept: "jsString",
    ____inValueSet: [
        "application/font-woff",
        "application/font-woff2",
        "application/javascript",
        "application/json",
        "application/x-font-ttf",
        "application/x-www-form-urlencoded", // See: https://www.ietf.org/rfc/rfc1867.txt
        "application/xml", //See RFC2376b https://www.ietf.org/rfc/rfc2376.txt
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/x-icon",
        "multipart/form-data", // See: https://www.ietf.org/rfc/rfc2388.txt
        "text/css",
        "text/html",
        "text/plain",
        "text/xml"
    ]
};
