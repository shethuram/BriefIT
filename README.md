# 🚀 **BriefIt – AI-Powered Text Summarization Web App**

**BriefIt** is a web application that uses **Large Language Models (LLMs)** to generate concise summaries from uploaded meeting notes or text files. Users can edit, save, and share summaries seamlessly.

---

## ✨ **Features**

* 📝 **Upload Transcript:** Upload text files or paste meeting notes.
* 🎯 **Custom Instructions:** Add prompts like “Summarize in bullet points.”
* ⚡ **Generate Summary:** AI-powered summary generation.
* ✏️ **Editable Summary:** Edit summaries inline and save changes.
* 📤 **Share Summary:** From the generated summary page, navigate to the share page.
* 📧 **Send Summary:** Send summaries via email to multiple recipients.
* 🔐 **JWT Authentication:** Secure login and role-based access.
* 📬 **SMTP Integration:** Backend handles email sending.

---

## 🏗 **Frontend (Angular)**

**Pages / Components:**

1. **Upload Transcript Page**

   * Upload text file or paste notes
   * Field for custom instructions
   * “Generate Summary” button

2. **Generated Summary Page**

   * Shows AI-generated summary
   * Editable text inline
   * “Share” button → navigates to Share Summary Page

3. **Share Summary Page**

   * Enter recipient email(s)
   * Optional subject & message
   * “Send” button → triggers backend email API
   * “Log Out” button for secure exit
   * Shows success/failure notifications

---

## 🖥 **Backend (.NET)**

* ✅ Handles summary generation requests
* ✅ Implements JWT-based authentication
* ✅ Sends emails using SMTP
* ✅ Stores user info, summary history, and email logs in SQL Server

---

## 🛠 **Tech Stack**

* **Frontend:** Angular 18
* **Backend:** .NET 8 API
* **Database:** SQL Server
* **AI / NLP:** LLM integration
* **Email:** SMTP
* **Authentication:** JWT

---


## 🌐 **Live Demo**

[http://briefit.runasp.net](http://briefit.runasp.net)

---

## 💡 **Future Enhancements**

* Support PDF and other document uploads
* Multi-language summarization
* User dashboard with summary history
