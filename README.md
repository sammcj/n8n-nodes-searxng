# n8n-nodes-searxng

This is an n8n community node for integrating with SearXNG. It allows you to perform web searches using SearXNG instances in your n8n workflows.

[SearXNG](https://github.com/searxng/searxng) is a privacy-respecting, self-hosted metasearch engine that aggregates results from various search services and databases. Users are neither tracked nor profiled.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Prerequisites

- A running SearXNG instance with API access

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
pnpm i n8n-nodes-searxng
```

## Operations

### Search

The node supports performing web searches with the following features:

- **Query**: Enter your search terms
- **Categories**: Choose from multiple search categories:
  - General
  - Images
  - News
  - Videos
  - Files
  - IT
  - Maps
  - Music
  - Science
  - Social Media

### Additional Options

- **Language**: Filter results by language (English, German, French, Spanish, Italian, or All Languages)
- **Time Range**: Filter results by time (Day, Week, Month, Year, or Any Time)
- **Safe Search**: Set safety level (Off, Moderate, or Strict)
- **Page Number**: Specify which page of results to retrieve
- **Format**: Choose output format (JSON, HTML, or RSS)

## Credentials

To use this node, you need to configure credentials for your SearXNG instance:

1. **API URL**: The URL of your SearXNG instance (e.g., `http://searxng:8080`)
2. **API Key**: Your SearXNG API key (if required by your instance)

## Example Usage

1. Add the SearXNG node to your workflow
2. Configure your SearXNG credentials
3. Set up your search parameters:
   ```json
   {
     "query": "your search terms",
     "categories": ["general"],
     "additionalFields": {
       "language": "en",
       "time_range": "month",
       "safesearch": "1"
     }
   }
   ```

## Compatibility

- Requires Node.js version 18.10 or later but 22.x is recommended

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[Apache 2.0](LICENSE)

## Support

- Create an [issue](https://github.com/sammcj/n8n-nodes-searxng/issues)
- Review the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Author

Sam McLeod

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [SearXNG Documentation](https://docs.searxng.org/)
- [SearXNG API Documentation](https://docs.searxng.org/dev/search_api.html)
