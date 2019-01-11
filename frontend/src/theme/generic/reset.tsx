import { css } from "..";

export default css`
    body,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    dl,
    dd,
    ol,
    ul,
    form,
    fieldset,
    legend,
    figure,
    table,
    th,
    td,
    caption,
    hr {
        margin: 0;
        padding: 0;
    }
    li > {
        ul,
        ol {
            margin-bottom: 0;
        }
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    td,
    th {
        padding: 0;
    }

    ul {
        list-style: none;
        margin: 0;
    }

    a {
        text-decoration: none;
    }
`;
