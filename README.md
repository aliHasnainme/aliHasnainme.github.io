# Ali Hasnain &mdash; Academic Website

An academic portfolio website modeled after **Dr. Jonathan K. Kummerfeld** ([jkk.name](https://jkk.name/home/)), incorporating the **Hugo Docsy** layout system, responsive sidebar navigation, project showcase, and client-side instant search.

---

## 📁 Directory Structure

```text
academic-website/
├── index.html                                  # Homepage (Executive bio, research focus, status)
├── bio_and_cv/
│   └── index.html                              # Short bio, full CV, education, experience, skills
├── research/
│   └── index.html                              # Deep dive: Validator-AI, Smart Healthcare, 3D
├── pubs/
│   └── index.html                              # Publications & preprints catalog
├── software/
│   └── index.html                              # Open source repositories and tools
├── data/
│   └── index.html                              # Benchmarks, synthetic datasets, and datasheets
├── contact/
│   └── index.html                              # Contact coordinates, collaboration guidelines
└── assets/
    ├── css/
    │   └── docsy-custom.css                    # Docsy-style styling, responsive grid, badges
    └── js/
        ├── search-data.js                      # Search index containing all site pages
        └── main.js                             # Auto Table-of-Contents, sidebar toggle, search modal
```

---

## 🚀 How to View Locally

Simply open `index.html` in your web browser (Google Chrome, Firefox, Safari, or Edge):
- Double-click on `index.html`, OR
- Right-click &rarr; **Open With** &rarr; Your preferred browser.

No build tools, Node.js, or Hugo compilation required! Everything runs out of the box with standards-compliant HTML5, CSS3, and JavaScript.

---

## 🌐 How to Deploy to GitHub Pages (`alihasnainme.github.io`)

To make your website live on the web at `https://alihasnainme.github.io` for free:

1. **Create a GitHub Repository:**
   * Go to [github.com/new](https://github.com/new).
   * Name the repository **exactly**: `aliHasnainme.github.io` (must match your GitHub username).
   * Set it to **Public**.

2. **Upload Your Website Files:**
   Open your terminal in this directory:
   ```bash
   cd /home/ali-hasnain/Desktop/academic-website
   git init
   git add .
   git commit -m "Initial commit of academic website modeled after jkk.name"
   git branch -M main
   git remote add origin https://github.com/aliHasnainme/aliHasnainme.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   * Go to your repository settings on GitHub &rarr; **Pages**.
   * Under **Branch**, select `main` and `/ (root)`.
   * Click **Save**.
   * Within 1&ndash;2 minutes, your website will be live at:
     **`https://alihasnainme.github.io`**
