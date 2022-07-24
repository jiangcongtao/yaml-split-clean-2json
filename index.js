'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const { exit } = require('process');
const { processDocForUris } = require('./yaml-processor');
const chalk = require('chalk');
const { JSONPath } = require('jsonpath-plus');
const { testMatch } = require('./utils');
let log = console.log;

let argv = require('yargs')
  .usage(
    'Usage: $0 -i <inYamlFile> <[-o <outFile>] [--uris <uris>] | -l | -t --compact>'
  )
  .describe(
    'l',
    'List all API URIs in OpenAPI Swagger file specified in "-i <inYamlFile>"'
  )
  .describe(
    't',
    'Convert to json file for the OpenAPI Swagger file specified in "-i <inYamlFile>"'
  )
  .describe('compact', 'Convert to json file in compact mode. minified')
  .describe(
    'uris',
    'Comma-delimitted Swagger URI endponts to extracts out of input <inYamlFile>'
  )
  .help('h')
  .alias('h', 'help')
  .alias('l', 'list')
  .alias('t', 'tojson')
  .epilog('Copyright (c) 2022, Nick Jiang<congtao.jiang@outlook.com>').argv;

// console.log({ argv });
let {
  i: inYamlFile,
  o: outFile,
  uris: urisString,
  l: showURIs,
  t: tojson,
  compact,
} = argv;
// let uris = ['/guests/{guestId}', '/guests/{guestId}/tvldocs'];

if (!inYamlFile) {
  log(chalk.red(`-i <inYamlFile> is missing!`));
  exit(-1);
}

let uris;
if (urisString) {
  uris = urisString
    .split(',')
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

// let uris = ['/guests'];

try {
  let fileContents = fs.readFileSync(inYamlFile, 'utf8');
  let data = yaml.loadAll(fileContents);
  let doc = data[0];

  // show URIs in .yaml file
  if (showURIs) {
    let apis = Object.getOwnPropertyNames(doc.paths).sort();
    if (uris) {
      apis = apis.filter((api) => testMatch(uris, api));
    }

    log(apis);
    exit(0);
  }
  // convert .yaml to .json
  if (tojson) {
    let jsonStr;
    if (compact) {
      jsonStr = JSON.stringify(doc);
    } else {
      jsonStr = JSON.stringify(doc, null, 2);
    }
    if (outFile) {
      fs.writeFileSync(outFile, `${jsonStr}`, 'utf8');
      log(chalk.green(`Done writing to ${outFile}!`));
    } else {
      log(jsonStr);
    }

    exit(0);
  }

  // extract and clean .yaml file
  if (!uris) {
    // collect all uris, meaning that unused $ref defintions and responses schema
    // will be cleaned up
    uris = Object.getOwnPropertyNames(doc.paths);
  }

  // log(uris)
  processDocForUris(uris, doc);

  let yamlStr = yaml.dump(doc, {
    forceQuotes: false,
    sortKeys: false,
    quotingType: '"',
  });
  if (outFile) {
    fs.writeFileSync(outFile, `---\n${yamlStr}`, 'utf8');
    log(chalk.green(`Done writing to ${outFile}!`));
  } else {
    log(yamlStr);
  }
} catch (e) {
  console.log(e);
}
