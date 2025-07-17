import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Post } from "@/interface/Post";
import { ArticleCard } from "./PostCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

const ArticleCarousel = ({
  posts,
  loading,
}: {
  posts: Post[];
  loading?: boolean;
}) => {
  return (
    <div className="">
      <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white shadow-lg rounded-full">
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white shadow-lg rounded-full">
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom", // lien avec ta div custom
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-custom-active",
        }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ArticleCardSkeleton />
              </SwiperSlide>
            ))
          : posts.map((post) => (
              <SwiperSlide key={post.id}>
                <ArticleCard post={post} />
              </SwiperSlide>
            ))}
      </Swiper>
      {/* <div className="swiper-pagination-custom my-6 flex justify-center gap-2" /> */}
    </div>
  );
};

export default ArticleCarousel;
