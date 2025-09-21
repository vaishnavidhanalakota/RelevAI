import { useEffect, useState } from "react";

interface Resume {
  id: number;
  name: string;
  score: number;
}

interface JobMatch {
  title: string;
  company: string;
  location: string;
  salary: string;
  match: number;
  posted: string;
}

function App() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchResumes = async () => {
    const res = await fetch("http://localhost:5000/api/resume/list");
    setResumes(await res.json());
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    formData.append("resume", e.target.files[0]);

    setLoading(true);
    const res = await fetch("http://localhost:5000/api/resume/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setLoading(false);

    setResumes((prev) => [...prev, { id: prev.length + 1, name: data.resumeName, score: data.score }]);
    setJobMatches(data.jobMatches);
  };

  const handleImprove = async () => {
    const res = await fetch("http://localhost:5000/api/resume/improve", {
      method: "POST",
    });
    const data = await res.json();
    alert("Resume Tips:\n" + data.tips.join("\n"));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📊 RelevAI Dashboard</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-bold text-xl mb-2">Your Resumes</h2>
        <input type="file" className="mb-4" onChange={handleUpload} />
        {loading && <p className="text-blue-500">Analyzing resume...</p>}
        <ul className="space-y-2">
          {resumes.map((resume) => (
            <li key={resume.id} className="p-3 border rounded-lg bg-gray-50 flex justify-between">
              <span>{resume.name}</span>
              <span className="font-bold">{resume.score}% Match</span>
            </li>
          ))}
        </ul>
      </div>

      {jobMatches.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold text-xl mb-2">Recommended Job Matches</h2>
          <ul className="space-y-3">
            {jobMatches.map((job, i) => (
              <li key={i} className="p-3 border rounded-lg bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-semibold">{job.title} – {job.company}</span>
                  <span className="text-green-600 font-bold">{job.match}% Match</span>
                </div>
                <p className="text-sm text-gray-600">{job.location} | {job.salary} | {job.posted}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleImprove}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        💡 Improve Resume
      </button>
    </div>
  );
}

export default App;
