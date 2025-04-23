const config = {
  plugin: ["typedoc-plugin-markdown"],
  entryPoints: ["packages/**/json-doc.json"],
  entryPointStrategy: "merge",
  packageOptions: {
    excludeExternals: true,
  },
  gitRemote: "https://github.com/envisim/core",
  out: "./docs",
  router: "module",
  typePrintWidth: 100,
  hideGenerator: true,
  sortEntryPoints: false,
  indexFormat: "table",
  parametersFormat: "table",
  interfacePropertiesFormat: "table",
  classPropertiesFormat: "table",
  typeAliasPropertiesFormat: "table",
  enumMembersFormat: "table",
  propertyMembersFormat: "table",
  typeDeclarationFormat: "table",
  tableColumnSettings: {
    hideInherited: true,
    hideOverrides: true,
    hideSources: true,
  },
  // pageTitleTemplates
  //
  //
  // Utility Options
  formatWithPrettier: true,
};
export default config;
