import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: "Filename is required" });
  }

  try {
    const filePath = join(process.cwd(), "uploads", "cv", filename);

    // Check if file exists
    if (!existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Read file
    const fileBuffer = await readFile(filePath);

    // Set appropriate headers
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

    // Send file
    res.status(200).send(fileBuffer);
  } catch (error) {
    console.error("File serve error:", error);
    res.status(500).json({ error: "Failed to serve file" });
  }
}
