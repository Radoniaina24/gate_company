"use client";
import { useEffect, useState } from "react";
import { Post } from "@/interface/Post";
import ArticleCarousel from "./ArticleCarousel";

function ArticlesSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://gateofafrica.com/wp-json/wp/v2/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des articles :", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative z-10">
      <ArticleCarousel posts={posts} loading={loading} />
    </section>
  );
}

export default ArticlesSection;
