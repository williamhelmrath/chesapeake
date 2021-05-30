import express from "express";
import cors from "cors";
// import querystring from "query-string";
import path from "path";
import fetch from "isomorphic-fetch";

require("dotenv").config();

// const client_id = process.env.SPOTIFY_CLIENT_ID;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
// const redirect_uri = process.env.REDIRECT_URI;
const encoded_auth = process.env.ENCODED_AUTH;

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

app.use(express.json());
app.use(cors({ origin: true }));

// app.get("/", async (req: express.Request, res: express.Response) => {
//   res.send("Hello");
// });

// app.get("/login", (req, res) => {
//   const url = "https://accounts.spotify.com/authorize";

//   const query = {
//     response_type: "code",
//     client_id,
//     redirect_uri,
//   };

//   const requestUrl = querystring.stringifyUrl({ url, query });

//   res.redirect(requestUrl);
// });

// app.get("/callback", async (req, res) => {
//   console.log(req.query);
//   const { code, error } = req.query;

//   if (error) {
//     res.send("user denied access");
//   } else {
//     let resp = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: JSON.stringify({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri,
//         client_id,
//         client_secret,
//       }),
//     });
//     console.log(resp);
//     res.sendStatus(200);
//   }
// });

app.get("/authenticate", async (req, res) => {
  let resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encoded_auth}`,
    },
    body: "grant_type=client_credentials",
  }).then((res) => res.json());

  const { access_token } = resp;

  res.send(access_token);
});

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
