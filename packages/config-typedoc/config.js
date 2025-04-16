const config = {
  // Configuration Options
  // options
  // tsconfig
  // compilerOptions
  plugin: ["typedoc-plugin-markdown"],
  //
  //
  // Input Options
  // entryPoints
  // entryPointStrategy: "resovle",
  packageOptions: {
    excludeExternals: true,
  },
  // alwaysCreateEntryPointModule: true,
  // projectDocuments
  // exclude
  // externalPattern
  excludeExternals: true,
  // excludeNotDocumented
  // excludeNotDocumentedKinds
  // excludeInternal
  // excludePrivate
  // excludeProtected
  excludeReferences: true,
  // excludeCategories
  // maxTypeConversionDepth
  // name
  // includeVersion
  disableSources: true,
  // sourceLinkTemplate
  // gitRevision
  gitRemote: "https://github.com/envisim/core",
  // disableGit
  readme: "none",
  //
  //
  // Output Options
  // outputs
  out: "./docs",
  // html
  // json: "./json-doc.json",
  // pretty
  // emit
  // theme
  router: "module",
  // router: "structure",
  // lightHighlightTheme
  // darkHighlightTheme
  // highlightLanguages
  // ignoredHighlightLanguages
  typePrintWidth: 100,
  // customCss
  // customJs
  // customFooterHtml
  // customFooterHtmlDisableWrapper
  // markdownItOptions
  // markdownItLoader
  // basePath
  // cname
  // favicon
  // sourceLinkExternal
  // markdownLinkExternal
  // lang
  // locales
  // githubPages
  // cacheBust
  hideGenerator: true,
  // searchInComments
  // searchInDocuments
  // cleanOutputDir
  // titleLink
  // navigationLinks
  // sidebarLinks
  // navigation
  // headings
  // sluggerConfiguration
  // navigationLeaves
  // visibilityFilters
  // searchCategoryBoosts
  // searchGroupBoosts
  // hostedBaseUrl
  // useHostedBaseUrlForAbsoluteLinks
  // useFirstParagraphOfCommentAsSummary
  // includeHierarchySummary
  //
  //
  // Comment Options
  // commentStyle
  // useTsLinkResolution
  // preserveLinkText
  // jsDocCompatibility
  // suppressCommentWarningsInDeclarationFiles
  // blockTags
  // inlineTags
  // modifierTags
  // cascadedModifierTags
  // excludeTags
  // notRenderedTags
  // externalSymbolLinkMappings: {
  //   "@envisim/distributions": {
  //     "*": "../../envisim-distributions/docs",
  //   },
  //   "@envisim/estimate": {
  //     "*": "../../envisim-estimate/docs",
  //   },
  //   "@envisim/geojson": {
  //     "*": "../../envisim-geojson/docs",
  //   },
  //   "@envisim/geojson-utils": {
  //     "*": "../../envisim-geojson-utils/docs",
  //   },
  //   "@envisim/geosampling": {
  //     "*": "../../envisim-geosampling/docs",
  //   },
  //   "@envisim/matrix": {
  //     "*": "../../envisim-matrix/docs",
  //   },
  //   "@envisim/random": {
  //     "*": "../../envisim-random/docs",
  //   },
  //   "@envisim/sampling": {
  //     "*": "../../envisim-sampling/docs",
  //   },
  //   "@envisim/utils": {
  //     "*": "../../envisim-utils/docs",
  //   },
  // },
  //
  //
  // Organization Options
  // groupReferencesByType
  // categorizeByGroup
  // defaultCategory
  // categoryOrder
  // groupOrder
  // sort
  sortEntryPoints: false,
  // kindSortOrder
  //
  //
  // Validation Options
  // validation: {
  //   invalidLink: false,
  // },
  // treatWarningsAsErrors
  // treatValidationWarningsAsErrors
  // intentionallyNotExported
  // requiredToBeDocumented
  // packagesRequiringDocumentation
  // intentionallyNotDocumented
  //
  //
  // Other Options
  // watch
  // preserveWatchOutput
  // help
  // version
  // showConfig
  logLevel: "Warn",
  // skipErrorChecking
  //
  //
  // typedoc-plugin-markdown
  //
  // File Options
  // fileExtension
  // entryFileName
  // modulesFileName
  // mergeReadme: true,
  // flattenOutputFiles
  // excludeScopesInPaths
  //
  //
  // Display Options
  // hidePageHeader
  // hideBreadcrumbs
  // hidePageTitle
  // useCodeBlocks
  // expandObjects
  // expandParameters
  // blockTagsPreserveOrder
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
  // prettierConfigFile
  // publicPath
  // useHTMLEncodedBrackets
  // useHTMLAnchors
  // anchorPrefix
  // sanitizeComments
};

export default config;
