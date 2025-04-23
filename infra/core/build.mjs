import esbuild from 'esbuild'

await esbuild.build({
    entryPoints: ['./lib/data/appsync/Resolvers/**/*.ts'],
    outdir: './lib/data/appsync/Resolvers/JS_RESOLVERS', sourcemap: 'inline',
    sourcesContent: false,
    format: 'esm',
    target: 'esnext',
    platform: 'node',
    external: ['@aws-appsync/utils'],
	bundle: true,
})