import { Metadata } from 'next';
type SEOProps = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
    locale: string;
    type: string;
  };
};
export function SEO({ title, description, openGraph }: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      ...openGraph,
      title: openGraph.title || title,
      description: openGraph.description || description,
    },
  };
}
