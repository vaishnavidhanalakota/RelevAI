import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("✅ RelevAI backend running!");
});

app.post("/api/resume/upload", upload.single("resume"), (req, res) => {
  res.json({
    status: "success",
    results: {
      software_engineer: {
        score: 87,
        missing_skills: ["React.js", "AWS", "SQL"],
        present_skills: ["JavaScript", "Python"]
      },
      product_manager: {
        score: 65,
        missing_skills: ["Agile", "JIRA"],
        present_skills: ["Product Strategy", "Market Research"]
      }
    },
    suggestions: [
      "Add measurable metrics to your experience section",
      "Include AWS projects to improve JD match",
      "Add SQL keywords to boost relevance"
    ]
  });
});

app.get("/api/resume/list", (_, res) => {
  res.json([
    { id: 1, name: "Software Engineer Resume", score: 87 },
    { id: 2, name: "Product Manager Resume", score: 65 }
  ]);
});

app.get("/get-job-matches", (_, res) => {
  res.json({
    jobs: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        match_score: 92,
        location: "San Francisco, CA",
        salary: "$120,000 - $150,000"
      },
      {
        title: "Frontend Developer",
        company: "WebSolutions LLC",
        match_score: 85,
        location: "New York, NY",
        salary: "$90,000 - $110,000"
      }
    ]
  });
});

app.post("/api/resume/improve", (req, res) => {
  res.json({
    tips: [
      "Add measurable metrics to your experience section",
      "Include AWS projects to improve JD match",
      "Add SQL keywords to boost relevance"
    ]
  });
});

app.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
