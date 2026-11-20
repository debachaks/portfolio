window.DPData = {
  pubs: [
    ['Reliable Anomaly Detection for GPS-Dependent Networked Systems via Unsupervised Fusion of Hardware Performance Counters', 'D. Chakraborty, A. Hati, J. Plusquellic, K. Chakrabarty, T. J. Mannos, E. E. Tsiropoulou', 'Submitted to IEEE ICC 2027', null, 'anomaly', 'Hardware counters from GPS-dependent nodes are fused; the outlier gets flagged'],
    ['Semantic-Aware WiFi Data Collection for Smart Manufacturing with AI-Driven Edge Intelligence', 'S. H. Nimmagadda, D. Chakraborty, P. Sharma, K. Chakrabarty, E. E. Tsiropoulou', 'Submitted to IEEE ICC 2027', null, 'wifi', 'Factory machines stream WiFi data to an AI edge router'],
    ['A Game-Theoretic Approach to Distributed Power Control in Over-the-Air Computation Wireless Systems', 'D. Chakraborty, A. Sabyrbek, E. E. Tsiropoulou', 'Submitted to IEEE Transactions on Green Communications and Networking', null, 'power', 'Each user adjusts transmit power until all settle at an equilibrium'],
    ['Zero-Label Anomaly Detection and Forensic Attribution for RISC-V Embedded Devices via Contrastive Learning', 'D. Chakraborty, A. Hati, J. Plusquellic, K. Chakrabarty, T. J. Mannos, E. E. Tsiropoulou', 'IEEE CAMAD', '2026', 'anomaly', 'Processor telemetry is watched with no labels; a fault spike gets flagged'],
    ['Game-Theoretic Over-the-Air Computation for Socially Coupled Crowdsensing Systems', 'A. Sabyrbek, D. Chakraborty, E. E. Tsiropoulou', 'IEEE ICC', '2026', 'crowd', 'Many sensors transmit at once and the air itself sums their signals'],
    ['Attention-based Deep Learning for Epileptic Seizure Type Detection', 'A. Shankar, D. Chakraborty, et al.', 'ASSIC', '2024', 'attention', 'An attention window scans the EEG and locks onto the seizure burst'],
    ['Seizure Type Detection Using EEG Signals Based on Phase Synchronization and Deep Learning', 'A. Shankar, D. Chakraborty, et al.', 'IEEE BSN', '2023', 'phase', 'Two EEG channels drift in and out of phase synchrony'],
    ['Long Short-Term Memory Framework for Seizure Type Classification Using EEG Signals', 'A. Shankar, D. Chakraborty, et al.', 'IEEE SPMB', '2023', 'lstm', 'The signal passes through LSTM memory cells one step at a time'],
    ['Efficient Hardware Implementation of Cube Architecture using Yavadunam Sutra on FPGA', 'M. Thakare, P. Yash, D. Chakraborty, B. Jajodia', 'IEEE MWSCAS', '2021', 'fpga', 'Cube logic lights up across the FPGA fabric']
  ],
  exp: [
    { key: 'proton', ch: 'CH1', icon: 'memory', role: 'Graduate Research Associate', org: 'PROTON Lab, Arizona State University', when: 'May 2025 – Present', screen: 'HPC / register telemetry', groups: [
      { tag: 'PhD', pts: ['Studying fault detection and diagnosis in microprocessors by analyzing hardware performance counters and register-level telemetry, applying statistical and machine learning techniques to identify and characterize fault-induced attacks.',
        'Developed a zero-label anomaly detection and forensic attribution framework using contrastive learning to identify fault-injected and adversarial behavior in RISC-V embedded processors.',
        'Designed a windowed-difference, multi-detector consensus methodology for false-alarm suppression in noisy time-series hardware telemetry, generalizable to anomaly detection problems beyond hardware security.'] },
      { tag: 'MS', pts: ['Conducting thesis research on Over-the-Air Computation using game theory to optimize distributed signal processing in wireless edge networks.',
        'Developing Python-based simulations for power control and resource allocation, enabling efficient multi-user coordination under dynamic channel conditions.'] }] },
    { key: 'zs', ch: 'CH2', icon: 'database', role: 'Data Engineer', org: 'ZS Associates · India', when: 'Sep 2023 – Jun 2024', screen: 'ETL pipeline', groups: [{ tag: '', pts: [
      'Built SQL-driven workflows and Excel-based analytics for medical sales data.', 'Optimized ETL pipelines, improving execution time by 30%.', 'Designed quality-check frameworks reducing SQL database error rates by 25%.'] }] },
    { key: 'iisc', ch: 'CH3', icon: 'monitor_heart', role: 'Summer Research Fellow', org: 'IISc Bangalore', when: 'May 2022 – Jul 2022', screen: 'EEG · matching pursuit', groups: [{ tag: '', pts: [
      'Analyzed EEG signals using time-frequency decomposition and Matching Pursuit algorithm.', 'Developed MATLAB pipelines for preprocessing and visualization of biomedical signals.'] }] }
  ],
  edu: [
    { roman: 'I', icon: 'cell_tower', deg: 'B.Tech in Electronics & Communication Engineering', school: 'IIIT Guwahati', when: 'Aug 2019 – Jul 2023 · Guwahati, India', gpa: 'GPA 8.66 / 10' },
    { roman: 'II', icon: 'router', deg: 'M.S. in Computer Engineering', school: 'Arizona State University', when: 'Aug 2024 – May 2026 · Tempe, USA', gpa: 'GPA 4.0 / 4.0' },
    { roman: 'III', icon: 'memory', deg: 'Ph.D. in Computer Engineering', school: 'Arizona State University', when: 'Aug 2026 – May 2029 (Expected) · Tempe, USA', gpa: 'In progress' }
  ],
  projects: [
    { viz: 'mlops', t: 'End-to-End MLOps Pipeline – YouTube Sentiment Analysis', desc: 'Built a full MLOps pipeline integrating YouTube API, custom NLP models, and experiment tracking, reducing manual workflow time by ~60%.', tags: ['Python', 'AWS', 'NLP', 'Docker', 'MLflow', 'DVC'], yield: '~60% less manual workflow time' },
    { viz: 'prioritize', t: 'Smart Task Prioritizer (LLM-Based Agent)', desc: 'Designed an LLM-powered productivity agent with real-time reasoning and interactive dashboards.', tags: ['Python', 'Streamlit', 'LangChain'], yield: 'Real-time reasoning, interactive dashboards' },
    { viz: 'classify', t: 'Seizure Type Classification using Deep Learning', desc: 'Developed EEG-based seizure classification models achieving up to 98% accuracy.', tags: ['TensorFlow', 'CNN', 'LSTM', 'Signal Processing'], yield: 'Up to 98% accuracy' }
  ],
  elements: [
    ['Py', 'Python', 'Languages & Data', 1], ['Sq', 'SQL', 'Languages & Data', 1], ['Tf', 'TensorFlow', 'ML & Deep Learning', 0], ['Pt', 'PyTorch', 'ML & Deep Learning', 0],
    ['Mf', 'MLflow', 'ML & Deep Learning', 0], ['Aw', 'AWS', 'Cloud & DevOps', 2], ['Dk', 'Docker', 'Cloud & DevOps', 2], ['Sp', 'Signal Processing', 'Domain Expertise', 3],
    ['Hs', 'Hardware Security', 'Research', 4], ['Fa', 'Fault Analysis', 'Research', 4], ['Se', 'Survivable Electronics', 'Research', 4], ['Ml', 'Machine Learning', 'Research', 4], ['Io', 'Industrial IoT Networks', 'Research', 4]
  ],
  awards: [
    { icon: 'workspace_premium', t: 'Herbold Graduate Engineering Scholarship', d: 'Sep 2025', x: 'Awarded to high-achieving graduate students (GPA ≥ 3.5) with research interests in computer science and engineering.' },
    { icon: 'school', t: 'Engineering Graduate Fellowship', d: 'Aug 2024', x: 'Competitive fellowship awarded by the Ira A. Fulton Schools of Engineering.' },
    { icon: 'visibility', t: 'Google Research Week – Computer Vision Track', d: 'Jan 2023', x: 'Selected among 50 students nationwide for an intensive research program by Google Research India.' }
  ],
  news: [
    ['Sep 2026', 'Won 2nd place at the AI Investment Spark Challenge (TIAA × ASU × AWS) with FundSentinel, a 14-agent AI fund-approval committee.', 'emoji_events', 'Hackathon'],
    ['Sep 2026', 'Presented our paper on zero-label anomaly detection and forensic attribution for RISC-V devices at IEEE CAMAD 2026.', 'podium', 'Talk'],
    ['Aug 2026', 'Started my Ph.D. in Computer Engineering at Arizona State University.', 'school', 'Milestone'],
    ['May 2026', 'Completed my M.S. in Computer Engineering at ASU with a 4.0 GPA.', 'school', 'Milestone'],
    ['May 2026', 'Presented our paper on game-theoretic over-the-air computation for crowdsensing at IEEE ICC 2026.', 'podium', 'Talk'],
    ['Apr 2026', 'Paper accepted at IEEE CAMAD 2026.', 'description', 'Paper'],
    ['Jan 2026', 'Paper accepted at IEEE ICC 2026.', 'description', 'Paper'],
    ['Sep 2025', 'Received the Herbold Graduate Engineering Scholarship.', 'workspace_premium', 'Award'],
    ['May 2025', 'Joined the PROTON Lab at ASU as a Graduate Research Associate.', 'science', 'Lab'],
    ['Aug 2024', 'Awarded the Engineering Graduate Fellowship by the Ira A. Fulton Schools of Engineering.', 'military_tech', 'Award']
  ],
  fundLog: [
    'Fund file received',
    'Data team · 5 agents profile, clean and document the file',
    'Supervisor routes the work',
    'Four specialist reviewers assess the fund',
    'Evidence checker demands proof · code verifies every claim against the source data',
    'Decision owner rules'
  ]
};
