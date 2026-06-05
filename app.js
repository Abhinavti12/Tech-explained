/* Tech Explained - Core Scripting & Interactions */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initHamburgerMenu();
  initHeroCanvas();
  initStatsCounter();
  initApproachTabs();
  initAISimulator();
  initCloudPyramid();
  initCybersecurityAnalyzer();
  initWebDevPlayground();
  initDataSciencePipeline();
  initEmergingTechDemo();
  initCareerRoadmaps();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. Router (SPA View Swapper)
   ========================================================================== */
function initRouter() {
  const navLinks = document.querySelectorAll('.nav-link, .route-btn');
  const sections = document.querySelectorAll('.page-view');

  function handleRoute(hash) {
    const targetId = hash ? hash.replace('#/', '') : 'home';
    let targetSection = document.getElementById(`section-${targetId}`);
    
    if (!targetSection) {
      targetSection = document.getElementById('section-home');
    }

    // Hide all sections with fade-out
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target section with fade-in
    targetSection.classList.add('active');

    // Update active nav links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#/${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll to top of window
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle view specific initializations
    if (targetId === 'home') {
      triggerCounterAnimations();
    }
  }

  // Listen to hash change
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    handleRoute(hash);
    
    // Close hamburger menu on link click
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.remove('active');
  });

  // Initial load routing
  handleRoute(window.location.hash);
}

function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

/* ==========================================================================
   2. Hero Background Canvas Particles
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;

  let particles = [];
  const particleCount = 60;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(139, 92, 246, 0.4)';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.15;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  resizeCanvas();
  initParticles();
  animate();
}

/* ==========================================================================
   3. Statistics Counter Animation
   ========================================================================== */
let statsAnimated = false;

function initStatsCounter() {
  // Trigger initially if on home page
  if (window.location.hash === '' || window.location.hash === '#/' || window.location.hash === '#/home') {
    triggerCounterAnimations();
  }
}

function triggerCounterAnimations() {
  if (statsAnimated) return;
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  statsAnimated = true;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10);
    const suffix = counter.getAttribute('data-suffix') || '';
    let current = 0;
    const duration = 1500; // 1.5s
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  });
}

/* ==========================================================================
   4. About Section - Learning Approach Tabs
   ========================================================================== */
function initApproachTabs() {
  const tabs = document.querySelectorAll('.approach-tab-btn');
  const panels = document.querySelectorAll('.approach-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

/* ==========================================================================
   5. AI Section - Training Simulator
   ========================================================================== */
function initAISimulator() {
  const steps = document.querySelectorAll('.ai-pipeline .pipeline-step');
  const simText = document.getElementById('sim-log-text');
  const pixels = document.querySelectorAll('.sim-data-grid .sim-pixel');
  const btnRun = document.getElementById('ai-run-btn');
  const btnReset = document.getElementById('ai-reset-btn');

  let currentStage = 0; // 0: Data, 1: Training, 2: Prediction, 3: Decision
  let isRunning = false;

  const catMatrix = [
    0,1,1,0,
    1,1,1,1,
    0,1,1,0,
    1,0,0,1
  ];

  function logMessage(msg) {
    const date = new Date().toLocaleTimeString();
    simText.innerHTML += `[${date}] ${msg}\n`;
    simText.scrollTop = simText.scrollHeight;
  }

  function highlightStep(index) {
    steps.forEach((s, idx) => {
      if (idx === index) s.classList.add('active');
      else s.classList.remove('active');
    });
  }

  btnRun.addEventListener('click', async () => {
    if (isRunning) return;
    isRunning = true;
    btnRun.disabled = true;

    // Stage 1: Data Collection
    currentStage = 0;
    highlightStep(0);
    logMessage("Initializing Data Collection...");
    await sleep(800);
    // Draw visual pixels
    pixels.forEach((p, idx) => {
      if (catMatrix[idx]) p.classList.add('active');
      else p.classList.remove('active');
    });
    logMessage("Loaded sample image dataset: Handwritten 'Cat' Silhouette.");
    logMessage("Image size: 4x4 matrix (16 dimensional vector). Status: Success.");
    await sleep(1200);

    // Stage 2: Training
    currentStage = 1;
    highlightStep(1);
    logMessage("Starting Neural Network Training...");
    await sleep(800);
    for (let epoch = 1; epoch <= 3; epoch++) {
      logMessage(`Epoch ${epoch}/3 | Optimizing weights...`);
      let loss = (1.5 / epoch).toFixed(4);
      let acc = (0.65 + (epoch * 0.1)).toFixed(2);
      logMessage(`Epoch ${epoch} completed. Loss: ${loss} | Accuracy: ${acc}`);
      await sleep(1000);
    }
    logMessage("Training completed. Weights updated in neural network layers.");
    await sleep(1200);

    // Stage 3: Prediction
    currentStage = 2;
    highlightStep(2);
    logMessage("Running forward propagation on test data...");
    await sleep(1000);
    logMessage("Model Output Confidence Scores:");
    logMessage(" - Category 'Cat': 94.2%");
    logMessage(" - Category 'Dog': 4.1%");
    logMessage(" - Category 'Bird': 1.7%");
    await sleep(1200);

    // Stage 4: Decision Making
    currentStage = 3;
    highlightStep(3);
    logMessage("Evaluating Threshold (Confidence > 85%)...");
    await sleep(800);
    logMessage("🤖 DECISION: Input image classified as 'CAT'.");
    logMessage("Action: Trigger chatbot response 'Meow! I see a cat image.'");
    
    isRunning = false;
    btnRun.disabled = false;
  });

  btnReset.addEventListener('click', () => {
    if (isRunning) return;
    simText.innerHTML = "Simulator ready. Click 'Start Pipeline' to begin.\n";
    pixels.forEach(p => p.classList.remove('active'));
    steps.forEach(s => s.classList.remove('active'));
    currentStage = 0;
  });

  // Narrow vs General vs GenAI switches
  const toggleItems = document.querySelectorAll('.toggle-item');
  const details = document.getElementById('ai-type-details');
  
  const typeTexts = {
    narrow: "<h4>Narrow AI (Weak AI)</h4><p>Designed and trained for a specific task. Examples include face recognition, weather filters, or Google Search algorithms. It operates under a limited context and cannot generalize beyond its domain.</p>",
    general: "<h4>General AI (AGI)</h4><p>A theoretical form of AI where a machine possesses the ability to understand, learn, and apply knowledge in a way that is indistinguishable from human intelligence. It would be able to solve multiple unrelated complex problems.</p>",
    generative: "<h4>Generative AI</h4><p>A subset of AI that focuses on creating new content, including text, images, music, or code. Examples include ChatGPT, Midjourney, and DALL-E. They utilize vast language models to predict the next logical outputs.</p>"
  };

  toggleItems.forEach(item => {
    item.addEventListener('click', () => {
      toggleItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const type = item.getAttribute('data-type');
      details.innerHTML = typeTexts[type];
    });
  });
}

/* ==========================================================================
   6. Cloud Computing Service Models Widget
   ========================================================================== */
function initCloudPyramid() {
  const tiers = document.querySelectorAll('.pyramid-tier');
  const detailHeader = document.getElementById('cloud-detail-title');
  const detailBody = document.getElementById('cloud-detail-body');

  const cloudInfo = {
    saas: {
      title: "Software as a Service (SaaS)",
      content: `
        <p><strong>What it is:</strong> On-demand, cloud-based applications ready to run straight out of the web browser.</p>
        <p><strong>Management:</strong> The vendor handles everything—servers, databases, security, and updates. You just use the software.</p>
        <p><strong>Target Audience:</strong> End-users, office employees.</p>
        <p><strong>Examples:</strong> Google Workspace, Microsoft 365, Dropbox, Slack.</p>
      `
    },
    paas: {
      title: "Platform as a Service (PaaS)",
      content: `
        <p><strong>What it is:</strong> Provides a cloud-hosted platform equipped with operating systems, databases, and environments to build applications.</p>
        <p><strong>Management:</strong> The cloud provider manages the underlying hardware, networking, OS updates, and storage. Developers manage their own application code and configuration.</p>
        <p><strong>Target Audience:</strong> Software Developers.</p>
        <p><strong>Examples:</strong> Heroku, AWS Elastic Beanstalk, Google App Engine, Azure App Service.</p>
      `
    },
    iaas: {
      title: "Infrastructure as a Service (IaaS)",
      content: `
        <p><strong>What it is:</strong> Provides raw computing resources over the internet, including virtual machines, virtual networks, physical firewalls, and block storage.</p>
        <p><strong>Management:</strong> The provider maintains the physical servers. You manage the operating system, databases, middle-ware, scaling, and application code.</p>
        <p><strong>Target Audience:</strong> Network Engineers, DevOps, System Administrators.</p>
        <p><strong>Examples:</strong> Amazon EC2, Google Compute Engine, Microsoft Azure VMs.</p>
      `
    }
  };

  tiers.forEach(tier => {
    tier.addEventListener('click', () => {
      tiers.forEach(t => t.classList.remove('active'));
      tier.classList.add('active');
      const type = tier.getAttribute('data-tier');
      detailHeader.textContent = cloudInfo[type].title;
      detailBody.innerHTML = cloudInfo[type].content;
    });
  });
}

/* ==========================================================================
   7. Cybersecurity Phishing Analyzer & Checklist
   ========================================================================== */
function initCybersecurityAnalyzer() {
  // Phishing Analyzer
  const hotspots = document.querySelectorAll('.email-hotspot');
  const panel = document.getElementById('threat-info-box');
  const countSpan = document.getElementById('found-count');
  
  let foundHotspots = new Set();

  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      spot.classList.add('revealed');
      const text = spot.getAttribute('data-info');
      panel.style.display = 'block';
      panel.innerHTML = `<strong>⚠️ Phishing Red Flag Identified:</strong><br>${text}`;
      
      foundHotspots.add(spot.id);
      countSpan.textContent = foundHotspots.size;

      if (foundHotspots.size === hotspots.length) {
        panel.innerHTML += `<br><span style="color: #10b981; font-weight: bold;">🎉 Excellent! You've successfully identified all ${hotspots.length} major phishing indicators in this email!</span>`;
      }
    });
  });

  // Security Checklist Circular Gauge
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const gaugeFill = document.querySelector('.gauge-fill');
  const gaugeVal = document.querySelector('.gauge-value');
  const tipText = document.getElementById('security-tips-suggestion');

  const tipMessages = [
    "Your account security is critical. Enable Two-Factor Authentication and create strong passwords now!",
    "Basic security setup. Use a Password Manager to avoid writing passwords down or reusing them.",
    "Good start! Make sure you double-check email sender domains to prevent social engineering attacks.",
    "Almost secure! Ensure safe browsing settings and regular browser updates are active.",
    "Excellent! You have implemented perfect cybersecurity hygiene habits. Keep it up!"
  ];

  function updateScore() {
    let checkedCount = 0;
    checkboxes.forEach(box => {
      if (box.checked) checkedCount++;
    });

    const score = Math.round((checkedCount / checkboxes.length) * 100);
    gaugeVal.textContent = `${score}%`;

    // SVG gauge circle logic (radius = 70, circumference = 2 * PI * r = ~440)
    const circum = 440;
    const offset = circum - (score / 100) * circum;
    gaugeFill.style.strokeDashoffset = offset;

    // Apply color based on score
    if (score < 30) {
      gaugeFill.style.stroke = '#ef4444';
      tipText.innerHTML = `<strong>Hygiene Status: High Risk</strong><br>${tipMessages[0]}`;
    } else if (score < 70) {
      gaugeFill.style.stroke = '#f59e0b';
      tipText.innerHTML = `<strong>Hygiene Status: Medium Risk</strong><br>${tipMessages[2]}`;
    } else {
      gaugeFill.style.stroke = '#10b981';
      tipText.innerHTML = `<strong>Hygiene Status: Secure</strong><br>${tipMessages[4]}`;
    }
  }

  checkboxes.forEach(box => {
    box.addEventListener('change', updateScore);
  });

  // Make container row clickable to toggle checkbox
  const checkItems = document.querySelectorAll('.checklist-item');
  checkItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const checkbox = item.querySelector('input');
        checkbox.checked = !checkbox.checked;
        updateScore();
      }
    });
  });

  // Init
  updateScore();
}

/* ==========================================================================
   8. Web Dev Mini Code Playground
   ========================================================================== */
function initWebDevPlayground() {
  const tabs = document.querySelectorAll('.editor-tab-btn');
  const textarea = document.getElementById('dev-editor-area');
  const btnRun = document.getElementById('run-code-btn');
  const preview = document.getElementById('preview-frame');

  let activeTab = 'html';
  
  const codes = {
    html: `<!-- Modify code below and click Run Code -->\n<div class="card">\n  <h2>Hello Frontend!</h2>\n  <p>Modify my CSS or JS using the tabs above to customize my appearance.</p>\n  <button id="alertBtn">Interact Me!</button>\n</div>`,
    css: `/* Add styles here */\nbody {\n  font-family: sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 250px;\n  background: linear-gradient(135deg, #1e1b4b, #311042);\n  color: #fff;\n}\n.card {\n  background: rgba(255,255,255,0.1);\n  border: 1px solid rgba(255,255,255,0.2);\n  border-radius: 12px;\n  padding: 30px;\n  text-align: center;\n  box-shadow: 0 10px 20px rgba(0,0,0,0.3);\n  max-width: 300px;\n}\nbutton {\n  background: #a78bfa;\n  border: none;\n  color: #1e1b4b;\n  padding: 10px 20px;\n  border-radius: 6px;\n  font-weight: bold;\n  cursor: pointer;\n  margin-top: 15px;\n}`,
    js: `// Interactive script\nconst btn = document.getElementById('alertBtn');\nbtn.addEventListener('click', () => {\n  alert('JavaScript makes web applications dynamic and interactive!');\n});`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Save current text
      codes[activeTab] = textarea.value;
      
      // Update active tab styling
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Swap code content
      activeTab = tab.getAttribute('data-lang');
      textarea.value = codes[activeTab];

      // Shift color depending on file
      if (activeTab === 'html') textarea.style.color = '#38bdf8';
      else if (activeTab === 'css') textarea.style.color = '#fb7185';
      else if (activeTab === 'js') textarea.style.color = '#facc15';
    });
  });

  function renderPreview() {
    // Save current active tab text first
    codes[activeTab] = textarea.value;

    const iframeDoc = preview.contentDocument || preview.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${codes.css}</style>
        </head>
        <body>
          ${codes.html}
          <script>${codes.js}</script>
        </body>
      </html>
    `);
    iframeDoc.close();
  }

  btnRun.addEventListener('click', renderPreview);

  // Initialize display with default values
  textarea.value = codes.html;
  renderPreview();
}

/* ==========================================================================
   9. Data Science Workflow Simulator
   ========================================================================== */
function initDataSciencePipeline() {
  const steps = document.querySelectorAll('.ds-control-steps .btn');
  const rows = document.querySelectorAll('.ds-table tbody tr');
  const barChart = document.getElementById('ds-bar-chart');

  let currentDsStep = 0; // 0: Raw, 1: Clean, 2: Analyze, 3: Visualise

  steps[0].addEventListener('click', () => {
    // 1. Raw Data loaded (Default View)
    currentDsStep = 0;
    rows.forEach(row => {
      row.classList.remove('cleaned');
    });
    resetDsBars();
    alert("Loaded raw dataset. Notice the reddish rows with 'N/A' data errors.");
  });

  steps[1].addEventListener('click', () => {
    // 2. Clean Data (Remove dirty rows)
    currentDsStep = 1;
    rows.forEach(row => {
      if (row.classList.contains('dirty-row')) {
        row.classList.add('cleaned');
      }
    });
    resetDsBars();
    alert("Data Cleaning complete! Removed rows with null purchase values or invalid inputs.");
  });

  steps[2].addEventListener('click', () => {
    // 3. Analyze Data
    if (currentDsStep < 1) {
      alert("Please clean your data first to avoid skewed analytics!");
      return;
    }
    currentDsStep = 2;
    alert("Analyzing customer categories:\n- Tech Buyers: 2 customers\n- Fashion Buyers: 2 customers\n- Food/Groceries: 1 customer");
  });

  steps[3].addEventListener('click', () => {
    // 4. Visualize
    if (currentDsStep < 2) {
      alert("Please run data analysis before plotting charts!");
      return;
    }
    currentDsStep = 3;
    // Set heights of the CSS chart
    document.getElementById('bar-tech').style.height = '80%';
    document.getElementById('bar-fashion').style.height = '80%';
    document.getElementById('bar-food').style.height = '40%';
  });

  function resetDsBars() {
    document.getElementById('bar-tech').style.height = '0%';
    document.getElementById('bar-fashion').style.height = '0%';
    document.getElementById('bar-food').style.height = '0%';
  }
}

/* ==========================================================================
   10. Emerging Tech - Blockchain Ledger Demo
   ========================================================================== */
function initEmergingTechDemo() {
  const cardBtns = document.querySelectorAll('.emerging-card-btn');
  const detailDisplay = document.getElementById('emerging-info-body');

  const techInfo = {
    blockchain: {
      title: "Blockchain Ledger Technology",
      content: `
        <p>A decentralized, distributed digital ledger that securely records transactions across multiple computers. Once recorded, the data in any given block cannot be altered retroactively without altering subsequent blocks.</p>
        <div class="blockchain-demo-box">
          <h5>Interactive Blockchain Demo: Add Transaction Blocks</h5>
          <div class="blockchain-chain" id="blockchain-chain">
            <div class="block-item">
              <div class="block-header">Genesis Block [0]</div>
              <div><strong>Prev Hash:</strong> 0000000000</div>
              <div><strong>Data:</strong> TechExplained Launch</div>
              <div><strong>Hash:</strong> 8a3f2d1c7a...</div>
            </div>
          </div>
          <div class="sim-controls">
            <button class="btn btn-primary" id="btn-add-block">Mine & Add Block</button>
          </div>
        </div>
      `
    },
    iot: {
      title: "Internet of Things (IoT)",
      content: `
        <p>IoT refers to the network of physical devices—vehicles, appliances, and smart widgets—embedded with sensors, software, and network connectivity that enables them to collect, share, and act on data without human intervention.</p>
        <p><strong>Smart Homes:</strong> Connected thermostats, smart lights, and biometric locks cooperating to optimize energy and secure the house.</p>
        <p><strong>Smart Cities:</strong> Flow sensor traffic grids, automated refuse updates, and smart utility meters that save municipality overhead costs.</p>
      `
    },
    quantum: {
      title: "Quantum Computing",
      content: `
        <p>Quantum computing leverages the properties of quantum mechanics—superposition and entanglement—to process data in ways that traditional computers cannot. Instead of classical bits (0s and 1s), quantum computers use <strong>qubits</strong>, which can exist in multiple states simultaneously.</p>
        <p><strong>Potential Applications:</strong> Molecular simulations for drug discovery, global weather modeling, and breaking encryption algorithms.</p>
      `
    },
    arvr: {
      title: "Augmented & Virtual Reality (AR / VR)",
      content: `
        <p>Technologies that blend or replace physical environments with simulated ones.</p>
        <p><strong>AR (Augmented):</strong> Overlaying virtual information or graphics onto the real world (e.g., Pokemon Go, Google Glass, IKEA room planner).</p>
        <p><strong>VR (Virtual):</strong> Fully immersive digital environments using headsets (e.g., Meta Quest, Apple Vision Pro) for gaming, surgical training, and virtual tourism.</p>
      `
    },
    robotics: {
      title: "Robotics & Automation",
      content: `
        <p>Robotics involves the design, construction, operation, and application of autonomous machines to perform complex or hazardous physical tasks.</p>
        <p><strong>Industrial Robots:</strong> Articulated arms welding frames on automotive assembly belts.</p>
        <p><strong>Service Robots:</strong> Automated floor vacuums, agricultural drones monitoring soil quality, and mechanical courier bots in hotels.</p>
      `
    }
  };

  let blockCount = 1;

  function renderBlockchainDemo() {
    const btn = document.getElementById('btn-add-block');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const chain = document.getElementById('blockchain-chain');
      const prevBlock = chain.lastElementChild;
      const prevHash = prevBlock.querySelector('div:last-child').textContent.split(' ')[1] || '8a3f2d1c7a';
      
      const newBlock = document.createElement('div');
      newBlock.className = 'block-item';
      
      // Calculate a random block hash representation
      const randomHash = Math.random().toString(36).substring(2, 12);
      
      newBlock.innerHTML = `
        <div class="block-header">Block [${blockCount}]</div>
        <div><strong>Prev Hash:</strong> ${randomHash.substring(0, 4)}...</div>
        <div><strong>Data:</strong> Transaction #${blockCount * 14}</div>
        <div><strong>Hash:</strong> ${randomHash}...</div>
      `;
      
      chain.appendChild(newBlock);
      blockCount++;

      // Auto scroll blockchain to the end
      chain.scrollLeft = chain.scrollWidth;
    });
  }

  cardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cardBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tech = btn.getAttribute('data-tech');
      detailDisplay.innerHTML = `
        <h3>${techInfo[tech].title}</h3>
        ${techInfo[tech].content}
      `;

      if (tech === 'blockchain') {
        blockCount = 1;
        renderBlockchainDemo();
      }
    });
  });

  // Init default display
  detailDisplay.innerHTML = `
    <h3>${techInfo.blockchain.title}</h3>
    ${techInfo.blockchain.content}
  `;
  renderBlockchainDemo();
}

/* ==========================================================================
   11. Technology Career Paths - Interactive Roadmap
   ========================================================================== */
function initCareerRoadmaps() {
  const menuBtns = document.querySelectorAll('.roadmap-menu-btn');
  const detailsTitle = document.getElementById('roadmap-details-title');
  const roadmapNodesContainer = document.getElementById('roadmap-nodes');

  const roadmapData = {
    software: {
      title: "Software Development Career Roadmap",
      nodes: [
        {
          title: "1. Core Programming Basics",
          desc: "Learn fundamental computer science variables, arrays, lists, conditions, and basic logic loops.",
          skills: "Control structures, Data types, Debugging, Basic algorithms",
          tools: "VS Code, Git, Python, Java, or JavaScript",
          careers: "Junior Programmer, Freelance Web Builder"
        },
        {
          title: "2. Frontend Technologies",
          desc: "Master website layout styling, responsive configurations, and DOM interactions.",
          skills: "Semantic HTML5, Responsive Flexbox/Grid, REST API consumption",
          tools: "CSS Flexbox, JavaScript ES6, React/Vue, TailwindCSS",
          careers: "Frontend Developer, UI Engineer"
        },
        {
          title: "3. Backend Architecture",
          desc: "Understand server setup, route endpoints, authorization, and database persistence layers.",
          skills: "API Creation, Relational & NoSQL database structures, Server security",
          tools: "Node.js, Express, Python Django, PostgreSQL, MongoDB",
          careers: "Backend Engineer, Database Administrator"
        },
        {
          title: "4. Deployment & Cloud Infrastructure",
          desc: "Learn to host code, configure Docker containers, and handle server scaling.",
          skills: "CI/CD Pipelines, Server monitoring, Scaling configurations",
          tools: "Docker, Kubernetes, AWS, Vercel, Netlify",
          careers: "Full-Stack Engineer, DevOps Administrator"
        }
      ]
    },
    ai: {
      title: "Artificial Intelligence Roadmap",
      nodes: [
        {
          title: "1. Mathematics & Python Basics",
          desc: "Acquire basic vector operations, statistical calculus, and script building blocks.",
          skills: "Linear Algebra, Calculus, Probability, NumPy, Pandas",
          tools: "Python, Jupyter Notebooks, Anaconda",
          careers: "Data Associate, Junior Programmer"
        },
        {
          title: "2. Machine Learning Core",
          desc: "Master linear regressions, decision classification algorithms, and dataset normalization.",
          skills: "Supervised & Unsupervised Learning, Regression, Classification",
          tools: "Scikit-Learn, Pandas, Matplotlib",
          careers: "Machine Learning Associate"
        },
        {
          title: "3. Deep Learning & Neural Nets",
          desc: "Design artificial layer weights, convolutional kernels, and transformer components.",
          skills: "Neural networks, Computer vision, Natural Language Processing",
          tools: "TensorFlow, PyTorch, HuggingFace Transformers",
          careers: "Deep Learning Specialist, Computer Vision Engineer"
        },
        {
          title: "4. Deployment & MLOps",
          desc: "Deploy neural architectures to cloud nodes and manage retraining lifecycles.",
          skills: "Model quantization, Cloud serving pipelines, Pipeline orchestration",
          tools: "MLflow, AWS SageMaker, Docker, Flask APIs",
          careers: "MLOps Engineer, AI Solutions Architect"
        }
      ]
    },
    cyber: {
      title: "Cybersecurity Analyst Roadmap",
      nodes: [
        {
          title: "1. Computer Networks Foundation",
          desc: "Understand network packages, routing rules, domain names, and local configurations.",
          skills: "TCP/IP models, OSI layers, DNS configurations, Routing metrics",
          tools: "Wireshark, Command Prompt, Cisco Packet Tracer",
          careers: "Helpdesk Analyst, Junior Network Specialist"
        },
        {
          title: "2. System Administration & Security",
          desc: "Configure secure server nodes, firewalls, and credential privileges.",
          skills: "Linux Server management, Access Control Lists, Ports scanning",
          tools: "Nmap, Kali Linux, Bash scripts, Active Directory",
          careers: "Security Analyst, Network Security Officer"
        },
        {
          title: "3. Threat Defense & Incident Management",
          desc: "Analyze logs, detect anomalous patterns, and neutralize unauthorized malware threats.",
          skills: "Intrusion Detection, Vulnerability assessments, Digital Forensics",
          tools: "Splunk, Metasploit, Wireshark, Burp Suite",
          careers: "SOC Analyst, Incident Responder"
        },
        {
          title: "4. Penetration Testing & Cryptography",
          desc: "Simulate attacks to spot network bugs and implement secure cryptographic shields.",
          skills: "Ethical Hacking, Red Teaming, Encryption algorithms",
          tools: "Kali Linux, Hashcat, John the Ripper",
          careers: "Penetration Tester, Cryptographer"
        }
      ]
    },
    datascience: {
      title: "Data Science Roadmap",
      nodes: [
        {
          title: "1. Spreadsheet Analytics & SQL",
          desc: "Learn to query datasets and compile basic pivots/charts.",
          skills: "Data normalization, Aggregation queries, JOIN matrices",
          tools: "Microsoft Excel, PostgreSQL, MySQL",
          careers: "Data Entry Operator, Business Assistant"
        },
        {
          title: "2. Python Pandas & Visual charts",
          desc: "Write clean dataframes, clean missing records, and plot correlation graphs.",
          skills: "Data Cleaning, Explanatory analysis, Vector graphing",
          tools: "Python Pandas, Seaborn, Tableau, Power BI",
          careers: "Data Analyst, BI Developer"
        },
        {
          title: "3. Statistical Modeling & Math",
          desc: "Evaluate sample deviations, test null hypotheses, and build predictive grids.",
          skills: "Hypothesis testing, Probability models, Linear regressions",
          tools: "R Programming, Scikit-Learn, Statsmodels",
          careers: "Junior Data Scientist"
        },
        {
          title: "4. Advanced Analytics & Big Data",
          desc: "Handle giant databases streaming in real time across node networks.",
          skills: "Distributed filesystems, Stream processing, AI models integration",
          tools: "Apache Spark, Hadoop, AWS EMR",
          careers: "Senior Data Scientist, Data Engineer"
        }
      ]
    },
    cloud: {
      title: "Cloud Infrastructure Career Roadmap",
      nodes: [
        {
          title: "1. OS Administration & Shell script",
          desc: "Manage server files, directories, processes, and run automation scripts.",
          skills: "Linux/Windows systems admin, Bash/Powershell automation",
          tools: "Ubuntu Server, Git Bash, Putty SSH",
          careers: "Junior SysAdmin"
        },
        {
          title: "2. Networking & Core Cloud",
          desc: "Configure virtual networks, routing nodes, compute instances, and storage buckets.",
          skills: "VPCs, Subnets, DNS configs, Firewall rules",
          tools: "AWS EC2/S3/VPC, Microsoft Azure, Google Cloud",
          careers: "Cloud Support Associate, Network Engineer"
        },
        {
          title: "3. Infrastructure as Code & Containers",
          desc: "Write template scripts to configure infrastructure instantly without clicking consoles.",
          skills: "Containerization, Infrastructure templates, CI/CD setup",
          tools: "Docker, Terraform, Ansible, Gitlab Pipelines",
          careers: "Cloud Engineer, Infrastructure Specialist"
        },
        {
          title: "4. Cloud Systems & Security Design",
          desc: "Build highly reliable architectures that failover automatically and scale under high traffic.",
          skills: "High Availability design, Cost optimization, Identity Access Mgmt",
          tools: "AWS IAM, AWS CloudWatch, Kubernetes clusters",
          careers: "Cloud Solutions Architect, DevOps Architect"
        }
      ]
    }
  };

  function renderRoadmapNodes(pathKey) {
    const data = roadmapData[pathKey];
    detailsTitle.textContent = data.title;
    roadmapNodesContainer.innerHTML = '';

    data.nodes.forEach((n, idx) => {
      const nodeElement = document.createElement('div');
      nodeElement.className = `roadmap-node ${idx === 0 ? 'active' : ''}`;
      
      nodeElement.innerHTML = `
        <div class="node-title">
          <span>${n.title}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="node-desc">${n.desc}</div>
        <div class="node-expand-info">
          <div class="node-grid-info">
            <div>
              <strong>Required Skills:</strong><br>
              ${n.skills}
            </div>
            <div>
              <strong>Common Tools:</strong><br>
              ${n.tools}
            </div>
          </div>
          <div style="margin-top: 10px;">
            <strong>Career Opportunities:</strong> ${n.careers}
          </div>
        </div>
      `;

      nodeElement.addEventListener('click', (e) => {
        // Prevent toggle if clicking inside the expanded container
        if (e.target.closest('.node-expand-info')) return;
        
        const isActive = nodeElement.classList.contains('active');
        // Close all other nodes
        document.querySelectorAll('.roadmap-node').forEach(node => {
          node.classList.remove('active');
        });

        if (!isActive) {
          nodeElement.classList.add('active');
        }
      });

      roadmapNodesContainer.appendChild(nodeElement);
    });
  }

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const path = btn.getAttribute('data-path');
      renderRoadmapNodes(path);
    });
  });

  // Render initial Software roadmap
  renderRoadmapNodes('software');
}

/* ==========================================================================
   12. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   13. Contact & Dynamic Feedback Wall
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('tech-contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert("Please fill in the required fields (Name, Email, Message).");
        return;
      }

      // Reset form
      contactForm.reset();

      // Alert success
      alert(`Thank you, ${name}! Your message has been sent successfully.`);
    });
  }
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
