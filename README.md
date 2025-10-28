# 📘 PDF Study Assistant (AI-Powered)

An **AI-integrated solution** that helps students and professionals **study smarter** by transforming PDF documents into interactive **study questions** and **mind maps** — powered by Google Gemini API.

---

## 🚀 Features

✅ Upload any PDF file and extract its text instantly.  
✅ Generate **study questions (Q&A) and mind map** with AI.  
✅ Create **visual mind maps** dynamically using D3.js.  
✅ Responsive, modern frontend with beautiful card layout.  
✅ Backend built with **Node.js + Express.js**.  
✅ AI integration powered by **@google/genai (Gemini)**.  
✅ PDF parsing via **pdf.js-extract**.  
✅ Ready for **Dockerized deployment**.

---

## 🧩 Tech Stack

**Frontend:** HTML, CSS, JavaScript, D3.js  
**Backend:** Node.js, Express.js  
**AI Engine:** Google Gemini API (@google/genai)  
**PDF Parser:** pdf.js-extract  
**Containerization:** Docker, Docker Compose

---

## ⚙️ Setup (Local Development)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/pdf-ai.git
cd pdf-ai
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

```bash
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4️⃣ Run the app

```bash
npm run dev
```

Visit **http://localhost:5000**

---

## 🐳 Docker Setup

### 🧱 Development Mode

```bash
docker-compose up --build
```

This runs the app with **live reload** using `nodemon`.  
Your local code updates will reflect instantly inside the container.

### 🌐 Production Mode

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

Runs the container in **optimized production mode** using `node server.js`.

---

## 📂 Folder Structure

```
pdf-ai/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.prod.yml
├── package.json
├── server.js
├── routes/
├── utils/
├── config/
├── public/
└── .env
```

---

## 🔍 API Endpoints

| Route                  | Method | Description                                  |
| ---------------------- | ------ | -------------------------------------------- |
| `/upload`              | POST   | Uploads and extracts text from PDF           |
| `/ai/generate-qa`      | POST   | Generates study questions (Q&A) using Gemini |
| `/ai/generate-mindmap` | POST   | Creates a structured mind map using Gemini   |

---

## 🧠 Example: Mind Map Visualization

The app automatically renders your AI-generated mind map using **D3.js**:

- Nodes represent concepts/topics.
- Links show hierarchical relationships.
- Auto-sized, responsive SVG canvas.

---

## 📦 Environment Variables

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `PORT`           | The port your Express server runs on |
| `GEMINI_API_KEY` | Your Google Gemini API key           |

---

## 🧑‍💻 Development Scripts

| Command                                           | Description                                     |
| ------------------------------------------------- | ----------------------------------------------- |
| `npm run dev`                                     | Start server in development mode with `nodemon` |
| `npm start`                                       | Start server in production mode                 |
| `docker-compose up --build`                       | Run app inside Docker (dev mode)                |
| `docker-compose -f docker-compose.prod.yml up -d` | Run in production container                     |

---

## 🌍 Deployment

You can deploy your Dockerized app easily on:

- Render
- AWS EC2 / Lightsail
- DigitalOcean Droplets
- Google Cloud Run

---

## 💡 Future Improvements

- Export generated Q&A and mind maps to PDF or Markdown.
- Add support for multiple AI models.
- Integrate user authentication and saved study sessions.

---

## 👨‍💻 Author

**Mohamed Baraka**  
Node.js Backend Engineer | Building Scalable & Intelligent Systems  
🔗 [LinkedIn](https://linkedin.com/in/mohamed-ahmed-367085390)

---

> 🚀 _"Study smarter with AI — not harder."_
