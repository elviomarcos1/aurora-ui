import StyleDictionary from 'style-dictionary';

const buildPath = 'projects/aurora-ui/src/styles/';

const themes = [
  {
    name: 'base',
    source: ['design/tokens/base.json'],
    destination: 'tokens-base.css',
    selector: ':root',
  },
  {
    name: 'light',
    source: ['design/tokens/light.json'],
    destination: 'tokens-light.css',
    selector: ':root',
  },
  {
    name: 'dark',
    source: ['design/tokens/dark.json'],
    destination: 'tokens-dark.css',
    selector: '[data-theme="dark"]',
  },
];

for (const theme of themes) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: theme.source,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath,
        files: [
          {
            destination: theme.destination,
            format: 'css/variables',
            options: { selector: theme.selector },
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();
}
