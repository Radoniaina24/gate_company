export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    pagelayer_contact_templates: unknown[];
    _pagelayer_content: string;
    _monsterinsights_skip_tracking: boolean;
    _monsterinsights_sitenote_active: boolean;
    _monsterinsights_sitenote_note: string;
    _monsterinsights_sitenote_category: number;
    _uf_show_specific_survey: number;
    _uf_disable_surveys: boolean;
    footnotes: string;
  };
  categories: number[];
  tags: number[];
  class_list: string[];
  aioseo_notices: unknown[];
  blog_post_layout_featured_media_urls: MediaUrls;
  categories_names: Record<
    string,
    {
      name: string;
      link: string;
    }
  >;
  tags_names: string[];
  comments_number: string;
  wpmagazine_modules_lite_featured_media_urls: Record<string, MediaItem>;
  _links: Links;
}

interface MediaUrls {
  thumbnail: MediaItem;
  full: MediaItem;
}

type MediaItem = [string, number, number, boolean];

interface Links {
  self: Link[];
  collection: Link[];
  about: Link[];
  author: LinkWithEmbeddable[];
  replies: LinkWithEmbeddable[];
  "version-history": VersionHistory[];
  "predecessor-version": PredecessorVersion[];
  "wp:featuredmedia": LinkWithEmbeddable[];
  "wp:attachment": Link[];
  "wp:term": TermLink[];
  curies: Cury[];
}

interface Link {
  href: string;
}

interface LinkWithEmbeddable extends Link {
  embeddable: boolean;
}

interface VersionHistory extends Link {
  count: number;
}

interface PredecessorVersion extends Link {
  id: number;
}

interface TermLink extends LinkWithEmbeddable {
  taxonomy: string;
}

interface Cury {
  name: string;
  href: string;
  templated: boolean;
}
