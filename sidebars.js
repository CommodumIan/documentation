/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

let { protodocs } = require("./docs/grpc/sidebar");

module.exports = {
  api: [
    "api/overview",
    {
      type: "category",
      label: "Tutorials",
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "tutorials",
        },
      ],
    },
    {
      type: "category",
      label: "How-to guides",
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "howto",
        },
      ],
    },
    {
      type: "doc",
      label: "GraphQL",
      id: "graphql/schema",
    },
    {
      type: "link",
      href: "/docs/testnet/grpc/vega/vega.proto",
      label: "GRPC",
    },
    {
      type: "category",
      label: "REST",
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "api/rest/overview",
          label: "Overview",
        },
        {
          type: "link",
          href: "/docs/testnet/api/rest/data-node/data",
          label: "Data node",
        },
        {
          type: "link",
          href: "/docs/testnet/api/rest/core/core",
          label: "Core",
        },
        {
          type: "link",
          href: "/docs/testnet/api/rest/core/state",
          label: "Core state",
        },
      ],
    },
    {
      type: "category",
      label: "Ethereum bridge",
      collapsed: true,
      items: [
        {
          type: "autogenerated",
          dirName: "api/bridge",
        },
      ],
    },
  ],
  concepts: [
    {
      type: "autogenerated",
      dirName: "concepts",
    },
  ],
  tools: [
    {
      type: "autogenerated",
      dirName: "tools",
    },
  ],
  "node-operators": [
    {
      type: "autogenerated",
      dirName: "node-operators",
    },
  ],
  grpc: protodocs,
  // GraphQL
  graphql: [
    {
      type: "autogenerated",
      dirName: "graphql",
    },
  ],
};
