// NEET Syllabus Data
const syllabusData = {
    physics: {
        "Class 11 - Mechanics": [
            "Physical World and Measurement",
            "Kinematics",
            "Laws of Motion",
            "Work, Energy and Power",
            "Motion of System of Particles and Rigid Body",
            "Gravitation"
        ],
        "Class 11 - Properties of Matter": [
            "Properties of Bulk Matter",
            "Thermodynamics",
            "Behaviour of Perfect Gas and Kinetic Theory"
        ],
        "Class 11 - Waves": [
            "Oscillations and Waves"
        ],
        "Class 12 - Electrodynamics": [
            "Electrostatics",
            "Current Electricity",
            "Magnetic Effects of Current and Magnetism",
            "Electromagnetic Induction and Alternating Currents",
            "Electromagnetic Waves"
        ],
        "Class 12 - Optics & Modern Physics": [
            "Optics",
            "Dual Nature of Matter and Radiation",
            "Atoms and Nuclei",
            "Electronic Devices"
        ]
    },
    chemistry: {
        "Physical Chemistry - Basics": [
            "Some Basic Concepts in Chemistry",
            "States of Matter",
            "Atomic Structure",
            "Chemical Bonding and Molecular Structure"
        ],
        "Physical Chemistry - Thermodynamics": [
            "Chemical Thermodynamics",
            "Solutions",
            "Equilibrium"
        ],
        "Physical Chemistry - Kinetics": [
            "Redox Reactions and Electrochemistry",
            "Chemical Kinetics",
            "Surface Chemistry"
        ],
        "Inorganic Chemistry - Periodic Table": [
            "Classification of Elements and Periodicity",
            "General Principles and Process of Isolation of Metals"
        ],
        "Inorganic Chemistry - Elements": [
            "Hydrogen",
            "S-Block Elements",
            "P-Block Elements",
            "D and F Block Elements",
            "Coordination Compounds"
        ],
        "Inorganic Chemistry - Environment": [
            "Environmental Chemistry"
        ],
        "Organic Chemistry - Basics": [
            "Purification and Characterisation of Organic Compounds",
            "Hydrocarbons"
        ],
        "Organic Chemistry - Functional Groups": [
            "Organic Compounds Containing Halogens",
            "Organic Compounds Containing Oxygen",
            "Organic Compounds Containing Nitrogen"
        ],
        "Organic Chemistry - Advanced": [
            "Polymers",
            "Biomolecules",
            "Chemistry in Everyday Life",
            "Principles Related to Practical Chemistry"
        ]
    },
    biology: {
        "Diversity in Living World": [
            "The Living World",
            "Biological Classification",
            "Plant Kingdom",
            "Animal Kingdom"
        ],
        "Structural Organisation": [
            "Morphology of Flowering Plants",
            "Anatomy of Flowering Plants",
            "Structural Organisation in Animals"
        ],
        "Cell Biology": [
            "Cell: The Unit of Life",
            "Biomolecules",
            "Cell Cycle and Cell Division"
        ],
        "Plant Physiology": [
            "Transport in Plants",
            "Mineral Nutrition",
            "Photosynthesis in Higher Plants",
            "Respiration in Plants",
            "Plant Growth and Development"
        ],
        "Human Physiology": [
            "Digestion and Absorption",
            "Breathing and Exchange of Gases",
            "Body Fluids and Circulation",
            "Excretory Products and their Elimination",
            "Locomotion and Movement",
            "Neural Control and Coordination",
            "Chemical Coordination and Integration"
        ],
        "Reproduction": [
            "Reproduction in Organisms",
            "Sexual Reproduction in Flowering Plants",
            "Human Reproduction",
            "Reproductive Health"
        ],
        "Genetics and Evolution": [
            "Principles of Inheritance and Variation",
            "Molecular Basis of Inheritance",
            "Evolution"
        ],
        "Biology and Human Welfare": [
            "Human Health and Disease",
            "Strategies for Enhancement in Food Production",
            "Microbes in Human Welfare"
        ],
        "Biotechnology": [
            "Biotechnology: Principles and Processes",
            "Biotechnology and its Applications"
        ],
        "Ecology and Environment": [
            "Organisms and Populations",
            "Ecosystem",
            "Biodiversity and Conservation",
            "Environmental Issues"
        ]
    }
};

// State Management
let appState = {
    progress: JSON.parse(localStorage.getItem('neetProgress')) || {
        physics: {},
        chemistry: {},
        biology: {}
    },
    studyStats: JSON.parse(localStorage.getItem('neetStudyStats')) || {
        totalStudyTime: 0,
        lastStudyDate: null,
        streak: 0,
        weeklyTopics: 0,
        weekStart: null
    },
    timer: {
        seconds: 0,
        interval: null,
        isRunning: false,
        mode: 'pomodoro'
    },
    achievements: JSON.parse(localStorage.getItem('neetAchievements')) || {}
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeCountdown();
    renderAllSubjects();
    updateAllStats();
    loadNotes();
    checkAchievements();
    updateWeeklyStats();
}

// Navigation
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected view
    document.getElementById(`${viewName}-view`).classList.add('active');

    // Add active class to clicked nav item
    event.target.closest('.nav-item').classList.add('active');

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Countdown Timer
function initializeCountdown() {
    const examDate = new Date('2026-05-03T09:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = examDate - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(3, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            // Update analytics view
            const daysUntilExam = document.getElementById('days-until-exam');
            if (daysUntilExam) {
                daysUntilExam.textContent = days;
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Render Subjects
function renderAllSubjects() {
    renderSubject('physics', syllabusData.physics);
    renderSubject('chemistry', syllabusData.chemistry);
    renderSubject('biology', syllabusData.biology);
}

function renderSubject(subject, data) {
    const container = document.getElementById(`${subject}-content`);
    if (!container) return;

    container.innerHTML = '';

    for (const [chapter, topics] of Object.entries(data)) {
        const chapterGroup = document.createElement('div');
        chapterGroup.className = 'chapter-group';

        const completedTopics = topics.filter(topic =>
            appState.progress[subject][`${chapter}::${topic}`]
        ).length;

        const chapterHeader = document.createElement('div');
        chapterHeader.className = 'chapter-header-new';
        chapterHeader.innerHTML = `
            <div class="chapter-name">
                <span>${completedTopics === topics.length ? '✓' : '○'}</span>
                <span>${chapter}</span>
            </div>
            <div class="chapter-stats">${completedTopics}/${topics.length}</div>
        `;

        const topicsList = document.createElement('div');
        topicsList.className = 'topics-list-new';

        topics.forEach(topic => {
            const topicKey = `${chapter}::${topic}`;
            const isCompleted = appState.progress[subject][topicKey] || false;

            const topicItem = document.createElement('div');
            topicItem.className = `topic-item-new ${isCompleted ? 'completed' : ''}`;
            topicItem.dataset.chapter = chapter;
            topicItem.dataset.topic = topic;
            topicItem.dataset.subject = subject;

            topicItem.innerHTML = `
                <div class="custom-checkbox">${isCompleted ? '✓' : ''}</div>
                <div class="topic-label">${topic}</div>
            `;

            topicItem.onclick = () => toggleTopic(subject, chapter, topic);
            topicsList.appendChild(topicItem);
        });

        chapterGroup.appendChild(chapterHeader);
        chapterGroup.appendChild(topicsList);
        container.appendChild(chapterGroup);
    }
}

// Toggle Topic
function toggleTopic(subject, chapter, topic) {
    const topicKey = `${chapter}::${topic}`;
    const currentState = appState.progress[subject][topicKey] || false;
    appState.progress[subject][topicKey] = !currentState;

    localStorage.setItem('neetProgress', JSON.stringify(appState.progress));

    // Update weekly topics count
    if (!currentState) {
        appState.studyStats.weeklyTopics = (appState.studyStats.weeklyTopics || 0) + 1;
        localStorage.setItem('neetStudyStats', JSON.stringify(appState.studyStats));
    }

    renderSubject(subject, syllabusData[subject]);
    updateAllStats();
    checkAchievements();
}

// Update Statistics
function updateAllStats() {
    let totalTopics = 0;
    let completedTopics = 0;

    const subjectStats = {};

    ['physics', 'chemistry', 'biology'].forEach(subject => {
        let subjectTotal = 0;
        let subjectCompleted = 0;

        Object.values(syllabusData[subject]).forEach(topics => {
            subjectTotal += topics.length;
            topics.forEach(topic => {
                const chapter = Object.keys(syllabusData[subject]).find(ch =>
                    syllabusData[subject][ch].includes(topic)
                );
                const topicKey = `${chapter}::${topic}`;
                if (appState.progress[subject][topicKey]) {
                    subjectCompleted++;
                }
            });
        });

        totalTopics += subjectTotal;
        completedTopics += subjectCompleted;

        subjectStats[subject] = {
            total: subjectTotal,
            completed: subjectCompleted,
            percentage: subjectTotal > 0 ? Math.round((subjectCompleted / subjectTotal) * 100) : 0
        };

        // Update circular progress
        updateCircularProgress(subject, subjectStats[subject].percentage);

        // Update counts
        const countEl = document.getElementById(`${subject}-count`);
        if (countEl) {
            countEl.textContent = `${subjectCompleted}/${subjectTotal}`;
        }

        const statsEl = document.getElementById(`${subject}-stats`);
        if (statsEl) {
            statsEl.textContent = `${subjectCompleted}/${subjectTotal} topics`;
        }
    });

    // Update overall progress
    const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const overallProgressEl = document.getElementById('overallProgress');
    if (overallProgressEl) {
        overallProgressEl.textContent = `${overallPercentage}%`;
    }

    const totalTopicsEl = document.getElementById('totalTopics');
    if (totalTopicsEl) {
        totalTopicsEl.textContent = `${completedTopics}/${totalTopics}`;
    }

    // Update study time
    const hours = Math.floor(appState.studyStats.totalStudyTime / 3600);
    const minutes = Math.floor((appState.studyStats.totalStudyTime % 3600) / 60);
    const studyTimeEl = document.getElementById('studyTime');
    if (studyTimeEl) {
        studyTimeEl.textContent = `${hours}h ${minutes}m`;
    }

    // Update streak
    updateStreak();
    const streakEl = document.getElementById('studyStreak');
    if (streakEl) {
        streakEl.textContent = appState.studyStats.streak;
    }

    // Update weekly stats
    const topicsThisWeek = document.getElementById('topicsThisWeek');
    if (topicsThisWeek) {
        topicsThisWeek.textContent = appState.studyStats.weeklyTopics || 0;
    }

    const timeThisWeek = document.getElementById('timeThisWeek');
    if (timeThisWeek) {
        const weekHours = Math.floor((appState.studyStats.weeklyTime || 0) / 3600);
        timeThisWeek.textContent = `${weekHours}h`;
    }

    // Update analytics
    updateAnalytics(subjectStats);
}

// Update Circular Progress
function updateCircularProgress(subject, percentage) {
    const circle = document.getElementById(`${subject}-circle`);
    const percentText = document.getElementById(`${subject}-percent`);

    if (circle && percentText) {
        const circumference = 2 * Math.PI * 60;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
        percentText.textContent = `${percentage}%`;
    }
}

// Update Streak
function updateStreak() {
    const today = new Date().toDateString();
    const lastStudy = appState.studyStats.lastStudyDate;

    if (lastStudy === today) {
        return;
    }

    if (lastStudy) {
        const lastDate = new Date(lastStudy);
        const currentDate = new Date(today);
        const diffTime = currentDate - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            appState.studyStats.streak++;
        } else if (diffDays > 1) {
            appState.studyStats.streak = 1;
        }
    } else {
        appState.studyStats.streak = 1;
    }

    appState.studyStats.lastStudyDate = today;
    localStorage.setItem('neetStudyStats', JSON.stringify(appState.studyStats));
}

// Update Weekly Stats
function updateWeeklyStats() {
    const today = new Date();
    const weekStart = appState.studyStats.weekStart;

    if (weekStart) {
        const start = new Date(weekStart);
        const diffTime = today - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 7) {
            // Reset weekly stats
            appState.studyStats.weeklyTopics = 0;
            appState.studyStats.weeklyTime = 0;
            appState.studyStats.weekStart = today.toISOString();
            localStorage.setItem('neetStudyStats', JSON.stringify(appState.studyStats));
        }
    } else {
        appState.studyStats.weekStart = today.toISOString();
        localStorage.setItem('neetStudyStats', JSON.stringify(appState.studyStats));
    }
}

// Update Analytics
function updateAnalytics(subjectStats) {
    const avgStudyTime = document.getElementById('avg-study-time');
    if (avgStudyTime && appState.studyStats.streak > 0) {
        const avgSeconds = appState.studyStats.totalStudyTime / appState.studyStats.streak;
        const avgHours = Math.floor(avgSeconds / 3600);
        const avgMinutes = Math.floor((avgSeconds % 3600) / 60);
        avgStudyTime.textContent = `${avgHours}h ${avgMinutes}m`;
    }

    const bestSubject = document.getElementById('best-subject');
    if (bestSubject) {
        let maxPercentage = 0;
        let best = '-';

        for (const [subject, stats] of Object.entries(subjectStats)) {
            if (stats.percentage > maxPercentage) {
                maxPercentage = stats.percentage;
                best = subject.charAt(0).toUpperCase() + subject.slice(1);
            }
        }

        bestSubject.textContent = best;
    }
}

// Study Timer Functions
function setTimerMode(mode) {
    if (appState.timer.isRunning) return;

    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    appState.timer.mode = mode;

    let minutes = 25;
    switch(mode) {
        case 'pomodoro': minutes = 25; break;
        case 'short': minutes = 5; break;
        case 'long': minutes = 15; break;
        case 'custom':
            minutes = parseInt(prompt('Enter minutes:', '25')) || 25;
            break;
    }

    appState.timer.seconds = minutes * 60;
    updateTimerDisplay();
}

function startTimer() {
    if (appState.timer.isRunning) return;

    if (appState.timer.seconds === 0) {
        appState.timer.seconds = 25 * 60;
    }

    appState.timer.isRunning = true;
    appState.timer.interval = setInterval(() => {
        if (appState.timer.seconds > 0) {
            appState.timer.seconds--;
            updateTimerDisplay();

            // Save every minute
            if (appState.timer.seconds % 60 === 0) {
                appState.studyStats.totalStudyTime += 60;
                appState.studyStats.weeklyTime = (appState.studyStats.weeklyTime || 0) + 60;
                localStorage.setItem('neetStudyStats', JSON.stringify(appState.studyStats));
                updateAllStats();
                updateStreak();
            }
        } else {
            pauseTimer();
            showNotification('⏰ Study session completed! Great work!');
        }
    }, 1000);
}

function pauseTimer() {
    appState.timer.isRunning = false;
    if (appState.timer.interval) {
        clearInterval(appState.timer.interval);
        appState.timer.interval = null;
    }
}

function resetTimer() {
    pauseTimer();
    appState.timer.seconds = 0;
    setTimerMode(appState.timer.mode);
}

function updateTimerDisplay() {
    const minutes = Math.floor(appState.timer.seconds / 60);
    const seconds = appState.timer.seconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const timerDisplay = document.getElementById('timer-display');
    if (timerDisplay) {
        timerDisplay.textContent = display;
    }
}

// Search Topics
function searchTopics(subject, query) {
    const container = document.getElementById(`${subject}-content`);
    if (!container) return;

    const chapters = container.querySelectorAll('.chapter-group');

    chapters.forEach(chapter => {
        const topics = chapter.querySelectorAll('.topic-item-new');
        let hasVisibleTopic = false;

        topics.forEach(topic => {
            const label = topic.querySelector('.topic-label').textContent.toLowerCase();
            if (label.includes(query.toLowerCase())) {
                topic.style.display = 'flex';
                hasVisibleTopic = true;
            } else {
                topic.style.display = 'none';
            }
        });

        chapter.style.display = hasVisibleTopic ? 'block' : 'none';
    });
}

// Filter Topics
function filterTopics(subject, filter, event) {
    const container = document.getElementById(`${subject}-content`);
    if (!container) return;

    // Update active chip
    const chips = event.target.parentElement.querySelectorAll('.chip');
    chips.forEach(chip => chip.classList.remove('active'));
    event.target.classList.add('active');

    const topics = container.querySelectorAll('.topic-item-new');

    topics.forEach(topic => {
        const isCompleted = topic.classList.contains('completed');

        if (filter === 'all') {
            topic.style.display = 'flex';
        } else if (filter === 'completed' && isCompleted) {
            topic.style.display = 'flex';
        } else if (filter === 'pending' && !isCompleted) {
            topic.style.display = 'flex';
        } else {
            topic.style.display = 'none';
        }
    });
}

// Notes Functions
function saveNotes() {
    const notes = document.getElementById('notes-textarea').value;
    localStorage.setItem('neetStudyNotes', notes);
    showNotification('📝 Notes saved successfully!');
}

function loadNotes() {
    const notes = localStorage.getItem('neetStudyNotes') || '';
    const textarea = document.getElementById('notes-textarea');
    if (textarea) {
        textarea.value = notes;
    }
}

// Auto-save notes
setInterval(() => {
    const textarea = document.getElementById('notes-textarea');
    if (textarea && textarea.value) {
        localStorage.setItem('neetStudyNotes', textarea.value);
    }
}, 30000);

// Achievements System
function checkAchievements() {
    const totalCompleted = countCompletedTopics();

    const achievements = {
        'first-topic': totalCompleted >= 1,
        '10-topics': totalCompleted >= 10,
        '50-topics': totalCompleted >= 50,
        '100-topics': totalCompleted >= 100,
        '7-day-streak': appState.studyStats.streak >= 7,
        '30-day-streak': appState.studyStats.streak >= 30,
        'physics-complete': isSubjectComplete('physics'),
        'chemistry-complete': isSubjectComplete('chemistry'),
        'biology-complete': isSubjectComplete('biology'),
        '50-hours': appState.studyStats.totalStudyTime >= 180000,
        '100-hours': appState.studyStats.totalStudyTime >= 360000,
        'all-complete': isSubjectComplete('physics') && isSubjectComplete('chemistry') && isSubjectComplete('biology')
    };

    for (const [key, achieved] of Object.entries(achievements)) {
        const element = document.getElementById(`achievement-${key}`);
        if (element && achieved) {
            if (!element.classList.contains('unlocked')) {
                element.classList.add('unlocked');
                if (appState.achievements[key] !== true) {
                    showNotification(`🏆 Achievement Unlocked: ${element.querySelector('.achievement-name').textContent}!`);
                }
            }
            appState.achievements[key] = true;
        }
    }

    localStorage.setItem('neetAchievements', JSON.stringify(appState.achievements));
}

function countCompletedTopics() {
    let count = 0;
    ['physics', 'chemistry', 'biology'].forEach(subject => {
        Object.values(appState.progress[subject]).forEach(completed => {
            if (completed) count++;
        });
    });
    return count;
}

function isSubjectComplete(subject) {
    let total = 0;
    let completed = 0;

    Object.values(syllabusData[subject]).forEach(topics => {
        total += topics.length;
        topics.forEach(topic => {
            const chapter = Object.keys(syllabusData[subject]).find(ch =>
                syllabusData[subject][ch].includes(topic)
            );
            const topicKey = `${chapter}::${topic}`;
            if (appState.progress[subject][topicKey]) {
                completed++;
            }
        });
    });

    return total > 0 && total === completed;
}

// Goals Functions
function addGoal() {
    const goalTitle = prompt('Enter goal title:');
    if (!goalTitle) return;

    const goalTarget = parseInt(prompt('Enter target value:'));
    if (!goalTarget) return;

    const goalsList = document.getElementById('goals-list');
    const goalItem = document.createElement('div');
    goalItem.className = 'goal-item';
    goalItem.innerHTML = `
        <div class="goal-header">
            <span class="goal-title">${goalTitle}</span>
            <span style="color: var(--text-secondary); font-size: 0.875rem;">0/${goalTarget}</span>
        </div>
        <div class="goal-progress-bar">
            <div class="goal-progress-fill" style="width: 0%"></div>
        </div>
    `;

    goalsList.appendChild(goalItem);
}

// Export Data
function exportData() {
    const data = {
        progress: appState.progress,
        stats: appState.studyStats,
        achievements: appState.achievements,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `neet-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    showNotification('📥 Data exported successfully!');
}

// Notification System
function showNotification(message) {
    // Check if browser supports notifications
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('NEET 2026 Tracker', {
            body: message,
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🎯</text></svg>'
        });
    } else {
        alert(message);
    }
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save notes
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (document.getElementById('notes-view').classList.contains('active')) {
            saveNotes();
        }
    }

    // Ctrl/Cmd + E to export data
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportData();
    }

    // Space to start/pause timer
    if (e.code === 'Space' && document.getElementById('timer-view').classList.contains('active')) {
        e.preventDefault();
        if (appState.timer.isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
});
