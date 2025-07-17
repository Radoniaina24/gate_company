export default function ArticleCardSkeleton() {
  return (
    <article className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-xl animate-pulse">
      {/* Image simulée */}
      <header className="relative">
        <div className="aspect-[5/2] relative bg-gradient-to-br from-gray-700/20 to-gray-600/20">
          {/* Badge simulé */}
          <div className="absolute bottom-3 left-3 w-20 h-5 bg-gray-500/30 rounded-full" />
        </div>
      </header>

      {/* Contenu simulé */}
      <div className="p-4">
        {/* Métadonnées */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-20 h-3 bg-gray-500/30 rounded" />
          <div className="w-1 h-1 bg-gray-500/30 rounded-full" />
        </div>

        {/* Titre */}
        <div className="w-3/4 h-4 bg-gray-400/30 rounded mb-2" />

        {/* Extrait */}
        <div className="space-y-1 mb-3">
          <div className="w-full h-3 bg-gray-400/20 rounded" />
          <div className="w-5/6 h-3 bg-gray-400/20 rounded" />
        </div>

        {/* Bouton "Lire la suite" */}
        <div className="w-24 h-3 bg-red-500/20 rounded" />
      </div>
    </article>
  );
}
