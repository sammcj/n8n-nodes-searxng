import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow'

export class Searxng implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Searxng',
    name: 'searxng',
    group: ['transform'],
    version: 1,
    description: 'Perform web searches using Searxng',
    defaults: {
      name: 'Searxng',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        default: '',
        placeholder: 'Enter search query',
        description: 'The search query to perform',
      },
      {
        displayName: 'Categories',
        name: 'categories',
        type: 'multiOptions',
        options: [
          { name: 'General', value: 'general' },
          { name: 'Images', value: 'images' },
          { name: 'News', value: 'news' },
          { name: 'Videos', value: 'videos' },
        ],
        default: [],
        description: 'Categories to search in',
      },
      {
        displayName: 'Language',
        name: 'language',
        type: 'string',
        default: 'en',
        description: 'Language of the search results',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData()
    const returnData: INodeExecutionData[] = []

    for (let i = 0; i < items.length; i++) {
      const query = this.getNodeParameter('query', i) as string
      const categories = this.getNodeParameter('categories', i) as string[]
      const language = this.getNodeParameter('language', i) as string

      const credentials = await this.getCredentials('searxngApi')
      const apiUrl = credentials?.apiUrl as string
      const response = await this.helpers.httpRequest({
        method: 'GET',
        url: `${apiUrl}/search`,
        qs: {
          q: query,
          categories: categories.join(','),
          language,
        },
      })

      returnData.push({ json: response })
    }

    return [returnData]
  }
}
