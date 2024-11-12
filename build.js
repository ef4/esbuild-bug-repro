import * as esbuild from "esbuild";

let envPlugin = {
  name: "bug-demo",
  setup(build) {
    build.onResolve(
      { filter: /./ },
      ({ path, importer, namespace, resolveDir, pluginData, kind }) => {
        if (pluginData?.recursionGuard) {
          return null;
        }
        return build.resolve(path, {
          namespace,
          resolveDir,
          importer,
          kind,
          pluginData: { ...pluginData, recursionGuard: true },
        });
      }
    );
  },
};

await esbuild.build({
  entryPoints: ["demo.js"],
  bundle: true,
  outfile: "out.js",
  plugins: [envPlugin],
});
