import React from 'react';
import PropTypes from 'prop-types';

import { themeOper } from './utils/IIFE';

function HTML({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) {
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {headComponents}
      </head>
      <body {...bodyAttributes} className="light">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (${themeOper.toString()})();
            `,
          }}
        />
        {preBodyComponents}
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

HTML.defaultProps = {
  htmlAttributes: null,
  headComponents: null,
  bodyAttributes: null,
  preBodyComponents: null,
  body: '',
  postBodyComponents: null,
};

export default HTML;
