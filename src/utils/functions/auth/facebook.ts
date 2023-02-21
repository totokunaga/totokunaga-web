const FB_SCRIPT_ID = "facebookAuth";

export const addFacebookScript = () =>
  new Promise((resolve, reject) => {
    const element = document.getElementById(FB_SCRIPT_ID);
    if (element) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", FB_SCRIPT_ID);
    script.setAttribute("src", "https://connect.facebook.net/en_US/sdk.js");
    script.addEventListener("load", resolve);
    script.addEventListener("error", () =>
      reject(new Error(`Error loading ${FB_SCRIPT_ID}`))
    );
    script.addEventListener("abort", () =>
      reject(new Error(`${FB_SCRIPT_ID} loading aborted`))
    );

    document.getElementsByTagName("head")[0].appendChild(script);
  });

export const facebookScriptLoadedHandler = (FB: any) => {
  const params = {
    appId: "864217824878323",
    cookie: true,
    xfbml: true,
    version: "v16.0",
  };

  try {
    FB.init(params);
  } catch (e: any) {
    console.log(e, "Failed to initialize Facebook SDK");
    throw new Error(e.message);
  }
};

export const onFacebookLogin = () => {
  const params = {
    provider: "facebook",
    fbAccessToken: null,
  };

  FB.getLoginStatus((response: any) => {
    if (response.status === "connected") {
      params.fbAccessToken = response.authResponse.accessToken;

      FB.api("/me", (response: any) => {
        // update cookies
      });
    } else {
      FB.login(
        (response: any) => {
          if (response.authResponse) {
            FB.api("/me", (response: any) => {
              console.log(response);
              console.log("Good to see you,", response.name);
            });
            params.fbAccessToken = response.authResponse.accessToken;
          }
        },
        { scope: "email" }
      );
    }
  });
};
