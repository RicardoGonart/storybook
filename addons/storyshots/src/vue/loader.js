import runWithRequireContext from '../require_context';
import hasDependency from '../hasDependency';
import loadConfig from '../config-loader';

function mockVueToIncludeCompiler() {
  jest.mock('vue', () => require.requireActual('vue/dist/vue.common.js'));
}

function test(options) {
  return options.framework === 'vue' || (!options.framework && hasDependency('@storybook/vue'));
}

function load(options) {
  mockVueToIncludeCompiler();

  const { content, contextOpts } = loadConfig({
    configDirPath: options.configPath,
    babelConfigPath: '@storybook/vue/dist/server/babel_config',
  });

  runWithRequireContext(content, contextOpts);

  return {
    framework: 'vue',
    renderTree: require.requireActual('./renderTree').default,
    storybook: require.requireActual('@storybook/vue'),
  };
}

export default {
  load,
  test,
};