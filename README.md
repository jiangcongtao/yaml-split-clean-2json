# OpenAPI Swagger YAML File Extract, Clean and Convert Tool

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
Usage: index.js -i <inYamlFile> <[-o <outFile>] [--uris <uris>] | -l | -t
--compact>

Options:
      --version  Show version number                                   [boolean]
  -l, --list     List all API URIs in OpenAPI Swagger file specified in "-i
                 <inYamlFile>"
  -t, --tojson   Convert to json file for the OpenAPI Swagger file specified in
                 "-i <inYamlFile>"
      --compact  Convert to json file in compact mode. minified
      --uris     Comma-delimitted Swagger URI endponts to extracts out of input
                 <inYamlFile>
  -h, --help     Show help                                             [boolean]

Copyright (c) 2022, Nick Jiang<congtao.jiang@outlook.com>
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

## MIT License

(The MIT License)

Copyright (c) 2022, Nick Jiang <congtao.jiang@outlook.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
