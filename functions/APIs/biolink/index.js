require("dotenv").config();
const { Client } = require("@notionhq/client");

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error("didnt have NOTION_DATABASE_ID and NOTION_SECRET");
}

const notion = new Client({
  auth: notionSecret,
});

const biolink = async (request, response) => {
  console.log("response", response.headers);
  response.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const query = await notion.databases.query({
      database_id: notionDatabaseId,
    });

    const resultFilter = query.results.map((que) => {
      return {
        ...que.properties
      }
    }).filter((prop) => (prop.URL.url !== null));
    
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end(JSON.stringify(resultFilter));
    // response.status(200).json(query.results);
  } catch (error) {
    response.setHeader("Content-Type", "application/json");
    response.writeHead(404);
    response.end(JSON.stringify({ error: "Resource not found" }));
    // response.status(404).json({ error: "Resource not found" });
  }
};

module.exports = { biolink };
