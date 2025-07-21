#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// CV uploads directory
const cvDir = path.join(process.cwd(), "uploads", "cv");

// Check if there are new CV files to commit
function checkForNewFiles() {
  try {
    // Get git status for uploads/cv directory
    const status = execSync("git status --porcelain uploads/cv/", {
      encoding: "utf8",
    });
    return status
      .trim()
      .split("\n")
      .filter((line) => line && !line.includes(".gitkeep"));
  } catch (error) {
    console.log("No new CV files found");
    return [];
  }
}

// Commit CV files to GitHub
function commitCVFiles() {
  try {
    const newFiles = checkForNewFiles();

    if (newFiles.length === 0) {
      console.log("No new CV files to commit");
      return;
    }

    console.log(`Found ${newFiles.length} new CV file(s) to commit`);

    // Add all files in uploads/cv directory
    execSync("git add uploads/cv/", { stdio: "inherit" });

    // Create commit message with file list
    const fileList = newFiles.map((file) => file.split(" ").pop()).join(", ");
    const commitMessage = `Add CV files: ${fileList}`;

    // Commit files
    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

    // Push to GitHub
    execSync("git push origin main", { stdio: "inherit" });

    console.log("CV files successfully committed to GitHub!");
  } catch (error) {
    console.error("Error committing CV files:", error.message);
  }
}

// Run the script
if (require.main === module) {
  commitCVFiles();
}

module.exports = { commitCVFiles, checkForNewFiles };
