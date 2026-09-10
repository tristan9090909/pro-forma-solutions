import { html } from '../lib/html.mjs';
import { pageHero, section, legalContent } from '../templates/components.mjs';
import { legalPages } from '../data/legal.mjs';
import { site } from '../data/site.mjs';

/** Une page = une section du document « Pages légales », intégrée sans modification. */
export const legalRoutes = legalPages.map((page) => ({
  url: `/${page.slug}/`,
  file: `${page.slug}/index.html`,
  title: page.metaTitle,
  description: page.metaDescription,
  breadcrumb: [{ label: page.title, url: `/${page.slug}/` }],
  build() {
    return html`
      ${pageHero({ eyebrow: 'Informations légales', title: page.title })}
      ${section({ body: legalContent({ ...page, intro: page.intro }) })}
    `;
  },
  jsonLd() {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        url: `${site.baseUrl}/${page.slug}/`,
        name: page.title,
        isPartOf: { '@id': `${site.baseUrl}/#site` },
        publisher: { '@id': `${site.baseUrl}/#organisme` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${site.baseUrl}/` },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.title,
            item: `${site.baseUrl}/${page.slug}/`,
          },
        ],
      },
    ];
  },
}));
