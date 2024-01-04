import Image from "next/image";

const TWITTER_CLIENT_ID = "UjZfREtGZlVIelpvS1NrbVhrRkY6MTpjaQ"; // give your twitter client id here

// twitter oauth Url constructor
function getTwitterOauthUrl() {
  const rootUrl = "https://twitter.com/i/oauth2/authorize";
  const options = {
    redirect_uri: "http://localhost:3000/auth/callback/twitter", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    client_id: TWITTER_CLIENT_ID,
    state: "cloutlogin",
    response_type: "code",
    code_challenge: "challenge",
    code_challenge_method: "plain",
    scope: ["users.read", "tweet.read", "follows.read"].join(" "),
  };
  const qs = new URLSearchParams(options).toString();
  const url = `${rootUrl}?${qs}`;
  const width = 450;
  const height = 730;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const newWindow = window.open(
    url,
    "Twitter Auth",
    `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
  );

  newWindow?.focus();
}

// the component
export function TwitterOauthButton() {
  return (
    <button className="a-button row-container" onClick={getTwitterOauthUrl}>
      <p>{" twitter"}</p>
    </button>
  );
}
