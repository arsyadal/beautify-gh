const availableSkills = [
  { id: 'rust', label: 'Rust' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'js', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'react', label: 'React' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'tailwind', label: 'Tailwind CSS' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'fastapi', label: 'FastAPI' },
  { id: 'postgres', label: 'PostgreSQL' },
  { id: 'sqlite', label: 'SQLite' },
  { id: 'redis', label: 'Redis' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'githubactions', label: 'GitHub Actions' },
  { id: 'git', label: 'Git' },
  { id: 'linux', label: 'Linux' }
];

const gifPresets = [
  { id: 'gojo', label: '🤞 Gojo Satoru (JJK)', url: 'https://media.giphy.com/media/DGsDLr9nyz2LkVgKFs/giphy.gif' },
  { id: 'lofigirl', label: '🌸 Lofi Study Girl', url: 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif' },
  { id: 'headphones', label: '🎧 Music Anime Girl', url: 'https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif' },
  { id: 'citylights', label: '🌃 City Lights Girl', url: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif' },
  { id: 'window', label: '🪟 Rainy Window Girl', url: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif' },
  { id: 'ramen', label: '🍜 Ramen Anime Girl', url: 'https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif' },
  { id: 'sunset', label: '🌆 Tokyo Sunset Girl', url: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif' },
  { id: 'hacker', label: '⚔️ Cyber Anime Girl', url: 'https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif' },
  { id: 'animecat', label: '🐱 Cat & Laptop', url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif' }
];

let currentTemplate = 'ultimate';
let selectedSkills = ['rust', 'ts', 'react', 'nextjs', 'postgres', 'docker', 'linux'];
let activeGifUrl = gifPresets[0].url;

function init() {
  // Populate skills
  const skillsContainer = document.getElementById('skills-selector');
  skillsContainer.innerHTML = '';
  availableSkills.forEach(skill => {
    const chip = document.createElement('div');
    chip.className = `skill-chip ${selectedSkills.includes(skill.id) ? 'active' : ''}`;
    chip.innerText = skill.label;
    chip.onclick = () => {
      if (selectedSkills.includes(skill.id)) {
        selectedSkills = selectedSkills.filter(s => s !== skill.id);
      } else {
        selectedSkills.push(skill.id);
      }
      chip.classList.toggle('active');
      renderAll();
    };
    skillsContainer.appendChild(chip);
  });

  // Populate GIF Presets
  const gifContainer = document.getElementById('gif-presets');
  gifContainer.innerHTML = '';
  gifPresets.forEach(preset => {
    const card = document.createElement('div');
    card.className = `gif-preset-card ${activeGifUrl === preset.url ? 'active' : ''}`;
    card.innerHTML = `
      <img src="${preset.url}" alt="${preset.label}" loading="lazy" />
      <span class="gif-preset-label">${preset.label}</span>
    `;
    card.onclick = () => {
      document.querySelectorAll('.gif-preset-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      activeGifUrl = preset.url;
      document.getElementById('input-custom-gif').value = '';
      renderAll();
    };
    gifContainer.appendChild(card);
  });

  // Custom GIF input listener
  document.getElementById('input-custom-gif').addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      document.querySelectorAll('.gif-preset-card').forEach(c => c.classList.remove('active'));
      activeGifUrl = val;
    } else {
      activeGifUrl = gifPresets[0].url;
      document.querySelector('.gif-preset-card')?.classList.add('active');
    }
    renderAll();
  });

  // Template switchers
  document.querySelectorAll('.template-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.template-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentTemplate = pill.getAttribute('data-template');
      applyTemplateDefaults(currentTemplate);
      renderAll();
    });
  });

  // Tab switchers (Live Visual vs Raw Markdown)
  const tabVisual = document.getElementById('tab-visual');
  const tabRaw = document.getElementById('tab-raw');
  const viewVisual = document.getElementById('view-visual');
  const viewRaw = document.getElementById('view-raw');

  tabVisual.addEventListener('click', () => {
    tabVisual.classList.add('active');
    tabRaw.classList.remove('active');
    viewVisual.style.display = 'block';
    viewRaw.style.display = 'none';
  });

  tabRaw.addEventListener('click', () => {
    tabRaw.classList.add('active');
    tabVisual.classList.remove('active');
    viewRaw.style.display = 'block';
    viewVisual.style.display = 'none';
  });

  // Attach input listeners
  ['input-username', 'input-name', 'input-headline', 'input-website'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderAll);
  });

  // Attach checkbox listeners
  ['toggle-banner', 'toggle-gif', 'toggle-stats', 'toggle-snake', 'toggle-projects', 'toggle-blog'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      const gifGroup = document.getElementById('gif-config-group');
      if (id === 'toggle-gif') {
        gifGroup.style.display = document.getElementById('toggle-gif').checked ? 'block' : 'none';
      }
      renderAll();
    });
  });

  // Copy button
  document.getElementById('btn-copy').addEventListener('click', () => {
    const code = document.getElementById('output-markdown').innerText;
    navigator.clipboard.writeText(code).then(() => {
      const copyText = document.getElementById('copy-text');
      copyText.innerText = '✅ Copied!';
      setTimeout(() => {
        copyText.innerText = '📋 Copy Markdown';
      }, 2000);
    });
  });

  // Download button
  document.getElementById('btn-download').addEventListener('click', () => {
    const code = document.getElementById('output-markdown').innerText;
    const blob = new Blob([code], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  renderAll();
}

function applyTemplateDefaults(template) {
  if (template === 'anime') {
    document.getElementById('toggle-banner').checked = true;
    document.getElementById('toggle-gif').checked = true;
    document.getElementById('toggle-stats').checked = true;
    document.getElementById('toggle-snake').checked = true;
    document.getElementById('toggle-projects').checked = true;
    document.getElementById('toggle-blog').checked = false;
    document.getElementById('gif-config-group').style.display = 'block';
    activeGifUrl = gifPresets[0].url; // Lofi Girl
  } else if (template === 'minimalist') {
    document.getElementById('toggle-banner').checked = false;
    document.getElementById('toggle-gif').checked = false;
    document.getElementById('toggle-stats').checked = true;
    document.getElementById('toggle-snake').checked = true;
    document.getElementById('toggle-projects').checked = true;
    document.getElementById('toggle-blog').checked = false;
    document.getElementById('gif-config-group').style.display = 'none';
  } else if (template === 'terminal') {
    document.getElementById('toggle-banner').checked = false;
    document.getElementById('toggle-gif').checked = true;
    document.getElementById('toggle-stats').checked = true;
    document.getElementById('toggle-snake').checked = true;
    document.getElementById('toggle-projects').checked = true;
    document.getElementById('toggle-blog').checked = false;
    document.getElementById('gif-config-group').style.display = 'block';
  } else if (template === 'fullstack') {
    document.getElementById('toggle-banner').checked = true;
    document.getElementById('toggle-gif').checked = false;
    document.getElementById('toggle-stats').checked = true;
    document.getElementById('toggle-snake').checked = true;
    document.getElementById('toggle-projects').checked = true;
    document.getElementById('toggle-blog').checked = true;
    document.getElementById('gif-config-group').style.display = 'none';
  } else {
    // Ultimate
    document.getElementById('toggle-banner').checked = true;
    document.getElementById('toggle-gif').checked = true;
    document.getElementById('toggle-stats').checked = true;
    document.getElementById('toggle-snake').checked = true;
    document.getElementById('toggle-projects').checked = true;
    document.getElementById('toggle-blog').checked = true;
    document.getElementById('gif-config-group').style.display = 'block';
  }
}

function renderAll() {
  const username = document.getElementById('input-username').value.trim() || 'username';
  const name = document.getElementById('input-name').value.trim() || 'Your Name';
  const headline = document.getElementById('input-headline').value.trim() || 'Software Engineer';
  const website = document.getElementById('input-website').value.trim() || 'https://example.com';

  const showBanner = document.getElementById('toggle-banner').checked;
  const showGif = document.getElementById('toggle-gif').checked;
  const showStats = document.getElementById('toggle-stats').checked;
  const showSnake = document.getElementById('toggle-snake').checked;
  const showProjects = document.getElementById('toggle-projects').checked;
  const showBlog = document.getElementById('toggle-blog').checked;

  let md = '';
  let html = '';

  if (currentTemplate === 'anime') {
    // Sakura Anime Aesthetic
    const bannerText = encodeURIComponent(`Konnichiwa, I'm ${name} 🌸`);
    const bannerDesc = encodeURIComponent(`${headline} • Lofi & Anime Enthusiast`);

    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,22,25&height=190&section=header&text=${bannerText}&fontSize=36&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=dark" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=25,26,27&height=190&section=header&text=${bannerText}&fontSize=36&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=light" />\n`;
    md += `    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=190&section=header&text=${bannerText}&fontSize=36" alt="Sakura Header" width="100%" />\n`;
    md += `  </picture>\n\n`;
    md += `  <p align="center">\n`;
    md += `    <a href="${website}"><img src="https://img.shields.io/badge/Portfolio-FF69B4?style=flat-square&logo=safari&logoColor=white" alt="Portfolio" /></a>\n`;
    md += `    <a href="https://linkedin.com/in/${username}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
    md += `    <a href="mailto:contact@${username}.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
    md += `  </p>\n\n`;

    if (showGif && activeGifUrl) {
      md += `  <p align="center">\n`;
      md += `    <img src="${activeGifUrl}" alt="Anime Lofi Animation" width="390" style="border-radius: 12px;" />\n`;
      md += `  </p>\n\n`;
      md += `  <p align="center"><i>「 どんなに深い夜でも、いつかは必ず明ける。」 — No matter how deep the night, it always turns to day.</i></p>\n`;
    }

    md += `</div>\n\n---\n\n`;

    html += `<div style="text-align: center; margin-bottom: 1.2rem;">
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,22,25&height=170&section=header&text=${bannerText}&fontSize=34&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=dark" style="width: 100%; border-radius: 8px;" />
      <div style="margin-top: 10px; display: flex; justify-content: center; gap: 8px;">
        <img src="https://img.shields.io/badge/Portfolio-FF69B4?style=flat-square&logo=safari&logoColor=white" />
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
        <img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" />
      </div>`;
    if (showGif && activeGifUrl) {
      html += `<div style="margin: 1rem 0;"><img src="${activeGifUrl}" width="360" style="border-radius: 10px;" /><br/><small style="color:#ffb6c1; font-style: italic;">「 どんなに深い夜でも、いつかは必ず明ける。」</small></div>`;
    }
    html += `</div><hr/>`;

  } else if (currentTemplate === 'terminal') {
    // Terminal CLI Style
    md += `<div align="center">\n\n`;
    md += `\`\`\`bash\n`;
    md += `> whoami\n`;
    md += `name: ${name}\n`;
    md += `role: ${headline}\n`;
    md += `website: ${website}\n`;
    md += `status: "Building resilient systems & shipping open-source"\n`;
    md += `\`\`\`\n\n`;
    md += `</div>\n\n---\n\n`;

    html += `<pre><code>&gt; whoami\nname: ${name}\nrole: ${headline}\nwebsite: ${website}\nstatus: "Building resilient systems & shipping open-source"</code></pre><hr/>`;
  } else if (showBanner) {
    const bannerText = encodeURIComponent(`Hi, I'm ${name} 👋`);
    const bannerDesc = encodeURIComponent(`${headline}`);
    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,5&height=190&section=header&text=${bannerText}&fontSize=38&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=dark" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=24,28,30&height=190&section=header&text=${bannerText}&fontSize=38&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=light" />\n`;
    md += `    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=190&section=header&text=${bannerText}&fontSize=38" alt="Header Banner" width="100%" />\n`;
    md += `  </picture>\n\n`;
    md += `  <p align="center">\n`;
    md += `    <a href="${website}"><img src="https://img.shields.io/badge/Website-2563EB?style=flat-square&logo=safari&logoColor=white" alt="Website" /></a>\n`;
    md += `    <a href="https://linkedin.com/in/${username}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
    md += `    <a href="mailto:contact@${username}.com"><img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email" /></a>\n`;
    md += `  </p>\n`;
    md += `</div>\n\n---\n\n`;

    html += `<div style="text-align: center; margin-bottom: 1.5rem;">
      <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,5&height=170&section=header&text=${bannerText}&fontSize=36&fontAlignY=38&desc=${bannerDesc}&descAlignY=58&descAlign=50&theme=dark" style="width: 100%; border-radius: 8px;" />
      <div style="margin-top: 10px; display: flex; justify-content: center; gap: 8px;">
        <img src="https://img.shields.io/badge/Website-2563EB?style=flat-square&logo=safari&logoColor=white" />
        <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />
        <img src="https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white" />
      </div>
    </div><hr/>`;
  }

  if (currentTemplate !== 'anime' && showGif && activeGifUrl) {
    md += `<div align="center">\n`;
    md += `  <img src="${activeGifUrl}" alt="Coding Animation" width="380" style="border-radius: 8px;" />\n`;
    md += `</div>\n\n---\n\n`;

    html += `<div style="text-align: center; margin: 1.2rem 0;">
      <img src="${activeGifUrl}" width="360" style="border-radius: 8px;" />
    </div><hr/>`;
  }

  md += `### ${currentTemplate === 'anime' ? '🌸' : '👨‍💻'} About Me\n\n`;
  md += `- 🔭 **Focus:** ${headline}\n`;
  md += `- 🌱 **Continuous Learning:** Exploring scalable distributed architectures & modern tooling\n`;
  md += `- 🌐 **Portfolio & Website:** [${website}](${website})\n\n---\n\n`;

  html += `<h3>${currentTemplate === 'anime' ? '🌸' : '👨‍💻'} About Me</h3>
  <ul>
    <li><strong>🔭 Focus:</strong> ${headline}</li>
    <li><strong>🌱 Continuous Learning:</strong> Exploring scalable distributed architectures & modern tooling</li>
    <li><strong>🌐 Portfolio & Website:</strong> <a href="${website}" target="_blank" style="color: #58a6ff;">${website}</a></li>
  </ul><hr/>`;

  if (selectedSkills.length > 0) {
    const skillList = selectedSkills.join(',');
    md += `### 🛠️ Tech Stack & Toolkit\n\n`;
    md += `<p align="left">\n`;
    md += `  <img src="https://skillicons.dev/icons?i=${skillList}" alt="Tech Stack" />\n`;
    md += `</p>\n\n---\n\n`;

    html += `<h3>🛠️ Tech Stack & Toolkit</h3>
    <div style="margin: 0.8rem 0;">
      <img src="https://skillicons.dev/icons?i=${skillList}" alt="Tech Stack" />
    </div><hr/>`;
  }

  if (showProjects) {
    md += `### 🚀 Featured Projects\n\n`;
    md += `| Project | Description | Tech Stack | Links |\n`;
    md += `| :--- | :--- | :--- | :---: |\n`;
    md += `| **⚡ Project Alpha** | High-performance core service engine. | \`Rust\` \`PostgreSQL\` | [Repo](https://github.com/${username}) |\n`;
    md += `| **🛡️ Dev Engine** | Modern automated workflow utility. | \`TypeScript\` \`Docker\` | [Repo](https://github.com/${username}) |\n\n---\n\n`;

    html += `<h3>🚀 Featured Projects</h3>
    <table>
      <thead>
        <tr><th>Project</th><th>Description</th><th>Tech Stack</th><th>Links</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>⚡ Project Alpha</strong></td><td>High-performance core service engine.</td><td><code>Rust</code> <code>PostgreSQL</code></td><td><a href="https://github.com/${username}" style="color:#58a6ff;">Repo →</a></td></tr>
        <tr><td><strong>🛡️ Dev Engine</strong></td><td>Modern automated workflow utility.</td><td><code>TypeScript</code> <code>Docker</code></td><td><a href="https://github.com/${username}" style="color:#58a6ff;">Repo →</a></td></tr>
      </tbody>
    </table><hr/>`;
  }

  if (showStats) {
    md += `### 📊 GitHub Analytics\n\n`;
    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com/?user=${username}&theme=${currentTemplate === 'anime' ? 'tokyonight' : 'tokyonight'}&hide_border=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://streak-stats.demolab.com/?user=${username}&theme=${currentTemplate === 'anime' ? 'rose_pine_dawn' : 'default'}&hide_border=true" />\n`;
    md += `    <img src="https://streak-stats.demolab.com/?user=${username}&hide_border=true" alt="Streak Stats" />\n`;
    md += `  </picture>\n`;
    md += `  <br/><br/>\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=default&hide_border=true&count_private=true" />\n`;
    md += `    <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&hide_border=true" alt="GitHub Stats" />\n`;
    md += `  </picture>\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=default&hide_border=true" />\n`;
    md += `    <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true" alt="Top Languages" />\n`;
    md += `  </picture>\n`;
    md += `</div>\n\n---\n\n`;

    html += `<h3>📊 GitHub Analytics</h3>
    <div style="text-align: center; margin: 1rem 0;">
      <img src="https://streak-stats.demolab.com/?user=${username}&theme=tokyonight&hide_border=true" style="margin-bottom: 12px; max-width: 100%;" /><br/>
      <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true" style="max-width: 48%; min-width: 280px;" />
        <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true" style="max-width: 48%; min-width: 280px;" />
      </div>
    </div><hr/>`;
  }

  if (showSnake) {
    md += `### 🐍 Contribution Graph\n\n`;
    md += `<div align="center">\n`;
    md += `  <picture>\n`;
    md += `    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-snake-dark.svg" />\n`;
    md += `    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-snake.svg" />\n`;
    md += `    <img alt="Snake Game" src="https://raw.githubusercontent.com/${username}/${username}/output/github-snake.svg" width="100%" />\n`;
    md += `  </picture>\n`;
    md += `</div>\n\n`;

    html += `<h3>🐍 Contribution Graph</h3>
    <div style="text-align: center; margin: 1rem 0;">
      <img src="https://raw.githubusercontent.com/${username}/${username}/output/github-snake-dark.svg" alt="Snake Animation" style="width: 100%; border-radius: 6px;" onerror="this.src='https://raw.githubusercontent.com/arsyadal/arsyadal/output/github-snake-dark.svg'" />
    </div>`;
  }

  if (showBlog) {
    md += `---\n\n### ✍️ Recent Blog Posts\n`;
    md += `<!-- BLOG-POST-LIST:START -->\n`;
    md += `<!-- Automatically populated via GitHub Actions -->\n`;
    md += `<!-- BLOG-POST-LIST:END -->\n\n`;

    html += `<hr/><h3>✍️ Recent Blog Posts</h3><p><em>Automatically synced via GitHub Actions RSS.</em></p>`;
  }

  const footerCustomColors = currentTemplate === 'anime' ? '&customColorList=20,22,25' : '';
  md += `<div align="center">\n`;
  md += `  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient${footerCustomColors}&height=100&section=footer" width="100%" alt="Footer" />\n`;
  md += `</div>\n`;

  html += `<div style="text-align: center; margin-top: 1.5rem;"><img src="https://capsule-render.vercel.app/api?type=waving&color=gradient${footerCustomColors}&height=80&section=footer" style="width: 100%;" /></div>`;

  document.getElementById('output-markdown').innerText = md;
  document.getElementById('output-visual').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', init);
