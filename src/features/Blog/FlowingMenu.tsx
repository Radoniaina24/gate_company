"use client";
import React, { useEffect, useState } from "react";
import "./FlowingMenu.css";
import { Post } from "@/interface/Post";
import Image from "next/image";
import Link from "next/link";

const FlowingMenu = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://gateofafrica.com/wp-json/wp/v2/posts?per_page=9")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        // setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des articles :", err);
        // setLoading(false);
      });
  }, []);

  return (
    <div className="menu-wrap">
      <nav className="menu">
        <MenuItem posts={posts} />
      </nav>
    </div>
  );
};

const MenuItem = ({ posts }: { posts: Post[] }) => {
  // const repeatedMarqueeContent = React.useMemo(() => {
  //   return Array.from({ length: 10 }).map((_, idx) => (
  //     <React.Fragment key={idx}>
  //       <span className="marquee__text text-xs">{text}</span>
  //       <div
  //         className="marquee__img"
  //         style={{ backgroundImage: `url(${image})` }}
  //       />
  //     </React.Fragment>
  //   ));
  // }, [text, image]);

  return (
    <div className="menu__item rounded-2xl bg-white  container mx-auto">
      <div className="marquee__inner " aria-hidden="true">
        {posts.map((post, index) => (
          <div
            key={index}
            className="my-5 px-5 flex items-center gap-1 cursor-pointer"
          >
            {post.blog_post_layout_featured_media_urls.thumbnail[0] ? (
              <Image
                src={post.blog_post_layout_featured_media_urls.thumbnail[0]}
                alt={post.slug}
                className="w-12 h-12 rounded object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                width={150}
                height={150}
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
            ) : (
              ""
            )}
            <Link
              target="_blank"
              href={post.link}
              rel="noopener noreferrer"
              className="text-xs text-gray-900 hover:text-red-700 line-clamp-2"
            >
              {post.title.rendered}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowingMenu;
