const TABLE_FORMAT = "htmlTable";

const config = {
  // Configuration Options
  // options
  // tsconfig
  // compilerOptions
  plugin: ["typedoc-plugin-markdown", "typedoc-plugin-remark"],
  //
  //
  // Input Options
  entryPoints: ["packages/**/temp/doc.json"],
  entryPointStrategy: "merge",
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
  excludeInternal: true,
  // excludePrivate
  // excludeProtected
  excludeReferences: true,
  // excludeCategories
  // maxTypeConversionDepth
  name: "Documentation",
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
  // json,
  // pretty
  // emit
  // theme
  router: "module",
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
  lang: "en",
  locales: {
    en: {
      theme_default_value: "Default value",
      theme_default_type: "Default type",
      theme_description: "Description",
      theme_event: "Event",
      theme_re_exports: "Re-exports",
      theme_renames_and_re_exports: "Renames and re-exports",
      theme_extends: "Extends",
      theme_extended_by: "Extended by",
      theme_globals: "Globals",
      theme_member: "Member",
      theme_member_plural: "Members",
      theme_modifier: "Modifier",
      theme_name: "Name",
      theme_package: "Package",
      theme_packages: "Packages",
      theme_type: "Type",
      theme_value: "Value",
      theme_version: "Version",
    },
  },
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
  // externalSymbolLinkMappings
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
  validation: {
    invalidLink: false,
  },
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
  expandObjects: true,
  // expandParameters
  // blockTagsPreserveOrder
  indexFormat: TABLE_FORMAT,
  parametersFormat: TABLE_FORMAT,
  interfacePropertiesFormat: TABLE_FORMAT,
  classPropertiesFormat: TABLE_FORMAT,
  typeAliasPropertiesFormat: TABLE_FORMAT,
  enumMembersFormat: TABLE_FORMAT,
  propertyMembersFormat: TABLE_FORMAT,
  typeDeclarationFormat: TABLE_FORMAT,
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
  useHTMLEncodedBrackets: true,
  // useHTMLAnchors
  // anchorPrefix
  // sanitizeComments
  //
  //
  // typedoc-remark-plugin
  //
  remarkPlugins: [
    ["remark-insert-headings", { text: "Contents" }],
    ["remark-toc", { maxDepth: 3 }],
  ],
};
export default config;
