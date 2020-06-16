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
    templates: {
      item: `
<a href="{{ url }}" target="_blank">
  <article>
    <h1>{{#helpers.highlight}}{ "attribute": "fqn" }{{/helpers.highlight}}</h1>
    <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
  </article>
</a>
`,
    },
  }),
]);

search.start();
