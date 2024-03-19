const express = require("express");
const Moralis = require("moralis").default;
const axios = require("axios");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(express.json());

// Route to fetch collection statistics from Magic Eden API
app.get("/collectionStats", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-mainnet.magiceden.dev/collection_stats/search/bitcoin?window=1d&sort=volume&direction=desc&offset=0&limit=100"
    );
    res.header("Access-Control-Allow-Origin", "*"); // Set CORS header
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching collection statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch NFTs using Moralis
app.get("/allNft", async (req, res) => {
  try {
    const { query } = req;
    let NFTs;
    if (query.cursor) {
      NFTs = await Moralis.EvmApi.nft.getContractNFTs({
        address: query.address,
        chain: query.chain,
        cursor: query.cursor,
        limit: 10,
      });
    } else {
      NFTs = await Moralis.EvmApi.nft.getContractNFTs({
        address: query.address,
        chain: query.chain,
        limit: 10,
      });
    }
    const result = NFTs.raw;
    res.header("Access-Control-Allow-Origin", "*"); // Set CORS header
    return res.status(200).json({ result });
  } catch (e) {
    console.error("Error fetching NFTs:", e);
    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMwMDdjZmRjLTgxNzItNGY5Mi1hYmQ3LTBhMDc4ZTIyZjRiMyIsIm9yZ0lkIjoiMzgzMzYyIiwidXNlcklkIjoiMzkzOTA1IiwidHlwZUlkIjoiOGZjNzc0MmItOTdhMy00MGVkLWEzN2MtNGU4OTI5MDU1NGYzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTA3MjI0NzMsImV4cCI6NDg2NjQ4MjQ3M30.XQI_Icd53zy6XatJ9HEmVYmbZvQ5PRW3hHvP88acXjA", 

}).then(() => {
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});


// const express = require("express");
// const Moralis = require("moralis").default;
// const axios = require("axios");
// const app = express();
// const cors = require("cors");
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // Route to fetch collection statistics from Magic Eden API
// app.get("/collectionStats", async (req, res) => {
//   try {
//     const response = await axios.get(
//       "https://api-mainnet.magiceden.dev/collection_stats/search/bitcoin?window=1d&sort=volume&direction=desc&offset=0&limit=100"
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching collection statistics:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Route to fetch NFTs using Moralis
// app.get("/allNft", async (req, res) => {
//   try {
//     const { query } = req;
//     let NFTs;
//     if (query.cursor) {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         cursor: query.cursor,
//         limit: 10,
//       });
//     } else {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         limit: 10,
//       });
//     }
//     const result = NFTs.raw;
//     return res.status(200).json({ result });
//   } catch (e) {
//     console.error("Error fetching NFTs:", e);
//     return res.status(400).json();
//   }
// });

// Moralis.start({
//   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMwMDdjZmRjLTgxNzItNGY5Mi1hYmQ3LTBhMDc4ZTIyZjRiMyIsIm9yZ0lkIjoiMzgzMzYyIiwidXNlcklkIjoiMzkzOTA1IiwidHlwZUlkIjoiOGZjNzc0MmItOTdhMy00MGVkLWEzN2MtNGU4OTI5MDU1NGYzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTA3MjI0NzMsImV4cCI6NDg2NjQ4MjQ3M30.XQI_Icd53zy6XatJ9HEmVYmbZvQ5PRW3hHvP88acXjA",
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`Listening on ${port}`);
//   });
// });


// const express = require("express");
// const Moralis = require("moralis").default;
// const app = express();
// const cors = require("cors");
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// app.get("/allNft", async (req, res) => {
//   try {
//     const { query } = req;

//     let NFTs;

//     if (query.cursor) {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         cursor: query.cursor,
//         limit: 10,
//       });
//     } else {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         limit: 10,
//       });
//     }

//     const result = NFTs.raw;

//     return res.status(200).json({ result });
//   } catch (e) {

//     console.log(e);
//     console.log("something went wrong");
//     return res.status(400).json();

//   }
// });


// Moralis.start({
//   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMwMDdjZmRjLTgxNzItNGY5Mi1hYmQ3LTBhMDc4ZTIyZjRiMyIsIm9yZ0lkIjoiMzgzMzYyIiwidXNlcklkIjoiMzkzOTA1IiwidHlwZUlkIjoiOGZjNzc0MmItOTdhMy00MGVkLWEzN2MtNGU4OTI5MDU1NGYzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTA3MjI0NzMsImV4cCI6NDg2NjQ4MjQ3M30.XQI_Icd53zy6XatJ9HEmVYmbZvQ5PRW3hHvP88acXjA",
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`Listening on ${port}`);
//   });
// });

// second try 
// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const Moralis = require("moralis").default;

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// app.get("/proxy", async (req, res) => {
//   try {
//     const { url } = req.query;
//     const response = await axios.get(url);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error proxying request:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/allNft", async (req, res) => {
//   try {
//     const { query } = req;
//     let NFTs;

//     if (query.cursor) {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         cursor: query.cursor,
//         limit: 10,
//       });
//     } else {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         limit: 10,
//       });
//     }

//     const result = NFTs.raw;

//     return res.status(200).json({ result });
//   } catch (e) {
//     console.error(e);
//     console.error("Something went wrong");
//     return res.status(400).json();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Moralis.start({
//   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMwMDdjZmRjLTgxNzItNGY5Mi1hYmQ3LTBhMDc4ZTIyZjRiMyIsIm9yZ0lkIjoiMzgzMzYyIiwidXNlcklkIjoiMzkzOTA1IiwidHlwZUlkIjoiOGZjNzc0MmItOTdhMy00MGVkLWEzN2MtNGU4OTI5MDU1NGYzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTA3MjI0NzMsImV4cCI6NDg2NjQ4MjQ3M30.XQI_Icd53zy6XatJ9HEmVYmbZvQ5PRW3hHvP88acXjA",
// });


// first try
// const express = require("express");
// const Moralis = require("moralis").default;
// const app = express();
// const cors = require("cors");
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// app.get("/allNft", async (req, res) => {
//   try {
//     const { query } = req;

//     let NFTs;

//     if (query.cursor) {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         cursor: query.cursor,
//         limit: 10,
//       });
//     } else {
//       NFTs = await Moralis.EvmApi.nft.getContractNFTs({
//         address: query.address,
//         chain: query.chain,
//         limit: 10,
//       });
//     }

//     const result = NFTs.raw;

//     return res.status(200).json({ result });
//   } catch (e) {

//     console.log(e);
//     console.log("something went wrong");
//     return res.status(400).json();

//   }
// });


// Moralis.start({
//   apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImMwMDdjZmRjLTgxNzItNGY5Mi1hYmQ3LTBhMDc4ZTIyZjRiMyIsIm9yZ0lkIjoiMzgzMzYyIiwidXNlcklkIjoiMzkzOTA1IiwidHlwZUlkIjoiOGZjNzc0MmItOTdhMy00MGVkLWEzN2MtNGU4OTI5MDU1NGYzIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTA3MjI0NzMsImV4cCI6NDg2NjQ4MjQ3M30.XQI_Icd53zy6XatJ9HEmVYmbZvQ5PRW3hHvP88acXjA",
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`Listening on ${port}`);
//   });
// });