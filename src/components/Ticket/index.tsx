"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  Shield,
  Star,
} from "lucide-react";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface FormData {
  ticketType: string;
  quantity: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const TicketPurchaseSection: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string>("standard");
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    ticketType: "standard",
    quantity: 1,
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const ticketTypes: TicketType[] = [
    {
      id: "standard",
      name: "Ticket d'entrée",
      price: 35000,
      description: "Accès complet à l'événement",
      features: [
        "Entrée complète",
        "Kit de bienvenue",
        "Certificat de participation",
        "Support client",
      ],
      popular: true,
    },
  ];

  const handleTicketChange = (ticketId: string) => {
    setSelectedTicket(ticketId);
    setFormData((prev) => ({
      ...prev,
      ticketType: ticketId,
    }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      setFormData((prev) => ({
        ...prev,
        quantity: newQuantity,
      }));
    }
  };

  const selectedTicketData = ticketTypes.find(
    (ticket) => ticket.id === selectedTicket
  );
  const totalPrice = selectedTicketData
    ? selectedTicketData.price * quantity
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);
    alert("Commande soumise avec succès! Redirection vers le paiement...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-orange-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4 animate-pulse">
            <div className="text-white text-2xl">🎉</div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
              ÉVÉNEMENT
            </span>
            <br />
            <span className="text-white">EXCEPTIONNEL</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium">
            ✨ Une expérience unique vous attend • Places très limitées ✨
          </p>
          <div className="mt-6 inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg animate-bounce">
            🔥 SEULEMENT 245 PLACES DISPONIBLES 🔥
          </div>
        </div>

        {/* Event Info */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200">Date</p>
                <p className="font-bold text-white text-lg">
                  22 et 23 Août 2025
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200">Heure</p>
                <p className="font-bold text-white text-lg">09:00 - 18:00</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200">Lieu</p>
                <p className="font-bold text-white text-lg">Hôtel Carlton</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg animate-pulse">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200">Places</p>
                <p className="font-bold text-red-300 text-lg">245 restantes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ticket Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6 border-2 border-orange-200">
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
                  🎯 OFFRE SPÉCIALE 🎯
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">
                  Réservez votre place maintenant !
                </h2>
                <p className="text-gray-600">
                  Ne manquez pas cette opportunité unique
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {ticketTypes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`relative border-4 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                      selectedTicket === ticket.id
                        ? "border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 shadow-2xl scale-105"
                        : "border-gray-200 hover:border-orange-300 bg-white"
                    }`}
                    onClick={() => handleTicketChange(ticket.id)}
                  >
                    {ticket.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg animate-pulse">
                          <Star className="h-4 w-4 mr-1" />
                          🔥 POPULAIRE 🔥
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="text-2xl font-black text-gray-900 mb-3">
                        {ticket.name}
                      </h3>
                      <div className="text-5xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                        {ticket.price.toLocaleString()}Ar
                      </div>
                      <p className="text-gray-700 text-lg font-medium mb-6">
                        {ticket.description}
                      </p>

                      <ul className="space-y-3">
                        {ticket.features.map((feature, index) => (
                          <li
                            key={index}
                            className="text-base text-gray-800 flex items-center font-medium"
                          >
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-3 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border-2 border-orange-200">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-gray-900">
                    Nombre de tickets
                  </span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-3xl font-black text-gray-900 w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sticky top-6 border-2 border-orange-200">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm mb-3">
                  💰 RÉCAPITULATIF 💰
                </div>
                <h2 className="text-2xl font-black text-gray-900">
                  Votre commande
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedTicketData?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantité: {quantity}
                    </p>
                  </div>
                  <p className="font-bold text-gray-900">
                    {selectedTicketData?.price.toLocaleString()}Ar
                  </p>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <p className="text-gray-700">Sous-total</p>
                  <p className="font-medium text-gray-900">
                    {totalPrice.toLocaleString()}Ar
                  </p>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <p className="text-gray-700">Frais de service</p>
                  <p className="font-medium text-gray-900">2.000Ar</p>
                </div>

                <div className="flex justify-between items-center py-3">
                  <p className="text-xl font-bold text-gray-900">Total</p>
                  <p className="text-xl font-bold text-blue-600">
                    {(totalPrice + 2000).toLocaleString()}Ar
                  </p>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white font-black py-6 px-8 rounded-2xl hover:from-orange-600 hover:via-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 mb-6 text-xl"
              >
                <CreditCard className="h-6 w-6" />
                <span>🔥 RÉSERVER MAINTENANT 🔥</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-4">
                <Shield className="h-4 w-4" />
                <span>🔒 Paiement 100% sécurisé</span>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border-2 border-orange-200">
                <div className="text-center">
                  <div className="text-red-600 font-bold text-lg mb-1">
                    ⚡ OFFRE LIMITÉE ⚡
                  </div>
                  <div className="text-sm text-gray-700">
                    Places limitées - Réservez maintenant !
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseSection;
