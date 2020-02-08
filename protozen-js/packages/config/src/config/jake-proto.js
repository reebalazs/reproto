// @flow
/* global task, file */

import Debug from 'debug';
import path from 'path';
import fs from 'fs';
import { rpcPath, mkdirp, readDir, exec } from '..';

const info = Debug('protozen:info:jake-proto');
const debug = Debug('protozen:debug:jake-proto');

const rootD = path.resolve(__dirname, '..', '..');
const packageD = path.resolve(rootD, '..');
const serviceD = path.resolve(packageD, 'service');
const protoDistD = path.join(serviceD, 'dist');
const protoSrcD = path.join(packageD, '..', '..', 'protozen-proto');
const protoServicesD = path.join(protoSrcD, 'services');
const protoPublicD = path.join(protoSrcD, 'public');

let protoSources = [];
protoSources = protoSources.concat(fs.readdirSync(protoServicesD)).map(name => path.resolve(protoServicesD, name));
protoSources = protoSources.concat(fs.readdirSync(protoPublicD)).map(name => path.resolve(protoPublicD, name));
const protoJs = path.join(protoDistD, 'proto.js');
const protoDataJson = path.join(protoDistD, 'proto-data.json');
const protoDesc = path.join(protoDistD, 'protozen-proto.desc');
const protoViewerMappings = path.join(protoDistD, 'Viewer Mappings.xml');

async function getProtoFiles(): Promise<Array<string>> {
  const protoFiles = (await readDir(protoServicesD))
    .filter(name => name.endsWith('_service.proto') || name === 'error.proto')
    .map(name => path.join(protoServicesD, name));
  return protoFiles;
}

task('protoc', [protoJs]);
task('protodebug', [protoDesc, protoViewerMappings]);

file(protoJs, protoSources, async () => {
  await mkdirp(protoDistD);
  const protoFiles = await getProtoFiles();
  await exec(
    `cd ${ rootD };
    \`yarn bin pbjs\` \
      -t static-module \
      -o ${ path.join(protoDistD, 'proto.js') } \
      -p ${ protoSrcD } \
      ${ protoFiles.join(' ') }\
    `);
});

file(protoDesc, protoSources, async () => {
  await mkdirp(protoDistD);
  const protoFiles = await getProtoFiles();
  await exec(
    `protoc \
      ${ protoFiles.join(' ') }\
      --include_imports \
      --descriptor_set_out=${ protoDesc } \
      --proto_path=${ protoSrcD } \
     `);
});

file(protoDataJson, protoSources, async () => {
  const protoFiles = await getProtoFiles();
  await exec(
    `cd ${ rootD };
    \`yarn bin pbjs\` \
      -t json \
      -o ${ protoDataJson } \
      -p ${ protoSrcD } \
      ${ protoFiles.join(' ') }\
    `);
});

file(protoViewerMappings, [protoDataJson], async () => {
  const dataString = fs.readFileSync(protoDataJson, 'utf8');
  const data = JSON.parse(dataString);
  const stream = fs.createWriteStream(protoViewerMappings);
  await new Promise(resolve => {
    stream.once('open', function(fd) {
      // Prologue to view mappings
      stream.write(`<?xml version='1.0' encoding='UTF-8' ?>
<?charles serialisation-version='2.0' ?>
<viewerMappings>
  <toolEnabled>true</toolEnabled>
  <mappings>`);
      const services = data.nested.services.nested;
      for (const serviceName in services) {
        const service = services[serviceName];
        const methods = service.methods || {};
        for (const methodName in methods) {
          const method = methods[methodName];
          const { requestType, responseType } = method;
          const path = rpcPath(serviceName, methodName);
          debug('Mapping:', path, requestType, responseType);
          stream.write(`
    <viewerMapping>
      <enabled>true</enabled>
      <location>
        <path>${ path }</path>
      </location>
      <requestType>
        <type>PROTOBUF</type>
        <protobufMessageType>services.${ requestType }</protobufMessageType>
        <json>false</json>
      </requestType>
      <responseType>
        <type>PROTOBUF</type>
        <protobufMessageType>services.${ responseType }</protobufMessageType>
        <json>false</json>
      </responseType>
    </viewerMapping>`);
        }
      }
      stream.write(`
  </mappings>
</viewerMappings>`);
      resolve();
    });
  });
  stream.close();
});
