import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeConnectionType,
} from "n8n-workflow";

export class Searxng implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Searxng",
    name: "searxng",
    icon: "file:searxng.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: "Perform web searches using Searxng",
    defaults: {
      name: "Searxng",
    },
    inputs: [
      {
        type: NodeConnectionType.Main,
      },
    ],
    outputs: [
      {
        type: NodeConnectionType.Main,
      },
    ],
    credentials: [
      {
        name: "searxngApi",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Search",
            value: "search",
            description: "Perform a search query",
            action: "Perform a search query",
          },
        ],
        default: "search",
      },
      {
        displayName: "Query",
        name: "query",
        type: "string",
        default: "",
        required: true,
        placeholder: "Enter search query",
        description: "The search query to perform",
      },
      {
        displayName: "Categories",
        name: "categories",
        type: "multiOptions",
        options: [
          { name: "General", value: "general" },
          { name: "Images", value: "images" },
          { name: "News", value: "news" },
          { name: "Videos", value: "videos" },
          { name: "Files", value: "files" },
          { name: "IT", value: "it" },
          { name: "Maps", value: "map" },
          { name: "Music", value: "music" },
          { name: "Science", value: "science" },
          { name: "Social Media", value: "social media" },
        ],
        default: ["general"],
        description: "Categories to search in",
      },
      {
        displayName: "Additional Fields",
        name: "additionalFields",
        type: "collection",
        placeholder: "Add Field",
        default: {},
        options: [
          {
            displayName: "Language",
            name: "language",
            type: "options",
            options: [
              { name: "English", value: "en" },
              { name: "German", value: "de" },
              { name: "French", value: "fr" },
              { name: "Spanish", value: "es" },
              { name: "Italian", value: "it" },
              { name: "All Languages", value: "all" },
            ],
            default: "en",
            description: "Language of the search results",
          },
          {
            displayName: "Time Range",
            name: "time_range",
            type: "options",
            options: [
              { name: "Any Time", value: "all" },
              { name: "Day", value: "day" },
              { name: "Week", value: "week" },
              { name: "Month", value: "month" },
              { name: "Year", value: "year" },
            ],
            default: "all",
            description: "Time range for the search results",
          },
          {
            displayName: "Safe Search",
            name: "safesearch",
            type: "options",
            options: [
              { name: "Off", value: "0" },
              { name: "Moderate", value: "1" },
              { name: "Strict", value: "2" },
            ],
            default: "1",
            description: "Safe search level",
          },
          {
            displayName: "Page Number",
            name: "pageno",
            type: "number",
            typeOptions: {
              minValue: 1,
            },
            default: 1,
            description: "Page number of results",
          },
          {
            displayName: "Format",
            name: "format",
            type: "options",
            options: [
              { name: "HTML", value: "html" },
              { name: "JSON", value: "json" },
              { name: "RSS", value: "rss" },
            ],
            default: "json",
            description: "Output format of the search results",
          },
        ],
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    try {
      const credentials = await this.getCredentials("searxngApi");
      if (!credentials) {
        throw new NodeOperationError(
          this.getNode(),
          "No credentials got returned!",
        );
      }

      for (let i = 0; i < items.length; i++) {
        let query: string
        if (items[i].json && typeof items[i].json === 'object' && 'query' in items[i].json) {
          query = items[i].json.query as string
        } else {
          query = this.getNodeParameter("query", i) as string
        }

        const categories = this.getNodeParameter("categories", i) as string[];
        const additionalFields = this.getNodeParameter(
          "additionalFields",
          i,
        ) as {
          language?: string;
          time_range?: string;
          safesearch?: string;
          pageno?: number;
          format?: string;
        };

        const queryParameters: Record<string, string | number> = {
          q: query,
          categories: categories.join(","),
          format: additionalFields.format || "json",
        };

        if (additionalFields.language) {
          queryParameters.language = additionalFields.language;
        }
        if (additionalFields.time_range) {
          queryParameters.time_range = additionalFields.time_range;
        }
        if (additionalFields.safesearch) {
          queryParameters.safesearch = additionalFields.safesearch;
        }
        if (additionalFields.pageno) {
          queryParameters.pageno = additionalFields.pageno;
        }

        try {
          const response = await this.helpers.httpRequest({
            method: "GET" as const,
            url: `${credentials.apiUrl}/search`,
            qs: queryParameters,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${credentials.apiKey}`,
            },
          });

          returnData.push({
            json: {
              success: true,
              query,
              ...response,
            },
          });
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({
              json: {
                success: false,
                error: error.message,
                query,
              },
            });
            continue;
          }
          throw error;
        }
      }

      return [returnData];
    } catch (error) {
      if (this.continueOnFail()) {
        return [returnData];
      }
      throw error;
    }
  }
}
