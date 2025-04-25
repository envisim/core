const config = {
  // Configuration Options
  // options
  // tsconfig
  // compilerOptions
  // plugin,
  //
  //
  // Input Options
  // entryPoints
  // entryPointStrategy: "resovle",
  // packageOptions
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
  // name
  // includeVersion
  disableSources: true,
  // sourceLinkTemplate
  // gitRevision
  // gitRemote
  // disableGit
  readme: "none",
  //
  //
  // Output Options
  // outputs
  // out,
  // html
  json: "./temp/doc.json",
  // pretty
  // emit
  // theme
  // router
  // lightHighlightTheme
  // darkHighlightTheme
  // highlightLanguages
  // ignoredHighlightLanguages
  // typePrintWidth: 100,
  // customCss
  // customJs
  // customFooterHtml
  // customFooterHtmlDisableWrapper
  // markdownItOptions
  // markdownItLoader
  // basePath: "../../",
  // cname
  // favicon
  // sourceLinkExternal
  // markdownLinkExternal
  // lang
  // locales
  // githubPages
  // cacheBust
  // hideGenerator: true,
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
  // sortEntryPoints: false,
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
};

export default config;
