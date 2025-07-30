# 📝 OuMarkdown (OuMd)

**OuMarkdown** is a markdown-based note-sharing platform built with **MDX**, focused on speed, simplicity, and full customization.  
It is designed as a personal tool for [Ouji](https://github.com/oujisan) to easily publish and share notes directly from a GitHub repository.  
All notes are stored in [OuVault](https://github.com/oujisan/OuVault), a public GitHub repository where markdown files are written and managed locally using [Obsidian](https://obsidian.md).  
Once the notes are pushed to GitHub, they become instantly accessible on the web and are rendered dynamically through the GitHub API. You can explore the website live at [oumd.oujisan.my.id](https://oumd.oujisan.my.id).

## ⚙️ Tech Stack

| Language | Framework | Styling | Storage | Library | Deployment |
| - | - | - | - | - | - |
| <img src="./public/category/typescript.svg" height="15" /> &nbsp; TypeScript | <img src="./public/category/nextjs.svg" height="15" /> &nbsp; Next.js | <img src="./public/category/tailwind.svg" height="15" /> &nbsp; Tailwind CSS | <img src="./public/category/github.svg" height="15" /> &nbsp; GitHub | <img src="./public/category/md.svg" height="15" /> &nbsp; MDX | <img src="./public/category/vercel.svg" height="15" /> &nbsp; Vercel |

## 💡 Inspiration

OuMarkdown was inspired by [enscribe.dev](https://enscribe.dev/), a beautifully crafted markdown-based notebook created by [@jktrn](https://github.com/jktrn).  
The minimalist design, smooth reading experience, and clever use of GitHub as a content source gave me the foundation and motivation to build a version tailored to my own workflow and preferences.

> [!NOTE]   
> This is my first time building something with **TypeScript** and **Next.js**, so things might not be perfect just yet — still figuring things out as I go. I built this with a lot of help from AI tools along the way, which made the learning process much smoother. Always happy to hear thoughts or ideas for improvement!


## ✨ Features

### 🌍 1. Public Access & Easy Sharing  
Every note published through OuMarkdown is publicly accessible. Visitors — or Ouji himself — can simply copy a link to instantly share any markdown file as a live, readable web page.

### 🗂️ 2. Automatic Category Icons  
Each markdown file begins with a header in the format `# [{category}] {title}`,  OuMarkdown automatically parses this and displays a unique icon based on the category. If a matching icon is found in the `./public/category` directory, it will be displayed. Otherwise, a default icon will be used. Currently, more than **50 categories** are supported.

### 🔗 3. Optimized GitHub API Usage  
By leveraging GitHub’s REST API and using a **fine-grained personal access token**, OuMarkdown supports up to **5000 requests per hour**, ensuring fast and uninterrupted access even during high-traffic usage.

### ⬇️ 4. Markdown File Download  
Users can easily download any markdown file via a one-click action button using GitHub’s raw content endpoint:  `https://raw.githubusercontent.com/...` . This makes it convenient to reuse or save notes locally.

### 🔎 5. Intelligent Search & Filtering  
A smart search system helps users find notes quickly and intuitively. To filter by category, simply prefix the keyword with `#`, for example: `#ai` to find notes in the AI category. Search results are fast, structured, and relevant.

## 🔮 Future Plans

### 📑 1. Automatic Table of Contents (ToC)  
A table of contents will be generated for each markdown note to improve navigation. All headers (`#`, `##`, `###`, etc.) inside the markdown will be parsed and displayed as clickable links, allowing users to jump directly to any section in the note. This will be especially helpful for long-form content or technical documentation.

### ✍️ 2. Create, Update, and Delete Notes from the Web  
OuMarkdown will soon support **creating, editing, and deleting** markdown notes directly from the web interface. These features will be protected by **password authentication**, ensuring only authorized access. The editing experience will include a **live markdown preview**, offering a writing workflow similar to **Obsidian** or **VS Code**, all within the browser.


## Category / Topic:
| <img src="./public/category/ai.svg" height="30" /> | <img src="./public/category/cloud.svg" height="30" /> | <img src="./public/category/database.svg" height="30" /> | <img src="./public/category/git.svg" height="30" /> | <img src="./public/category/laravel.svg" height="30" /> | <img src="./public/category/network.svg" height="30" /> | <img src="./public/category/qna.svg" height="30" /> | <img src="./public/category/troubleshoot.svg" height="30" /> | <img src="./public/category/anime.svg" height="30" /> | <img src="./public/category/code.svg" height="30" /> |
| - | - | - | - | - | - | - | - | - | - |
| <p align="center">Ai</p> | <p align="center">Cloud</p> | <p align="center">Database</p> | <p align="center">Git</p> | <p align="center">Laravel</p> | <p align="center">Network</p> | <p align="center">QnA</p> | <p align="center">Troubleshoot</p> | <p align="center">Anime</p> | <p align="center">Code</p> |
| <p align="center"><img src="./public/category/expressjs.svg" height="30" /></p> | <p align="center"><img src="./public/category/github.svg" height="30" /></p> | <p align="center"><img src="./public/category/linux.svg" height="30" /></p> | <p align="center"><img src="./public/category/nextjs.svg" height="30" /></p> | <p align="center"><img src="./public/category/react.svg" height="30" /></p> | <p align="center"><img src="./public/category/csharp.svg" height="30" /></p> | <p align="center"><img src="./public/category/typescript.svg" height="30" /></p> | <p align="center"><img src="./public/category/extension.svg" height="30" /></p> | <p align="center"><img src="./public/category/html.svg" height="30" /></p> | <p align="center"><img src="./public/category/logbook.svg" height="30" /></p> |
| <p align="center">ExpressJS</p> | <p align="center">GitHub</p> | <p align="center">Linux</p> | <p align="center">Next.js</p> | <p align="center">React</p> | <p align="center">C#</p> | <p align="center">Typescript</p> | <p align="center">Extension</p> | <p align="center">HTML</p> | <p align="center">Logbook</p> |
| <p align="center"><img src="./public/category/note.svg" height="30" /></p> | <p align="center"><img src="./public/category/review.svg" height="30" /></p> | <p align="center"><img src="./public/category/video.svg" height="30" /></p> | <p align="center"><img src="./public/category/assembly.svg" height="30" /></p> | <p align="center"><img src="./public/category/css.svg" height="30" /></p> | <p align="center"><img src="./public/category/firebase.svg" height="30" /></p> | <p align="center"><img src="./public/category/idea.svg" height="30" /></p> | <p align="center"><img src="./public/category/matkul.svg" height="30" /></p> | <p align="center"><img src="./public/category/penetration.svg" height="30" /></p> | <p align="center"><img src="./public/category/script.svg" height="30" /></p> |
| <p align="center">Note</p> | <p align="center">Review</p> | <p align="center">Video</p> | <p align="center">Assembly</p> | <p align="center">CSS</p> | <p align="center">Firebase</p> | <p align="center">Idea</p> | <p align="center">Matkul</p> | <p align="center">Penetration</p> | <p align="center">Script</p> |
| <p align="center"><img src="./public/category/vue.svg" height="30" /></p> | <p align="center"><img src="./public/category/blockchain.svg" height="30" /></p> | <p align="center"><img src="./public/category/ctf.svg" height="30" /></p> | <p align="center"><img src="./public/category/fix.svg" height="30" /></p> | <p align="center"><img src="./public/category/javascript.svg" height="30" /></p> | <p align="center"><img src="./public/category/md.svg" height="30" /></p> | <p align="center"><img src="./public/category/php.svg" height="30" /></p> | <p align="center"><img src="./public/category/sqlite.svg" height="30" /></p> | <p align="center"><img src="./public/category/web.svg" height="30" /></p> | <p align="center"><img src="./public/category/box.svg" height="30" /></p> |
| <p align="center">Vue</p> | <p align="center">Blockchain</p> | <p align="center">CTF</p> | <p align="center">Fix</p> | <p align="center">JavaScript</p> | <p align="center">MD</p> | <p align="center">PHP</p> | <p align="center">SQLite</p> | <p align="center">Web</p> | <p align="center">Box</p> |
| <p align="center"><img src="./public/category/dart.svg" height="30" /></p> | <p align="center"><img src="./public/category/flutter.svg" height="30" /></p> | <p align="center"><img src="./public/category/kotlin.svg" height="30" /></p> | <p align="center"><img src="./public/category/music.svg" height="30" /></p> | <p align="center"><img src="./public/category/postgresql.svg" height="30" /></p> | <p align="center"><img src="./public/category/tailwind.svg" height="30" /></p> | <p align="center"><img src="./public/category/c++.svg" height="30" /></p> | <p align="center"><img src="./public/category/game.svg" height="30" /></p> | <p align="center"><img src="./public/category/language.svg" height="30" /></p> | <p align="center"><img src="./public/category/mysql.svg" height="30" /></p> |
| <p align="center">Dart</p> | <p align="center">Flutter</p> | <p align="center">Kotlin</p> | <p align="center">Music</p> | <p align="center">PostgreSQL</p> | <p align="center">Tailwind</p> | <p align="center">C++</p> | <p align="center">Game</p> | <p align="center">Language</p> | <p align="center">MySQL</p> |
| <p align="center"><img src="./public/category/python.svg" height="30" /></p> | <p align="center"><img src="./public/category/terminal.svg" height="30" /></p> | <p align="center"><img src="./public/category/apache.svg" height="30" /> | <p align="center"><img src="./public/category/azure.svg" height="30" /> | <p align="center"><img src="./public/category/docker.svg" height="30" /> | <p align="center"><img src="./public/category/dotnet.svg" height="30" /> | <p align="center"><img src="./public/category/godot.svg" height="30" /> | <p align="center"><img src="./public/category/kubernetes.svg" height="30" /> | <p align="center"><img src="./public/category/neon.svg" height="30" /> | <p align="center"><img src="./public/category/nginx.svg" height="30" /></p> |
| <p align="center">Python</p> | <p align="center">Terminal</p> | <p align="center">Apache</p> | <p align="center">Azure</p> | <p align="center">Docker</p> | <p align="center">Dotnet</p> | <p align="center">Godot</p> | <p align="center">Kubernetes</p> | <p align="center">Neon</p> | <p align="center">Nginx</p> | <p align="center">Notion</p> |
| <p align="center"><img src="./public/category/notion.svg" height="30" /> | <p align="center"><img src="./public/category/obsidian.svg" height="30" /> | <p align="center"><img src="./public/category/postman.svg" height="30" /></p> | <p align="center"><img src="./public/category/railway.svg" height="30" /></p> | <p align="center"><img src="./public/category/render.svg" height="30" /></p> | <p align="center"><img src="./public/category/supabase.svg" height="30" /></p> | <p align="center"><img src="./public/category/swagger.svg" height="30" /></p> | <p align="center"><img src="./public/category/unity.svg" height="30" /></p> | <p align="center"><img src="./public/category/vercel.svg" height="30" /></p> | <p align="center">. . . </p>
| <p align="center">Notion</p> | <p align="center">Obsidian</p> | <p align="center">Postman</p> | <p align="center">Railway</p> | <p align="center">Render</p> | <p align="center">Supabase</p> | <p align="center">Swagger</p> | <p align="center">Unity</p> | <p align="center">Vercel</p> | <p align="center">. . .</p>
