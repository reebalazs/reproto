// @flow
/* global task, file */

import Debug from "debug";
import path from "path";
import fs from "fs";
import { mkdirp, exec } from "..";
import {
  genTypes,
  genProto,
  genProtoData,
} from "@protozen/service/src/config/gen-types";

const info = Debug("protozen:info:jake-proto");
const debug = Debug("protozen:debug:jake-proto");

const rootD = path.resolve(__dirname, "..", "..");
const packageD = path.resolve(rootD, "..");
const serviceD = path.resolve(packageD, "service");
const protoDistD = path.join(serviceD, "dist");
const protoSrcD = path.join(packageD, "..", "..", "protozen-proto");
const protoServicesD = path.join(protoSrcD, "services");
const protoPublicD = path.join(protoSrcD, "public");
const protoPythonD = path.resolve(
  packageD,
  "..",
  "..",
  "demo-server",
  "python"
);

let protoSources = [];
protoSources = protoSources
  .concat(fs.readdirSync(protoServicesD))
  .map((name) => path.resolve(protoServicesD, name));
protoSources = protoSources
  .concat(fs.readdirSync(protoPublicD))
  .map((name) => path.resolve(protoPublicD, name));
const protoJs = path.join(protoDistD, "proto.js");
const protoRes = path.join(protoDistD, "Proto.res");
const protoDesc = path.join(protoDistD, "protozen-proto.desc");
const protoViewerMappings = path.join(protoDistD, "Viewer Mappings.xml");
const mapSourceToPy = (name) =>
  path.join(protoPythonD, path.basename(name.replace(/\.proto$/, "_pb2.py")));
const protoPyFiles = protoSources.map(mapSourceToPy);

// protoc target is run on install. do _not_ include targets that require the protoc binary.
// TBD change this eventually to make it consistent
task("protoc", ["proto"]);
task("proto", ["protojs", "protores"]);

task("protodebug", [protoDesc, protoViewerMappings]);

task("protojs", [protoJs]);
file(protoJs, protoSources, async () => {
  await mkdirp(protoDistD);
  await genProto(protoSources, [protoSrcD], protoJs);
});

task("protores", [protoRes]);
file(protoRes, protoSources, async () => {
  await mkdirp(protoDistD);
  await genTypes(protoSources, [protoSrcD], protoJs, protoRes);
});

task("protopy", protoPyFiles);
for (const protoFile of protoSources) {
  const protoPy = mapSourceToPy(protoFile);
  file(protoPy, protoFile, async () => {
    await exec(
      `cd ${rootD};
      protoc \
         -I${protoDistD} \
         -I${protoServicesD} \
         -I${protoPublicD} \
         --python_out=${protoPythonD} \
          ${protoFile} \
      `
    );
  });
}

file(protoDesc, protoSources, async () => {
  await mkdirp(protoDistD);
  await exec(
    `protoc \
      ${protoSources.join(" ")}\
      --include_imports \
      --descriptor_set_out=${protoDesc} \
      --proto_path=${protoSrcD} \
     `
  );
});

file(protoViewerMappings, protoSources, async () => {
  const data = await genProtoData(protoSources, [protoSrcD]);
  const stream = fs.createWriteStream(protoViewerMappings);
  await new Promise((resolve) => {
    stream.once("open", function (fd) {
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
          const path = `/api/1.0/${serviceName}/${methodName}`;
          debug("Mapping:", path, requestType, responseType);
          stream.write(`
    <viewerMapping>
      <enabled>true</enabled>
      <location>
        <path>${path}</path>
      </location>
      <requestType>
        <type>PROTOBUF</type>
        <protobufMessageType>services.${requestType}</protobufMessageType>
        <json>false</json>
      </requestType>
      <responseType>
        <type>PROTOBUF</type>
        <protobufMessageType>services.${responseType}</protobufMessageType>
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
