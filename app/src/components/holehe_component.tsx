import React, { useState } from "react";
import axios from "axios";
import { FaFacebook, FaTiktok, FaTwitter, FaPinterest } from "react-icons/fa";

const OSINTChecker = () => {
  const [email, setEmail] = useState(""); 
  const [results, setResults] = useState({
    email: "",
    websites: [] as string[],
    raw: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    setResults({ email: "", websites: [], raw: "" });
    setLoading(true);

    if (!email) {
      setError("Veuillez saisir une adresse e-mail.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000", { email });
      const { holehe_data} = response.data as { holehe_data: string};

      // Extraction des sites de Holehe
      const emailRegex = /(\S+@\S+\.\S+)/;
      const websitesRegex = /\[\+\]\s*(\S+\.com)/g;

      const emailMatch = holehe_data.match(emailRegex);
      const websitesMatch = [...holehe_data.matchAll(websitesRegex)];

      const emailExtracted = emailMatch ? emailMatch[0] : "Email non trouvé";
      const websitesExtracted = websitesMatch.map((match) => match[1]);

      setResults({
        email: emailExtracted,
        websites: websitesExtracted,
        raw: holehe_data,
      });

    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const username = email.split("@")[0] || "";

  return (
    <div className="min-h-screen bg-gray-100 justify-center items-center p-10">
      <div className="w-full flex space-x-6">
        {/* Partie gauche - Holehe */}
        <div className="w-2/3 bg-white shadow-md rounded-lg p-10">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            OSINT Email Checker
          </h1>
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

          {results.email && (
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
                      <li
                        key={index}
                        className="text-gray-600 bg-white p-2 rounded-md border border-gray-200"
                      >
                        <a
                          href={`https://${site}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {site}
                        </a>
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

        {/* Partie réseau sociaux */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Réseaux sociaux
          </h2>
          {username && (
            <div className="space-y-4">
              <a
                href={`https://www.facebook.com/search/people/?q=${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaFacebook size={30} className="text-blue-600" />
                <span>Facebook</span>
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
                href={`https://x.com/search?q=${username}&src=typed_query&f=user`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaTwitter size={30} className="text-blue-400" />
                <span>Twitter</span>
              </a>
              <a
                href={`https://fr.pinterest.com/search/users/?q=${username}&rs=typed`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaPinterest size={30} className="text-black" />
                <span>Pinterest</span>
              </a>
            </div>
          )}
        </div>

        {/* Résultats Spiderfoot */}
        <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Résultats Spiderfoot
          </h2>
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
            <a
              href={"http://localhost:8080"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Accédez à l'interface SpiderFoot
            </a>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
            <a
              href={"https://osintframework.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              OSINT utils
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSINTChecker;