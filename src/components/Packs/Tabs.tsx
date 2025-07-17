"use client";
import React, { useState } from "react";
import { User, Briefcase } from "lucide-react";
import CandidateComponent from "./Candidate";
import RecruiterComponent from "./Recruiter";

const CandidateRecruiterTabs = () => {
  const [activeTab, setActiveTab] = useState("candidate");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("candidate")}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "candidate"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                <User className="w-5 h-5" />
                Candidat
              </button>
              <button
                onClick={() => setActiveTab("recruiter")}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === "recruiter"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                }`}
              >
                <Briefcase className="w-5 h-5" />
                Recruteur
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "candidate" ? (
            <CandidateComponent />
          ) : (
            <RecruiterComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateRecruiterTabs;
