/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  '6LKOQPFV2J',
  '88d5208f92818ecf50425fe50ac3ccb4'
);

const search = instantsearch({
  indexName: 'iam-actions',
  searchClient,
  routing: true,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.infiniteHits({
    container: '#hits',
    transformItems: items =>
      items.reduce((accumulator, item, index) => {
        const position = Math.min(2, items.length - 1);
        if (index === position) {
          accumulator.push({
            ...item,
          });
          accumulator.push({
            sponsored: true,
            fqn: 'CDK Weekly',
            description:
              'The best news, articles and projects around the AWS Cloud Development Kit (CDK)',
            url: 'https://www.cdkweekly.com/',
            __position: item.__position + 1,
          });
        } else if (index > position) {
          accumulator.push({
            ...item,
            __position: item.__position + 1,
          });
        } else {
          accumulator.push(item);
        }
        return accumulator;
      }, []),
    templates: {
      item: `
<a href="{{ url }}" target="_blank">
    <article class="{{#sponsored}}sponsored{{/sponsored}}">
    {{^sponsored}}
      <h1>{{#helpers.highlight}}{ "attribute": "fqn" }{{/helpers.highlight}}</h1>
      <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
    {{/sponsored}}
    {{#sponsored}}
      <h1>{{ fqn }}</h1>
      <p>{{ description }}</p>
    {{/sponsored}}
  </article>
</a>
`,
    },
  }),
]);

search.start();
