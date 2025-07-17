import { ArrowRight } from "lucide-react";

import Image from "next/image";
import { Post } from "@/interface/Post";
/* eslint-disable */
export function ArticleCard({ post }: { post: Post }) {
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.warn("Format de date invalide:", dateString);
      return dateString;
    }
  };

  return (
    <article
      className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden  transition-all duration-300 group shadow-xl hover:shadow-2xl"
      role="article"
      aria-labelledby={`article-title-${post?.title?.rendered
        .replace(/\s+/g, "-")
        .toLowerCase()}`}
    >
      {/* En-tête avec image ou gradient */}
      <header className="relative">
        <div
          className={`aspect-[5/2] relative overflow-hidden ${
            !post.blog_post_layout_featured_media_urls.full
              ? `bg-gradient-to-br `
              : ""
          }`}
        >
          {post.blog_post_layout_featured_media_urls.full ? (
            <>
              <Image
                src={post.blog_post_layout_featured_media_urls.full[0]}
                alt={post.blog_post_layout_featured_media_urls.full[0]}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                width={400}
                height={160}
                onError={(e) => {
                  // Fallback vers le gradient si l'image ne charge pas
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add(`bg-gradient-to-br`, "");
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-black/30" />
          )}

          {/* Badge catégorie */}
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className={`bg-red-500 text-white px-2 py-1 rounded-full text-xs  lowercase font-medium shadow-lg backdrop-blur-sm`}
              role="badge"
            >
              {Object.values(post.categories_names).map((cat, index) => (
                <span key={index}>{cat.name}</span>
              ))}
            </span>
          </div>
        </div>
      </header>

      {/* Contenu de l'article */}
      <div className="p-4">
        {/* Métadonnées */}
        <div
          className="flex items-center text-gray-400 text-xs mb-2"
          role="group"
          aria-label="Métadonnées de l'article"
        >
          <time dateTime={post.date} className="flex items-center">
            {formatDate(post.date)}
          </time>
          <span className="mx-2" aria-hidden="true">
            •
          </span>
        </div>

        {/* Titre */}
        <h3
          id={`article-title-${post?.title?.rendered
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          className="text-base font-bold text-white mb-2 group-hover:text-red-300 transition-colors duration-200 leading-tight"
        >
          {post.title.rendered}
        </h3>

        {/* Extrait */}

        <div
          className="text-gray-300 text-xs leading-relaxed mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Lien de lecture */}
        <a
          href={post.link}
          target="_blanck"
          className="inline-flex items-center text-red-400 hover:text-red-300 text-xs font-medium transition-colors duration-200 group/link"
          aria-label={`Lire l'article complet: ${post.title.rendered}`}
        >
          <span>Lire la suite</span>
          <ArrowRight
            className="ml-1 w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}
