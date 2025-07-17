import { Globe, MapPin, Star, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TargetCountries() {
  const t = useTranslations("targetCountries");

  const countries = [
    { name: t("countries.mu"), code: "mu", region: "OI" },
    { name: t("countries.sc"), code: "sc", region: "OI" },
    { name: t("countries.km"), code: "km", region: "OI" },
    {
      name: t("countries.mg"),
      code: "mg",
      region: "OI",
      subtitle: t("subtitle.mg"),
    },
    { name: t("countries.ca"), code: "ca", region: "INT" },
    { name: t("countries.de"), code: "de", region: "INT" },
    { name: t("countries.be"), code: "be", region: "INT" },
  ];
  const oceanIndianCount = countries.filter((c) => c.region === "OI").length;
  const internationalCount = countries.filter((c) => c.region === "INT").length;
  return (
    <section className="py-12 bg-gradient-to-r from-slate-50 via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-8 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-8 w-32 h-32 bg-orange-200/30 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/40 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <span className="text-slate-700 font-semibold text-sm">
              {t("badge")}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-800 to-orange-600 bg-clip-text text-transparent mb-2">
            {t("title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-white/50 hover:border-blue-200"
            >
              <div className="  text-center">
                {/* Flag image */}
                <Image
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  alt={`Drapeau de ${country.name}`}
                  height={50}
                  width={50}
                  className="w-6 h-4 object-cover mx-auto mb-2 rounded-sm shadow"
                />
                <h3 className="font-semibold text-slate-800 text-sm leading-tight group-hover:text-blue-700 transition-colors duration-300">
                  {country.name}
                </h3>
                {country.subtitle && (
                  <p className="text-xs text-slate-500 mt-1 leading-tight">
                    {country.subtitle}
                  </p>
                )}
              </div>

              {/* Hover effect indicator */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${
                  index < 5
                    ? "bg-gradient-to-r from-blue-500 to-blue-600"
                    : "bg-gradient-to-r from-orange-500 to-orange-600"
                } rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              ></div>
            </div>
          ))}
        </div>

        {/* Region indicators */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className="inline-flex items-center space-x-2 bg-blue-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-blue-800 font-medium">
              {t("regions.ocean")}
            </span>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {oceanIndianCount}
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 bg-orange-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span className="text-orange-800 font-medium">
              {" "}
              {t("regions.international")}
            </span>
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {internationalCount}
            </div>
          </div>

          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm border border-white/50">
            <Star className="w-4 h-4 text-slate-600" />
            <span className="text-slate-700 font-medium">
              {t("regions.total")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
