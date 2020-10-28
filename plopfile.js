module.exports = (plop) => {
  plop.setHelper('openCommentBlock', () => '{{{')

  plop.setGenerator('e2e-test', {
    description: 'E2E test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'E2E test name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'cypress/integration/{{dashCase name}}-spec.js',
        templateFile: 'plop-templates/e2e-test-spec.js',
      },
      {
        type: 'add',
        path: 'testing-e2e/{{dashCase name}}.html',
        templateFile: 'plop-templates/e2e-test-page.html',
      },
      {
        type: 'append',
        path: 'testing-e2e/index.html',
        pattern: '</li>',
        template: '      <li><a href="{{dashCase name}}.html">{{dashCase name}}</a></li>',
      },
    ],
  })
}
