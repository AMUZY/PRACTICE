import { liteClient as algoliasearch } from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  configure,
  poweredBy,
} from "instantsearch.js/es/widgets";
import "instantsearch.css/themes/reset.css";
import "@algolia/algolia.css";
import { useEffect, useState } from "react";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string;
const ALGOLIA_SEARCH_API = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API as string;

const useAlgolia = () => {
  const [parent, setParent] = useState<string | undefined>();

  const AssignParent = (name: string) => {
    setParent(name);
  };

  useEffect(() => {
    if (parent) {
      // Query for any other node in which you want to display the search bar
      const searchBarContainer = document.getElementById(parent);
      if (!searchBarContainer?.firstChild) {
        const searchBarNode = document.createElement("div");
        searchBarNode.setAttribute("class", "ais-InstantSearch");

        [{ id: "searchbox" }, { id: "hits" }, { id: "algolia-footer" }].forEach(
          (detail, index) => {
            const innerDiv = document.createElement("div");
            innerDiv.id = detail.id;
            switch (index) {
              case 1: {
                innerDiv.className = "hide-content";
              }
              case 2: {
                innerDiv.className = "hide-content";
              }
            }
            searchBarNode.appendChild(innerDiv);
          }
        );

        searchBarContainer?.prepend(searchBarNode);

        const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API);

        const search = instantsearch({
          indexName: "suit_algolia",
          searchClient,
          onStateChange({ uiState, setUiState }) {
            const hitsContainer = document.querySelector("#hits");
            const footerContainer = document.querySelector("#algolia-footer");

            if (!uiState["suit_algolia"]?.query) {
              hitsContainer?.classList.add("hide-content");
              footerContainer?.classList.add("hide-content");
              setUiState(uiState);
              return;
            }

            hitsContainer?.classList.remove("hide-content");
            footerContainer?.classList.remove("hide-content");
            setUiState(uiState);
          },
        });

        search.addWidgets([
          searchBox({
            container: "#searchbox",
            placeholder: "Search your data here",
          }),
          configure({
            hitsPerPage: 3,
          }),
          poweredBy({
            container: "#algolia-footer",
          }),
          hits({
            container: "#hits",
            templates: {
              item: (hit, { html, components }) => html`
                <picture>
                  <img src="${hit.img}" />
                </picture>
                <div>
                  <p class="primary-text">
                    ${components.Highlight({ hit, attribute: "brand" })}
                  </p>
                  <p class="secondary-text">
                    ${components.Highlight({ hit, attribute: "description" })}
                  </p>
                  <p class="tertiary-text">
                    ${components.Highlight({ hit, attribute: "color" })}
                  </p>
                </div>
              `,
            },
          }),
        ]);

        search.start();
      }
    }
  }, [parent]);

  return { AssignParent };
};

export default useAlgolia;
