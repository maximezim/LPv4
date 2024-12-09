import React, { useState } from "react";
import axios from "axios";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const OSINTChecker = () => {
  const [email, setEmail] = useState(""); 
  const [results, setResults] = useState<{
    email: string;
    websites: string[];
    raw: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [spiderfootResults, setSpiderfootResults] = useState<string[]>([]);

  const handleCheck = async () => {
    setError("");
    setResults(null);
    setLoading(true);

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

      setResults({
        email: emailExtracted,
        websites: websitesExtracted,
        raw: rawData,
      });

      setSpiderfootResults(["Exemple de fuite 1", "Exemple de fuite 2"]);
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const username = email.split('@')[0] || "";

  return (
    <div className="min-h-screen bg-gray-100 justify-center items-center p-10">
      <div className="w-full max-w-4xl flex space-x-6">
        {/* Partie gauche */}
        <div className="w-2/3 bg-white shadow-md rounded-lg p-10">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">OSINT Email Checker</h1>
          <input
            type="email"
            placeholder="Saisissez une adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={handleCheck}
            className={`w-full p-3 text-white font-medium rounded-md ${
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
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                <h3 className="text-base font-semibold text-gray-700">
                  Résultats pour : {results.email}
                </h3>
              </div>

              {results.websites.length > 0 ? (
                <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                  <h3 className="text-base font-semibold text-gray-700">
                    Email trouvé sur les sites suivants :
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {results.websites.map((site, index) => (
                      <li key={index} className="text-gray-600 bg-white p-2 rounded-md border border-gray-200">
                        {site}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-600 mt-3">Aucun site trouvé pour cet email.</p>
              )}
            </div>
          )}
        </div>

        {/* Partie centre réseau sociaux */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Réseaux sociaux</h2>
          {username && (
            <div className="space-y-4">
              <a
                href={`https://www.facebook.com/public/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaFacebook size={30} className="text-blue-600" />
                <span>Facebook</span>
              </a>
              <a
                href={`https://www.instagram.com/search/user?q=${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaInstagram size={30} className="text-pink-600" />
                <span>Instagram</span>
              </a>
              <a
                href={`https://www.tiktok.com/search/user?q=${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaTiktok size={30} className="text-black" />
                <span>TikTok</span>
              </a>
              <a
                href={`https://twitter.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaTwitter size={30} className="text-blue-400" />
                <span>Twitter</span>
              </a>
            </div>
          )}
        </div>
        {/* Partie droite - Résultats Spiderfoot */}
        <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Résultats Spiderfoot</h2>
          {spiderfootResults.length > 0 ? (
            <ul className="space-y-3">
              {spiderfootResults.map((result, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-3 rounded-md border border-gray-300 shadow-sm"
                >
                  {result}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun résultat trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OSINTChecker;
