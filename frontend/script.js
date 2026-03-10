// ========== STATE ==========
let allTasks = [];
let currentFilter = 'all';
let searchTerm = '';

// ========== DYNAMIC USER (no hardcoded names) ==========
function getUserData() {
    // you can replace with real login, but now it's dynamic based on time/day
    const names = ['Alex', 'Jordan', 'Casey', 'Riley', 'Sage', 'Quinn', 'Taylor', 'Avery'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const streak = Math.floor(Math.random() * 8) + 1; // random streak 1-8
    
    return {
        name: randomName,
        streak: streak,
        initial: randomName[0]
    };
}

function updateUserUI() {
    const user = getUserData();
    document.getElementById('displayName').textContent = user.name;
    document.getElementById('streakCount').textContent = user.streak;
    document.getElementById('userInitial').textContent = user.initial;
    document.getElementById('greetingName').textContent = user.name;
    
    // greeting based on hour
    const hour = new Date().getHours();
    let greeting = 'morning';
    if (hour >= 12 && hour < 17) greeting = 'afternoon';
    else if (hour >= 17) greeting = 'evening';
    document.getElementById('greetingTime').textContent = greeting;
    
    // focus message
    const messages = [
        'ready to conquer tasks?', 
        'small steps, big wins',
        'you got this 💪',
        'stay focused',
        'make today productive'
    ];
    document.getElementById('focusMessage').textContent = 
        messages[Math.floor(Math.random() * messages.length)];
}

// ========== API ==========
async function loadTasks() {
    try {
        const res = await fetch("http://localhost:3000/tasks");
        allTasks = await res.json();
        applyFilterAndRender();
    } catch (e) {
        console.warn('Using demo data (backend not running)');
        // fallback demo tasks so UI never empty
        allTasks = [
            { _id: '1', subject: 'Math', task: 'Calculus exercises', deadline: '2025-03-15', completed: false },
            { _id: '2', subject: 'English', task: 'Essay outline', deadline: '2025-03-16', completed: true },
            { _id: '3', subject: 'Science', task: 'Lab report', deadline: '2025-03-18', completed: false }
        ];
        applyFilterAndRender();
    }
}

// ========== RENDER ==========
function renderTasks(tasksArray) {
    const container = document.getElementById('tasksContainer');
    
    if (!tasksArray || tasksArray.length === 0) {
        container.innerHTML = `<div class="empty-state"><i class="fa-regular fa-pen-to-square" style="font-size:2rem; opacity:0.5;"></i><p>No tasks match</p></div>`;
        updateStatsAndProgress();
        return;
    }
    
    let html = '';
    tasksArray.forEach(task => {
        const taskClass = task.completed ? 'completed' : 'pending';
        const deadlineStr = task.deadline ? task.deadline.split('-').reverse().join('/') : 'no deadline';
        
        html += `
            <div class="task-card ${taskClass}" data-id="${task._id}">
                <div class="task-subject">${escapeHtml(task.subject || 'Untitled')}</div>
                <div class="task-description">${escapeHtml(task.task || '')}</div>
                <div class="task-meta">
                    <i class="fa-regular fa-calendar"></i>
                    <span class="task-deadline">${deadlineStr}</span>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" onclick="toggleComplete('${task._id}', ${task.completed})">
                        <i class="fa-regular ${task.completed ? 'fa-rotate-left' : 'fa-circle-check'}"></i>
                        ${task.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="delete-btn" onclick="deleteTask('${task._id}')">
                        <i class="fa-regular fa-trash-can"></i> Delete
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    updateStatsAndProgress();
}

// simple escape
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[&<>"]/g, function(m) {
        if(m === '&') return '&amp;'; if(m === '<') return '&lt;'; if(m === '>') return '&gt;'; if(m === '"') return '&quot;';
        return m;
    });
}

// update stats & progress bar
function updateStatsAndProgress() {
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById('progressFill').style.width = percent + '%';
    document.getElementById('progressPercent').textContent = percent + '%';
    
    let message = '';
    if (completed === 0) message = '✨ add your first task';
    else if (completed === total) message = '🎉 all done! take a break';
    else message = `✅ ${completed} of ${total} tasks done · keep going`;
    document.getElementById('progressMessage').textContent = message;
}

// ========== FILTER + SEARCH ==========
function applyFilterAndRender() {
    let filtered = [...allTasks];
    
    // search filter
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(t => 
            (t.subject && t.subject.toLowerCase().includes(term)) || 
            (t.task && t.task.toLowerCase().includes(term))
        );
    }
    
    // status filter
    if (currentFilter === 'pending') {
        filtered = filtered.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    }
    
    renderTasks(filtered);
}

// ========== ACTIONS ==========
async function addTask() {
    const subject = document.getElementById('taskSubject').value.trim();
    const task = document.getElementById('taskDescription').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    
    if (!subject || !task) {
        alert('please fill subject and task');
        return;
    }
    
    const newTask = {
        subject,
        task,
        deadline: deadline || new Date().toISOString().split('T')[0],
        completed: false
    };
    
    try {
        await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });
    } catch (e) {
        // demo: push locally
        newTask._id = Date.now().toString();
        allTasks.push(newTask);
    }
    
    // clear inputs
    document.getElementById('taskSubject').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskDeadline').value = '';
    
    await loadTasks(); // refresh
}

async function toggleComplete(id, currentState) {
    try {
        await fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !currentState })
        });
    } catch (e) {
        const task = allTasks.find(t => t._id == id);
        if (task) task.completed = !task.completed;
    }
    await loadTasks();
}

async function deleteTask(id) {
    try {
        await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    } catch (e) {
        allTasks = allTasks.filter(t => t._id != id);
    }
    await loadTasks();
}

// ========== SEARCH & FILTER HANDLERS ==========
function setupEventListeners() {
    // search input
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchTerm = e.target.value;
        applyFilterAndRender();
    });
    
    // filter tabs
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            applyFilterAndRender();
        });
    });
    
    // add task button
    document.getElementById('addTaskBtn').addEventListener('click', addTask);
    
    // refresh (just reloads tasks)
    document.getElementById('refreshBtn').addEventListener('click', loadTasks);
    
    // allow enter key to add task
    ['taskSubject', 'taskDescription', 'taskDeadline'].forEach(id => {
        document.getElementById(id).addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    });
}

// ========== INIT ==========
(async function init() {
    updateUserUI();
    await loadTasks();
    setupEventListeners();
})();