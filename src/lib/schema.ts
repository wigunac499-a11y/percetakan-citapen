interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  image?: string;
}

export function localBusinessSchema(data: LocalBusinessSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.street,
      addressLocality: data.address.city,
      addressRegion: data.address.region,
      postalCode: data.address.postalCode,
      addressCountry: data.address.country,
    },
    ...(data.geo && {
      geo: { '@type': 'GeoCoordinates', ...data.geo },
    }),
    ...(data.openingHours && {
      openingHoursSpecification: data.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        ...parseHours(h),
      })),
    }),
    ...(data.image && { image: data.image }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function serviceSchema(data: {
  name: string;
  description: string;
  provider: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: { '@type': 'LocalBusiness', name: data.provider },
    url: data.url,
  };
}

export function reviewSchema(data: {
  author: string;
  reviewBody: string;
  ratingValue: number;
  itemReviewed: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: data.author },
    reviewBody: data.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.ratingValue,
      bestRating: 5,
    },
    itemReviewed: { '@type': 'LocalBusiness', name: data.itemReviewed },
  };
}

function parseHours(h: string) {
  const [days, time] = h.split(' ');
  const [open, close] = time.split('-');
  const dayMap: Record<string, string> = {
    Senin: 'Monday',
    Selasa: 'Tuesday',
    Rabu: 'Wednesday',
    Kamis: 'Thursday',
    Jumat: 'Friday',
    Sabtu: 'Saturday',
    Minggu: 'Sunday',
  };
  const dayRange = days.split('-');
  return {
    dayOfWeek: dayRange.map((d) => 'https://schema.org/' + (dayMap[d] || d)),
    opens: open,
    closes: close,
  };
}
