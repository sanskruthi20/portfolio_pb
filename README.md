# Sanskruthi Shedole – Personal E-Portfolio Website

A modern, responsive, and recruiter-focused portfolio website for **Sanskruthi Shedole**, a 2nd-year B.Tech student specializing in **Artificial Intelligence and Data Science** at **Reva University**.

---

## 🌟 Key Highlights & Features

- **Modern Tech Aesthetic**: Sleek dark slate theme with cyan and indigo gradients, glassmorphism cards, and an interactive HTML5 background neural constellation canvas.
- **Theme Switcher**: Instant toggle between Dark Mode and Light Mode with persistent local storage.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile with a custom animated hamburger menu drawer.
- **Scrollspy Navigation**: Sticky navbar with active section indicators as you scroll through all sections.
- **Interactive Project Demos**:
  - **Noise Level Indicator**: Interactive simulator allowing recruiters to test sound levels (Library 25 dB, Classroom 52 dB, Cafeteria 88 dB) with dynamic classification into **Quiet**, **Moderate**, or **High**.
  - **Professor Availability in Campus**: Live searchable campus directory simulating faculty cabin status and lecture schedule queries.
- **Resume Modal & Download**: Dedicated resume overview modal with direct download linked to `assets/Sanskruthi_Shedole_Resume.pdf`.
- **Skills Filtering**: Instant categorization tabs for Programming, Data Science & AI, Development & Tools, and Soft Skills.
- **Contact Form & Clipboard Utility**: Clean contact form with client-side validation and 1-click email copy to clipboard with toast notifications.
- **Zero Fictitious Claims**: Strictly adheres to verified information—no invented certifications, awards, skill percentages, or fake URLs. All external links are cleanly marked placeholders.

---

## 📁 Project Structure

```text
sanskruthi-portfolio/
├── index.html                           # Main semantic HTML5 webpage
├── styles.css                           # Vanilla CSS design system & responsive styling
├── script.js                            # Interactive canvas, simulators, modals, & theme logic
├── README.md                            # Documentation and customization guide
└── assets/
    ├── sanskruthi_profile_avatar.jpg    # Custom 3D AI/tech profile avatar
    ├── noise_level_project.jpg          # Project 1 preview graphic
    ├── professor_availability_project.jpg# Project 2 preview graphic
    └── Sanskruthi_Shedole_Resume.pdf    # Downloadable resume placeholder
```

---

## 🚀 How to Open and View

1. **Directly in Browser**: Double-click [index.html](file:///C:/Users/Sanskruthi/.gemini/antigravity-ide/scratch/sanskruthi-portfolio/index.html) or right-click and choose **Open with > Google Chrome / Microsoft Edge**.
2. **Via Local Server (Optional)**:
   ```powershell
   cd "C:\Users\Sanskruthi\.gemini\antigravity-ide\scratch\sanskruthi-portfolio"
   # If Python is installed:
   python -m http.server 8000
   ```

---

## ✏️ How to Customize Your Placeholders

When your official links and accounts are ready, make these quick edits in [index.html](file:///C:/Users/Sanskruthi/.gemini/antigravity-ide/scratch/sanskruthi-portfolio/index.html):

1. **Email Address**:
   - In `index.html`, find `sanskruthi.shedole@example.com` and replace with your official college or personal email.
   - In `script.js`, update `emailToCopy = 'sanskruthi.shedole@example.com'`.
2. **GitHub Profile & Repositories**:
   - In `index.html`, locate the GitHub buttons and replace `class="... placeholder-trigger"` with `<a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">`.
3. **LinkedIn Profile**:
   - Replace the LinkedIn placeholder with your official LinkedIn profile URL (`https://linkedin.com/in/your-profile`).
4. **Resume PDF**:
   - Save your latest resume as `Sanskruthi_Shedole_Resume.pdf` and drop it directly into the `assets/` folder.
