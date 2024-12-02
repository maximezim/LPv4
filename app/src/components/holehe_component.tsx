import React, { useState } from "react";
import axios from "axios";

const HoleheChecker = () => {
  const [email, setEmail] = useState(""); // État pour stocker l'email saisi
  interface Results {
    email: string;
    websites: string[];
    raw: string;
  }

  const [results, setResults] = useState<Results | null>(null); // État pour stocker les résultats
  const [loading, setLoading] = useState(false); // État pour afficher un indicateur de chargement
  const [error, setError] = useState(""); // État pour gérer les erreurs

  // Fonction pour envoyer une requête à l'API
  const handleCheck = async () => {
    setError(""); // Réinitialise les erreurs
    setResults(null); // Réinitialise les résultats
    setLoading(true); // Active l'indicateur de chargement

    if (!email) {
      setError("Veuillez saisir une adresse e-mail.");
      setLoading(false);
      return;
    }

    try {
      // Effectue la requête POST vers l'API
      const response = await axios.post("http://127.0.0.1:8000", { email });
      // Ici nous extrayons les données importantes du texte retourné
      const rawData = (response.data as { data: string }).data;

      // Extraction de l'email et des sites associés avec une regex
      const emailRegex = /(\S+@\S+\.\S+)/; // Pour extraire l'email
      const websitesRegex = /\[\+\]\s*(\S+\.com)/g; // Pour extraire les sites

      const emailMatch = rawData.match(emailRegex);
      const websitesMatch = [...rawData.matchAll(websitesRegex)];

      const emailExtracted = emailMatch ? emailMatch[0] : "Email non trouvé";
      const websitesExtracted = websitesMatch.map((match) => match[1]);

      // Mettre à jour les résultats avec l'email et les sites
      setResults({
        email: emailExtracted,
        websites: websitesExtracted,
        raw: rawData,
      });
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start pt-6 px-6">
      {/* Conteneur principal */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-4 ml-0">
        <h1 className="text-lg font-bold text-gray-800 mb-4">
          Holehe Email Checker
        </h1>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Saisissez une adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleCheck}
          className={`w-full p-2 text-white font-medium rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Recherche en cours..." : "Vérifier"}
        </button>

        {/* Gestion des erreurs */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* Affichage des résultats */}
        {results && (
          <div className="mt-6 space-y-4">
            {/* Affichage de l'email */}
            <div className="p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
              <h3 className="text-base font-semibold text-gray-700">
                Résultats pour : {results.email}
              </h3>
            </div>

            {/* Affichage des sites */}
            {results.websites.length > 0 ? (
              <div className="p-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                <h3 className="text-base font-semibold text-gray-700">
                  Email trouvé sur les sites suivants :
                </h3>
                <ul className="mt-2 space-y-1">
                  {results.websites.map((site, index) => (
                    <li
                      key={index}
                      className="text-gray-600 bg-white p-2 rounded-md border border-gray-200"
                    >
                      {site}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-600 mt-3">
                Aucun site trouvé pour cet email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HoleheChecker;
