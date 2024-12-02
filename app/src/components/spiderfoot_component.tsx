import React, { useState } from "react";
import axios from "axios";

// Composant pour afficher un aperçu Facebook
const FacebookPreview = ({ facebookUrl }: { facebookUrl: string }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Aperçu Facebook</h2>
      {facebookUrl ? (
        <div className="w-full h-96 overflow-hidden border border-gray-300 rounded-lg">
          <iframe
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
              facebookUrl
            )}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
            width="100%"
            height="100%"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="encrypted-media"
          ></iframe>
        </div>
      ) : (
        <p className="text-gray-600">Aucune page Facebook disponible pour cet email.</p>
      )}
    </div>
  );
};

const HoleheChecker = () => {
  const [email, setEmail] = useState(""); // État pour stocker l'email saisi
  interface Results {
    email: string;
    websites: string[];
    facebookUrl: string; // Ajout de l'URL Facebook
    raw: string;
  }

  const [results, setResults] = useState<Results | null>(null); // État pour stocker les résultats
  const [loading, setLoading] = useState(false); // État pour afficher un indicateur de chargement
  const [error, setError] = useState(""); // État pour gérer les erreurs

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
      const response = await axios.post("http://127.0.0.1:8000", { email });
      const rawData = (response.data as { data: string }).data;

      const emailRegex = /(\S+@\S+\.\S+)/;
      const websitesRegex = /\[\+\]\s*(\S+\.com)/g;

      const emailMatch = rawData.match(emailRegex);
      const websitesMatch = [...rawData.matchAll(websitesRegex)];

      const emailExtracted = emailMatch ? emailMatch[0] : "Email non trouvé";
      const websitesExtracted = websitesMatch.map((match) => match[1]);

      // Simuler l'extraction d'une URL Facebook (à remplacer par une API réelle)
      const facebookUrl =
        "https://www.facebook.com/search/people?q=" + email; // URL d'exemple à remplacer

      setResults({
        email: emailExtracted,
        websites: websitesExtracted,
        facebookUrl,
        raw: rawData,
      });
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start pt-6">
      {/* Colonne gauche */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-4 ml-0">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Holehe Email Checker</h1>
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
        {error && <p className="text-red-500 mt-3">{error}</p>}
        {results && (
          <div className="mt-6">
            <h2 className="text-base font-semibold text-gray-700">
              Résultats pour : {results.email}
            </h2>
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
        )}
      </div>

      {/* Colonne droite */}
      <div className="w-3/4 px-6">
        {results && <FacebookPreview facebookUrl={results.facebookUrl} />}
      </div>
    </div>
  );
};

export default HoleheChecker;
