const headersParamSpec = [
  {
    pathPatterns: [
      '/guests/{guestId}',
      '/realms/guests/{guestId}/logout',
      '/shop/props/{propCode}/cost',
    ],
    headers: [
      {
        name: 'x-encode-id',
        in: 'header',
        required: true,
        description: 'Encoded session id for the specified guest.',
        type: 'string',
      },
      {
        name: 'x-session-id',
        in: 'header',
        required: true,
        description: 'the session id of the API requesting client.',
        type: 'string',
      },
      {
        name: 'x-sys-id',
        in: 'header',
        required: true,
        description:
          "the system id of the API requesting client, accepts one of 'ios', 'android', 'mini-program'.",
        type: 'string',
      },
    ],
  },
  {
    pathPatterns: ['/realms/{realmName}/'],
    headers: [
      {
        name: 'x-session-id',
        in: 'header',
        required: true,
        description: 'the session id of the API requesting client.',
        type: 'string',
      },
      {
        name: 'x-sys-id',
        in: 'header',
        required: true,
        description:
          "the system id of the API requesting client, accepts one of 'ios', 'android', 'mini-program'.",
        type: 'string',
      },
    ],
  },
  {
    pathPatterns: [
      '/realms/guest/enrollment',
      '/reservations$',
      '^/shop/props',
      '^/config',
    ],
    headers: [
      {
        name: 'x-sys-id',
        in: 'header',
        required: true,
        description:
          "the system id of the API requesting client, accepts one of 'ios', 'android', 'mini-program'.",
        type: 'string',
      },
    ],
  },
];

const addHeadersParam = (doc) => {
  Object.keys(doc.paths).forEach((key) => {
    headersParamSpec.forEach((headerSpec) => {
      const headersParam = headerSpec.headers;
      const pathPatterns = headerSpec.pathPatterns;

      pathPatterns.forEach((pathPattern) => {
        const re = new RegExp(pathPattern);
        if (re.test(key)) {
          const paramObj = doc.paths[key]['parameters'];
          const newHeaders = JSON.parse(JSON.stringify(headersParam));
          if (paramObj) {
            if (Array.isArray(paramObj)) {
              doc.paths[key]['parameters'] = [...paramObj, ...newHeaders];
            } else {
              doc.paths[key]['parameters'] = [paramObj, ...newHeaders];
            }
          } else {
            doc.paths[key]['parameters'] = newHeaders;
          }
        }
      });
    });
  });
};

module.exports = { addHeadersParam };
