import React, { useState } from "react";

import { MDXProvider } from "@mdx-js/react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import SearchBar from "@theme/SearchBar";
import DocSidebar from "@theme/DocSidebar";
import MDXComponents from "@theme/MDXComponents";
import NotFound from "@theme/NotFound";
import styles from "../../theme/DocPage/styles.module.css";
import Logo from "../../theme/Logo";
import Router from "../../classes/Router";

function getSidebarByPath( path, docsMetadata ) {
	let sidebarName = "mainSidebar";

	if ( path !== "/" ) {
		sidebarName = docsMetadata.permalinkToSidebar[path] || sidebarName;
	}

	return docsMetadata.docsSidebars[sidebarName];
}

export default function ( props ) {
	const { currentDocRoute, docsMetadata: { version, docsSidebars }, children } = props;
	const { siteConfig, isClient } = useDocusaurusContext();

	const router = new Router( currentDocRoute );
	const path = router.getPath();
	const sidebar = getSidebarByPath( path, props.docsMetadata );

	let content = (
		<MDXProvider components={ MDXComponents }>{ children }</MDXProvider>
	);

	if ( !router.valid ) {
		content = <NotFound { ...props } />;
	}

	const [ isSearchBarExpanded, setIsSearchBarExpanded ] = useState( false );

	return (
		<Layout version={ version } key={ isClient }>
			<div className={ styles.docPage }>
				<div className={ styles.docSidebarContainer } role="complementary">
					<Logo/>
					<div className={ styles.sidebar__menu }>
						<SearchBar
							handleSearchBarToggle={ setIsSearchBarExpanded }
							isSearchBarExpanded={ isSearchBarExpanded }
						/>
						<DocSidebar
							docsSidebars={ docsSidebars }
							sidebar={ sidebar }
							path={ path }
							sidebarCollapsible={
								siteConfig.themeConfig?.sidebarCollapsible ?? true
							}
						/>
					</div>
				</div>
				<main className={ styles.docMainContainer }>
					{ content }
				</main>
			</div>
		</Layout>
	);
}
