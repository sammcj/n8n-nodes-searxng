import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

export class SearxngApi implements ICredentialType {
  name = "searxngApi";
  displayName = "Searxng API";
  properties: INodeProperties[] = [
    {
      displayName: "API URL",
      name: "apiUrl",
      type: "string",
      default: "http://searxng:8080",
    },
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      default: "",
      typeOptions: {
        password: true,
      },
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: '={{"Bearer " + $credentials.apiKey}}',
      },
    },
  };
}
