/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import renderRoutes from "@docusaurus/renderRoutes";
import { matchPath } from "@docusaurus/router";
import YoastDocPageContent from "../../components/YoastDocPageContent";

function DocPageContent( props ) {
	return <YoastDocPageContent { ...props } />
}

function DocPage( props ) {
	const {
		route: { routes: docRoutes },
		docsMetadata,
		location,
	} = props;

	const currentDocRoute = docRoutes.find( ( docRoute ) =>
		matchPath( location.pathname, docRoute ),
	) || {};

	return (
		<DocPageContent
			currentDocRoute={ currentDocRoute }
			docsMetadata={ docsMetadata }>
			{ renderRoutes( docRoutes ) }
		</DocPageContent>
	);
}

export default DocPage;
