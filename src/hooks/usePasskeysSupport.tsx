import { useEffect, useState } from "react";

// Availability of `window.PublicKeyCredential` means WebAuthn is usable.
// `isUserVerifyingPlatformAuthenticatorAvailable` means the feature detection is usable.
// `​​isConditionalMediationAvailable` means the feature detection is usable.
function checkIsBrowserHasRequiredFeatures(): boolean {
  return (
    "PublicKeyCredential" in window &&
    "isUserVerifyingPlatformAuthenticatorAvailable" in PublicKeyCredential &&
    "isConditionalMediationAvailable" in PublicKeyCredential
  );
}

const usePasskeysSupport = (): boolean => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (checkIsBrowserHasRequiredFeatures()) {
      // Check if user verifying platform authenticator is available.
      Promise.all([
        PublicKeyCredential.isConditionalMediationAvailable(),
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
      ]).then((results) => {
        if (results.every((r) => r === true)) {
          setIsSupported(true);
        }
      });
    }
  }, []);

  return isSupported;
};

export default usePasskeysSupport;
