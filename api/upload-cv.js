import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({
      uploadDir: join(process.cwd(), "uploads", "cv"),
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    // Create uploads/cv directory if it doesn't exist
    await mkdir(join(process.cwd(), "uploads", "cv"), { recursive: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
      }

      const file = files.file;
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No file provided",
        });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.originalFilename || "cv";
      const extension = originalName.split(".").pop();
      const fileName = `${timestamp}_${originalName}`;

      // Move file to uploads/cv directory
      const uploadPath = join(process.cwd(), "uploads", "cv", fileName);

      try {
        await writeFile(uploadPath, await readFile(file.filepath));

        // Generate public URL
        const baseUrl =
          process.env.VERCEL_URL || "https://dinero-test-case-aol3.vercel.app";
        const publicUrl = `${baseUrl}/api/cv/${fileName}`;

        res.status(200).json({
          success: true,
          message: "CV uploaded successfully",
          data: {
            fileName: fileName,
            originalName: originalName,
            size: file.size,
            url: publicUrl,
            uploadedAt: new Date().toISOString(),
          },
        });
      } catch (writeError) {
        console.error("File write error:", writeError);
        res.status(500).json({
          success: false,
          message: "Failed to save file",
          error: writeError.message,
        });
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
}
