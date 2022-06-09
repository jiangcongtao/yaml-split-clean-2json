# OpenAPI Swagger YAML File Extract and Clean Tool

Nick Jiang <congtao.jiang@outlook.com>

## Overview

The following features are supported:

- Extract one or more selected API endpoints and used $`ref`s schema definitions
- Clean unused `$ref`s schema definitions, in the following places
  - `YAMLdoc.defintions`
  - `YAMLdoc.responses`
- List all API URIs in Swagger file
- Convert `.yaml` file to `.json`

## Usage

### Get Help

```bash
node index.js -h
```

e.g.

```bash
% node index.js -h
Usage: index.js [--uris <uris>] -i <inYamlFile> [-o <outFile>] -l -t

Options:
      --version  Show version number                                   [boolean]
  -l, --list     List all API URIs in OpenAPI Swagger file specified in "-i
                 <inYamlFile>"
  -t, --tojson   Convert to json file for the OpenAPI Swagger file specified in
                 "-i <inYamlFile>"
      --uris     Comma-delimitted Swagger URI endponts to extracts out of input
                 <inYamlFile>
  -h, --help     Show help                                             [boolean]
```

### Extract APIs

```bash
node index.js -i ./api.yaml --uris '/path/{to}/{endpoint`},/path/{to}/{endpoint`' -o aa.yaml
```

### Clean unused `$ref` schema definitions

```bash
node index.js -i ./api.yaml -o aa.yaml
```

### List all API URIs

```bash
node index.js -i ./api.yaml -l
```

### Convert `.yaml` file to `.json`

It is useful if `jq` tool is used to manipulating OpenAPI swagger definitions, as `jq` is de-facto swiss-knife to manipulate `.json` formatted file.

```bash
node index.js -i ./api.yaml -t -o ./api.json
node index.js -i ./api.yaml -t -o ./api.json --compact

node index.js -i ./api.yaml -t 
node index.js -i ./api.yaml -t --compact
```

