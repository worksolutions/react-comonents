import { css } from "styled-components";

import { TypographyTypes } from "../../Typography";
import { externalTypographyLinkStyles } from "../../Typography/TypographyLink";

import { getColor } from "../../../styles";

const tableBorder = `1px solid ${getColor("gray-blue/02")}`;

export const htmlTextStyles = css`
  * {
    margin-top: 0;
    color: ${getColor("gray-blue/10")};
  }

  pre {
    margin-top: 0 !important;
    margin-bottom: 32px !important;
    overflow-x: auto;
  }

  p,
  h1,
  h2,
  h3,
  code,
  figure,
  table {
    margin-bottom: 32px;
  }

  a {
    ${TypographyTypes["body-regular"]};
    ${externalTypographyLinkStyles};
  }

  p {
    ${TypographyTypes["body-regular"]};
  }

  h1 {
    ${TypographyTypes["h1-bold"]};
  }

  h2 {
    ${TypographyTypes["h2-bold"]};
  }

  h3 {
    ${TypographyTypes["h3-bold"]};
  }

  code,
  pre code {
    ${TypographyTypes["body-regular"]};
  }

  pre {
    border-radius: 6px;
    padding: 16px;
    border: 1px solid ${getColor("gray-blue/02")};
    background: ${getColor("gray-blue/01")};
  }

  li {
    margin-bottom: 20px;
  }

  > ol,
  > ul {
    padding-left: 16px;
    margin-bottom: 32px;
    ul,
    ol {
      margin-top: 20px;
    }
  }

  li {
    ${TypographyTypes["body-regular"]};
  }

  figure {
    margin-left: 0;
    margin-right: 0;
    img {
      width: 100%;
    }
    figcaption {
      margin-top: 12px;
      text-align: center;
      font-style: italic;
      ${TypographyTypes["body-regular"]};
    }
  }

  hr {
    position: relative;
    margin: 40px auto;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${getColor("gray-blue/05")};
    overflow: visible;
    border: 0;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${getColor("gray-blue/05")};
    }

    &::before {
      left: -16px;
    }

    &::after {
      right: -16px;
    }
  }
`;

export const htmlTableStyles = css`
  figure & > table {
    margin-bottom: 0;
  }

  table,
  tbody,
  thead {
    display: block;
  }

  tr {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  td,
  th {
    ${TypographyTypes["body-regular"]};
    padding: 8px;
    flex: 1;
    text-align: start;
    border-right: ${tableBorder};
  }

  tr {
    border-top: ${tableBorder};
  }

  thead,
  tbody {
    border-left: ${tableBorder};
  }

  table {
    border-bottom: ${tableBorder};
  }
`;

export const htmlStyles = css`
  ${htmlTextStyles}
  ${htmlTableStyles}
`;
