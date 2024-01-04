const express = require("express");

const app = express();
const cors = require("cors");
const port = 8000;
app.use(cors());
async function handleAuthTwitter(req, res) {
  try {
    const code = req?.query?.code;
    const state = req?.query?.state; //state is optional of ["SIGNIN","SIGNUP"]
    console.log("client calleddd", code, state);
    const details = new URLSearchParams({
      code: code,
      grant_type: `authorization_code`, //static
      client_id: "UjZfREtGZlVIelpvS1NrbVhrRkY6MTpjaQ", // client_id config in twitter develop
      redirect_uri: "http://localhost:3000/auth/callback/twitter", // redirecturl config in twitter develop
      code_verifier: "challenge", //static
    });

    await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      body: details,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic VWpaZlJFdEdabFZJZWxwdlMxTnJiVmhyUmtZNk1UcGphUToyY0JrT01qaHF5bmU1ZVdXMTVPOUhYQkRYSGk5Y0kxOFQ0MUJVSWJHOEU5bXV4ODdUSg==", // client_id:Client_Secret base64 encode
      },
    })
      .then((data) => {
        return data?.json();
      })
      .then(async (data) => {
        console.log(data);
        if (data?.access_token) {
          await fetch(
            "https://api.twitter.com/2/users/me?user.fields=created_at,description,entities,id,location,most_recent_tweet_id,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,verified_type,withheld",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            }
          )
            .then((data) => data.json())
            .then((data) => {
              return res.status(200).send({ data: data });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log("error:", e);
  }
}
app.get("/api/auth/twitter", handleAuthTwitter);

app.get("/", (req, res) => {
  res.status(200).send("Hi, from server");
});

app.listen(port, () => {
  console.log("listening on port 8000");
});
