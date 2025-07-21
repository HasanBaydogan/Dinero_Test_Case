export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, client-id, os-id"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { provincesId } = req.body;

    const response = await fetch(
      "https://api.aidath.com/api/v1/global/public/getprovincesordistricts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "client-id": "2",
          "os-id": "2",
        },
        body: JSON.stringify(provincesId ? { provincesId } : {}),
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Provinces API Error:", error);
    res.status(500).json({
      success: false,
      message: "API error occurred",
      error: error.message,
    });
  }
}
