import React, { HTMLAttributes } from "react";

interface HTMLProps {
  htmlAttributes: HTMLAttributes<HTMLHtmlElement>;
  headComponents: HTMLHeadElement;
  bodyAttributes: HTMLAttributes<HTMLBodyElement>;
  preBodyComponents: React.ReactNode;
  body: string;
  postBodyComponents: React.ReactNode;
}

const HTML: React.FC<HTMLProps> = (props) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
