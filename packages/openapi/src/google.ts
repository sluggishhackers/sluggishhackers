type CustomSearchResult = {
  kind: "customsearch#search";
  url: {
    type: "application/json";
    template: string;
  };
  queries: {
    request: {
      title: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }[];
  };
  context: { title: string };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items?: {
    kind: "customsearch#result";
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap: {
      cse_thumbnail: [
        {
          src: string;
          width: string;
          height: string;
        },
      ];
      metatags: {
        "application-name": string;
        "msapplication-tilecolor": string;
        "og:image": string;
        "theme-color": string;
        "og:type": string;
        "article:published_time": string;
        "og:image:width": string;
        "apple-mobile-web-app-title": string;
        "og:title": string;
        "og:image:height": string;
        "msapplication-tileimage": string;
        "og:description": string;
        "article:modified_time": string;
        viewport: string;
        "og:locale": string;
        "og:url": string;
      }[];
      cse_image: {
        src: string;
      }[];
    }[];
  }[];
};

export const customSearch = async (params: {
  apiKey: string;
  cx: string;
  query: string;
}): Promise<CustomSearchResult> => {
  return fetch(
    `https://www.googleapis.com/customsearch/v1?key=${params.apiKey}&q=${params.query}&cx=${params.cx}`
  ).then((res) => res.json());
};
