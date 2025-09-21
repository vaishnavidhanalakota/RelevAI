```python
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import PyPDF2
import docx
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
import openai
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'doc'}

# Initialize OpenAI embeddings
embeddings = OpenAIEmbeddings(openai_api_key="your_openai_api_key")

# Sample job descriptions database
job_descriptions = {
    "software_engineer": {
        "title": "Senior Software Engineer",
        "skills": ["Python", "JavaScript", "React", "AWS", "SQL"],
        "description": "Looking for experienced software engineer with strong backend skills..."
    },
    "product_manager": {
        "title": "Product Manager",
        "skills": ["Product Strategy", "Agile", "JIRA", "Market Research", "SQL"],
        "description": "Seeking product manager with 5+ years experience..."
    }
}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def extract_text_from_file(filepath):
    if filepath.endswith('.pdf'):
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = "\n".join([page.extract_text() for page in reader.pages])
    elif filepath.endswith('.docx'):
        doc = docx.Document(filepath)
        text = "\n".join([para.text for para in doc.paragraphs])
    return text

def calculate_similarity(resume_text, job_description):
    # Split texts into chunks
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_text(resume_text)
    
    # Create embeddings
    doc_embeddings = embeddings.embed_documents(texts)
    job_embedding = embeddings.embed_query(job_description['description'])
    
    # Calculate cosine similarity
    similarities = cosine_similarity([job_embedding], doc_embeddings)
    avg_similarity = np.mean(similarities)
    
    # Calculate hard skill matches
    resume_skills = set([skill.lower() for skill in job_description['skills'] if skill.lower() in resume_text.lower()])
    skill_match = len(resume_skills) / len(job_description['skills'])
    
    # Combined score (70% semantic, 30% hard skills)
    combined_score = 0.7 * avg_similarity + 0.3 * skill_match
    
    return {
        "score": round(combined_score * 100, 1),
        "missing_skills": list(set(job_description['skills']) - resume_skills),
        "present_skills": list(resume_skills)
    }

@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Extract text
        resume_text = extract_text_from_file(filepath)
        
        # Analyze against job descriptions
        results = {}
        for job_id, job_desc in job_descriptions.items():
            results[job_id] = calculate_similarity(resume_text, job_desc)
        
        # Generate AI suggestions
        prompt = f"Based on this resume:\n{resume_text[:2000]}\nAnd these job requirements:\n{job_descriptions['software_engineer']['description']}\nProvide 3 specific suggestions to improve the resume for this job."
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200
        )
        suggestions = response.choices[0].message.content.split("\n")
        
        return jsonify({
            "status": "success",
            "results": results,
            "suggestions": suggestions
        })
    
    return jsonify({"error": "Invalid file type"}), 400

@app.route('/get-job-matches', methods=['GET'])
def get_job_matches():
    # In a real app, this would query a database
    return jsonify({
        "jobs": [
            {
                "id": "job1",
                "title": "Senior Software Engineer",
                "company": "TechCorp Inc.",
                "match_score": 92,
                "location": "San Francisco, CA",
                "salary": "$120,000 - $150,000"
            },
            {
                "id": "job2",
                "title": "Frontend Developer",
                "company": "WebSolutions LLC",
                "match_score": 85,
                "location": "New York, NY",
                "salary": "$90,000 - $110,000"
            }
        ]
    })

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
```