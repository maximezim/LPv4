import { useEffect } from "react";

declare global {
    interface Window {
        FB: any;
    }
}

interface PageLogs {
    site: string;
}


export const Page_Log = ({ site }: PageLogs ) => {
    
    useEffect(() => {
        console.log(site);
        // Charger le SDK Facebook
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0';
        document.body.appendChild(script);
    
        // Initialiser le plugin Facebook après le chargement du SDK
        script.onload = () => {
          if (window.FB) {
            window.FB.XFBML.parse();
          }
        };
      }, []);
      
    return (
        <div style={{ width: '100%', height: '70vh' }}>
            <div id="fb-root"></div>
                <div
                    className="fb-page"
                    data-href="https://www.facebook.com/"
                    data-tabs="timeline"
                    data-width="500"
                    data-height="600"
                    data-small-header="false"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="true"
                >

            </div>
        </div>
    )
}