// Store processes
let processes = [];
let nextProcessId = 1;

// Process class
class Process {
    constructor(arrivalTime, burstTime, priority = 0) {
        this.id = `P${nextProcessId++}`;
        this.arrivalTime = parseInt(arrivalTime);
        this.burstTime = parseInt(burstTime);
        this.priority = parseInt(priority);
        this.remainingTime = parseInt(burstTime);
        this.startTime = null;
        this.firstResponse = null;  // For response time calculation
        this.finishTime = null;
        this.waitingTime = 0;
        this.turnaroundTime = 0;
        this.responseTime = 0;
    }

    // Reset process state for new simulation
    reset() {
        this.remainingTime = this.burstTime;
        this.startTime = null;
        this.firstResponse = null;
        this.finishTime = null;
        this.waitingTime = 0;
        this.turnaroundTime = 0;
        this.responseTime = 0;
    }

    // Create a copy of the process for simulation
    clone() {
        const copy = new Process(this.arrivalTime, this.burstTime, this.priority);
        copy.id = this.id; // Keep the same ID
        nextProcessId--; // Decrement the counter since we don't want a new ID
        return copy;
    }
}

// Event Listeners
document.getElementById('processForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addProcess();
});

document.getElementById('algorithmSelect').addEventListener('change', function() {
    const quantumInput = document.getElementById('quantumInput');
    quantumInput.style.display = this.value === 'rr' ? 'block' : 'none';
});

// Add process to table
function addProcess() {
    const arrivalTime = document.getElementById('arrivalTime').value;
    const burstTime = document.getElementById('burstTime').value;
    const priority = document.getElementById('priority').value || 0;

    // Validate input
    if (!arrivalTime || !burstTime) {
        alert('Please fill in all required fields');
        return;
    }

    const process = new Process(arrivalTime, burstTime, priority);
    processes.push(process);
    updateProcessTable();
    clearInputs();
}

// Update process table
function updateProcessTable() {
    const tableBody = document.getElementById('processTableBody');
    tableBody.innerHTML = '';

    processes.forEach((process, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.id}</td>
            <td>${process.arrivalTime}</td>
            <td>${process.burstTime}</td>
            <td>${process.priority}</td>
            <td>
                <button onclick="editProcess(${index})" class="btn-remove">Edit</button>
                <button onclick="removeProcess(${index})" class="btn-remove">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


// Edit process
function editProcess(index) {
    const process = processes[index];
    document.getElementById('arrivalTime').value = process.arrivalTime;
    document.getElementById('burstTime').value = process.burstTime;
    document.getElementById('priority').value = process.priority;
    
    // Remove the process from the array
    processes.splice(index, 1);
    updateProcessTable();
}

// Clear input fields
function clearInputs() {
    document.getElementById('arrivalTime').value = '';
    document.getElementById('burstTime').value = '';
    document.getElementById('priority').value = '0';
}

// Remove process
function removeProcess(index) {
    processes.splice(index, 1);
    updateProcessTable();
}

// Clear all processes
function clearAllProcesses() {
    processes = [];
    nextProcessId = 1;
    updateProcessTable();
    clearResults();
}

// Clear results
function clearResults() {
    document.getElementById('ganttChart').innerHTML = '';
    document.getElementById('metricsTableBody').innerHTML = '';
    document.getElementById('avgWaitingTime').textContent = '-';
    document.getElementById('avgTurnaroundTime').textContent = '-';
    document.getElementById('avgResponseTime').textContent = '-';
    document.getElementById('cpuUtilization').textContent = '-';
}

// Scheduling Algorithms
function fcfs(processes) {
    const timeline = [];
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;

    sortedProcesses.forEach(process => {
        if (currentTime < process.arrivalTime) {
            currentTime = process.arrivalTime;
        }
        
        process.startTime = currentTime;
        if (process.firstResponse === null) {
            process.firstResponse = currentTime;
        }
        
        process.finishTime = currentTime + process.burstTime;
        process.turnaroundTime = process.finishTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;
        process.responseTime = process.firstResponse - process.arrivalTime;
        
        timeline.push({
            id: process.id,
            start: currentTime,
            end: process.finishTime
        });
        
        currentTime = process.finishTime;
    });

    return { timeline, processes: sortedProcesses };
}



function sjf(processes) {
    const timeline = [];
    const completed = [];
    let currentTime = 0;
    const processQueue = processes.map(p => ({ ...p }));

    while (completed.length < processes.length) {
        const available = processQueue.filter(p => 
            p.arrivalTime <= currentTime && 
            !completed.includes(p)
        );

        if (available.length === 0) {
            currentTime++;
            continue;
        }

        const shortest = available.reduce((min, p) => 
            p.burstTime < min.burstTime ? p : min
        );

        shortest.startTime = currentTime;
        if (shortest.firstResponse === null) {
            shortest.firstResponse = currentTime;
        }
        
        shortest.finishTime = currentTime + shortest.burstTime;
        shortest.turnaroundTime = shortest.finishTime - shortest.arrivalTime;
        shortest.waitingTime = shortest.turnaroundTime - shortest.burstTime;
        shortest.responseTime = shortest.firstResponse - shortest.arrivalTime;

        timeline.push({
            id: shortest.id,
            start: currentTime,
            end: shortest.finishTime
        });

        currentTime = shortest.finishTime;
        completed.push(shortest);
    }

    return { timeline, processes: completed };
}

function roundRobin(processes, quantum) {
    const timeline = [];
    const completed = [];
    const processQueue = processes.map(p => ({ ...p }));
    let currentTime = 0;

    while (processQueue.length > 0) {
        const current = processQueue.shift();
        
        if (current.firstResponse === null) {
            current.firstResponse = currentTime;
        }

        const executeTime = Math.min(quantum, current.remainingTime);
        
        timeline.push({
            id: current.id,
            start: currentTime,
            end: currentTime + executeTime
        });

        current.remainingTime -= executeTime;
        currentTime += executeTime;

        if (current.remainingTime > 0) {
            processQueue.push(current);
        } else {
            current.finishTime = currentTime;
            current.turnaroundTime = current.finishTime - current.arrivalTime;
            current.waitingTime = current.turnaroundTime - current.burstTime;
            current.responseTime = current.firstResponse - current.arrivalTime;
            completed.push(current);
        }
    }

    return { timeline, processes: completed };
}

function priorityScheduling(processes) {
    const timeline = [];
    const completed = [];
    const completedIds = new Set();
    let currentTime = 0;

    const processQueue = processes.map(p => ({
        ...p,
        startTime: null,
        finishTime: null,
        turnaroundTime: null,
        waitingTime: null,
        responseTime: null,
        firstResponse: null
    }));

    while (completed.length < processes.length) {
        const available = processQueue.filter(p =>
            p.arrivalTime <= currentTime && !completedIds.has(p.id)
        );

        if (available.length === 0) {
            currentTime++;
            continue;
        }

        const highest = available.reduce((max, p) =>
            p.priority > max.priority ? p : max
        );

        highest.startTime = currentTime;
        if (highest.firstResponse == null) {
            highest.firstResponse = currentTime;
        }

        highest.finishTime = currentTime + highest.burstTime;
        highest.turnaroundTime = highest.finishTime - highest.arrivalTime;
        highest.waitingTime = highest.turnaroundTime - highest.burstTime;
        highest.responseTime = highest.firstResponse - highest.arrivalTime;

        timeline.push({
            id: highest.id,
            start: currentTime,
            end: highest.finishTime
        });

        currentTime = highest.finishTime;
        completed.push(highest);
        completedIds.add(highest.id);
    }

    return { timeline, processes: completed };
}


function srtf(processes) {
    const timeline = [];
    const completed = [];
    let currentTime = 0;
    const processQueue = processes.map(p => ({ ...p }));
    let currentProcess = null;
    let lastProcessId = null;
    let lastStartTime = 0;

    while (completed.length < processes.length) {
        const available = processQueue.filter(p => 
            p.arrivalTime <= currentTime && 
            p.remainingTime > 0
        );

        if (available.length === 0) {
            currentTime++;
            continue;
        }

        currentProcess = available.reduce((min, p) => 
            p.remainingTime < min.remainingTime ? p : min
        );

        if (currentProcess.firstResponse === null) {
            currentProcess.firstResponse = currentTime;
        }

        if (currentProcess.id !== lastProcessId) {
            if (lastProcessId !== null) {
                timeline.push({
                    id: lastProcessId,
                    start: lastStartTime,
                    end: currentTime
                });
            }
            lastProcessId = currentProcess.id;
            lastStartTime = currentTime;
        }

        currentProcess.remainingTime--;
        
        if (currentProcess.remainingTime === 0) {
            currentProcess.finishTime = currentTime + 1;
            currentProcess.turnaroundTime = currentProcess.finishTime - currentProcess.arrivalTime;
            currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
            currentProcess.responseTime = currentProcess.firstResponse - currentProcess.arrivalTime;
            
            timeline.push({
                id: currentProcess.id,
                start: lastStartTime,
                end: currentTime + 1
            });
            
            completed.push(currentProcess);
            lastProcessId = null;
        }

        currentTime++;
    }

    return { timeline, processes: completed };
}

// Run simulation
function runSimulation() {
    if (processes.length === 0) {
        alert('Please add some processes first!');
        return;
    }

    // Reset all processes
    processes.forEach(p => p.reset());

    const algorithm = document.getElementById('algorithmSelect').value;
    let result;

    try {
        switch(algorithm) {
            case 'fcfs':
                result = fcfs([...processes]);
                break;
            case 'sjf':
                result = sjf([...processes]);
                break;
            case 'rr':
                const quantum = parseInt(document.getElementById('timeQuantum').value);
                if (!quantum || quantum <= 0) {
                    alert('Please enter a valid time quantum (positive number)');
                    return;
                }
                result = roundRobin([...processes], quantum);
                break;
            case 'priority':
                result = priorityScheduling([...processes]);
                break;
            case 'srtf':
                result = srtf([...processes]);
                break;
            default:
                alert('Please select a scheduling algorithm');
                return;
        }

        displayResults(result);
    } catch (error) {
        console.error('Simulation error:', error);
        alert('An error occurred during simulation. Please check your process data.');
    }
}

// Display results
function displayResults(result) {
    // Display Gantt Chart
    const ganttChart = document.getElementById('ganttChart');
    ganttChart.innerHTML = createGanttChart(result.timeline);

    // Update Metrics Table
    const metricsTableBody = document.getElementById('metricsTableBody');
    metricsTableBody.innerHTML = '';

    result.processes.forEach(process => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.id}</td>
            <td>${process.arrivalTime}</td>
            <td>${process.burstTime}</td>
            <td>${process.finishTime}</td>
            <td>${process.turnaroundTime}</td>
            <td>${process.waitingTime}</td>
            <td>${process.responseTime}</td>
        `;
        metricsTableBody.appendChild(row);
    });

    // Calculate and display averages
    const avgWaiting = result.processes.reduce((sum, p) => sum + p.waitingTime, 0) / processes.length;
    const avgTurnaround = result.processes.reduce((sum, p) => sum + p.turnaroundTime, 0) / processes.length;
    const avgResponse = result.processes.reduce((sum, p) => sum + p.responseTime, 0) / processes.length;

    document.getElementById('avgWaitingTime').textContent = avgWaiting.toFixed(2);
    document.getElementById('avgTurnaroundTime').textContent = avgTurnaround.toFixed(2);
    document.getElementById('avgResponseTime').textContent = avgResponse.toFixed(2);

    // Calculate CPU Utilization
    const totalTime = Math.max(...result.timeline.map(t => t.end));
    const busyTime = result.timeline.reduce((sum, t) => sum + (t.end - t.start), 0);
    const cpuUtilization = ((busyTime / totalTime) * 100).toFixed(1);
    document.getElementById('cpuUtilization').textContent = `${cpuUtilization}%`;
}

// Create Gantt chart
function createGanttChart(timeline) {
    const colors = {
        'P1': '#3498db',
        'P2': '#2ecc71',
        'P3': '#e74c3c',
        'P4': '#f1c40f',
        'P5': '#9b59b6',
        'P6': '#1abc9c',
        'P7': '#d35400',
        'P8': '#8e44ad',
        'P9': '#16a085',
        'P10': '#c0392b'
    };

    const endTime = Math.max(...timeline.map(item => item.end));
    const timeScale = Math.min(50, Math.max(30, Math.floor(800 / endTime)));

    let html = `
        <div class="gantt-wrapper">
            <div class="gantt-time-scale">`;
    
    for (let i = 0; i <= endTime; i++) {
        html += `<div class="time-marker" style="left: ${i * timeScale}px">${i}</div>`;
    }
    
    html += `</div>
        <div class="gantt-container">`;

    const processGroups = {};
    timeline.forEach(item => {
        if (!processGroups[item.id]) {
            processGroups[item.id] = [];
        }
        processGroups[item.id].push(item);
    });

    Object.entries(processGroups).forEach(([processId, items]) => {
        const color = colors[processId] || '#bdc3c7';
        
        html += `
            <div class="process-row">
                <div class="process-label">${processId}</div>
                <div class="process-timeline">`;

        let lastEnd = 0;
        items.forEach(item => {
            if (item.start > lastEnd) {
                html += `
                    <div class="idle-block" style="
                        left: ${lastEnd * timeScale}px;
                        width: ${(item.start - lastEnd) * timeScale}px;
                    "></div>`;
            }

            html += `
                <div class="process-block" style="
                    left: ${item.start * timeScale}px;
                    width: ${(item.end - item.start) * timeScale}px;
                    background-color: ${color};
                ">
                    <div class="block-info">
                        <span class="time-info">${item.start}-${item.end}</span>
                        <span class="duration-info">(${item.end - item.start})</span>
                    </div>
                </div>`;

            lastEnd = item.end;
        });

        html += `
                </div>
            </div>`;
    });

    html += `
        </div>
    </div>`;

    return html;
}

// Quiz functionality
const quizQuestions = [
    {
        question: "Which scheduling algorithm is best for processes with equal burst time?",
        options: ["FCFS", "SJF", "Round Robin", "Priority"],
        correct: 0,
        explanation: "FCFS is fair for equal burst time processes as they are executed in arrival order."
    },
    {
        question: "Which algorithm may cause starvation?",
        options: ["FCFS", "SJF", "Round Robin", "All of the above"],
        correct: 1,
        explanation: "SJF can cause starvation as shorter processes may keep arriving, delaying longer processes indefinitely."
    },
    {
        question: "Which algorithm is best for interactive systems?",
        options: ["FCFS", "SJF", "Round Robin", "Priority"],
        correct: 2,
        explanation: "Round Robin ensures fair CPU time distribution, making it ideal for interactive systems."
    },
    {
        question: "What is the main advantage of Priority Scheduling?",
        options: ["Simplicity", "Fairness", "Important tasks first", "Low overhead"],
        correct: 2,
        explanation: "Priority scheduling ensures important tasks get CPU time first based on their priority."
    },
    {
        question: "Which algorithm is most efficient for CPU utilization?",
        options: ["FCFS", "SJF", "SRTF", "Round Robin"],
        correct: 2,
        explanation: "SRTF minimizes average waiting time and maximizes CPU utilization."
    }
];

let currentQuizScore = 0;
let questionsAnswered = 0;

function startQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.display = 'block';
    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h3>OS Scheduling Quiz</h3>
            <div class="quiz-score">Score: <span id="quizScore">0</span>/<span id="totalQuestions">${quizQuestions.length}</span></div>
        </div>
    `;

    currentQuizScore = 0;
    questionsAnswered = 0;
    
    quizQuestions.forEach((q, i) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            <div class="quiz-options">
                ${q.options.map((opt, j) => `
                    <div class="quiz-option" onclick="selectOption(${i}, ${j})">
                        ${opt}
                    </div>
                `).join('')}
            </div>
            <div class="explanation" id="explanation-${i}" style="display: none; margin-top: 10px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                ${q.explanation}
            </div>
        `;
        quizContainer.appendChild(questionDiv);
    });
}

function selectOption(questionIndex, optionIndex) {
    if (document.querySelector(`.quiz-question:nth-child(${questionIndex + 2}) .quiz-option.answered`)) {
        return; // Question already answered
    }

    const options = document.querySelectorAll(`.quiz-question:nth-child(${questionIndex + 2}) .quiz-option`);
    const explanationDiv = document.getElementById(`explanation-${questionIndex}`);
    
    options.forEach(opt => {
        opt.classList.add('answered');
        opt.style.pointerEvents = 'none';
    });

    if (optionIndex === quizQuestions[questionIndex].correct) {
        options[optionIndex].style.backgroundColor = '#2ecc71';
        currentQuizScore++;
    } else {
        options[optionIndex].style.backgroundColor = '#e74c3c';
        options[quizQuestions[questionIndex].correct].style.backgroundColor = '#2ecc71';
    }

    questionsAnswered++;
    document.getElementById('quizScore').textContent = currentQuizScore;
    explanationDiv.style.display = 'block';

    if (questionsAnswered === quizQuestions.length) {
        showFinalScore();
    }
}

function showFinalScore() {
    const percentage = (currentQuizScore / quizQuestions.length) * 100;
    const quizContainer = document.getElementById('quizContainer');
    
    quizContainer.insertAdjacentHTML('afterbegin', `
        <div class="final-score" style="
            margin-bottom: 20px;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 4px;
            text-align: center;
            font-size: 1.2em;
        ">
            <h3>Quiz Complete!</h3>
            <p>Your Score: ${currentQuizScore}/${quizQuestions.length} (${percentage.toFixed(1)}%)</p>
            <button onclick="startQuiz()" class="btn-quiz" style="margin-top: 10px;">Retry Quiz</button>
        </div>
    `);
}

// AI Recommendation
function getRecommendation() {
    const recommendationDiv = document.getElementById('recommendationResult');
    
    if (processes.length === 0) {
        recommendationDiv.innerHTML = "Add some processes to get AI recommendations.";
        return;
    }

    // Calculate metrics
    const avgBurstTime = processes.reduce((sum, p) => sum + p.burstTime, 0) / processes.length;
    const hasPriorities = processes.some(p => p.priority > 0);
    const processCount = processes.length;
    const maxBurstTime = Math.max(...processes.map(p => p.burstTime));
    const burstTimeVariance = processes.reduce((sum, p) => sum + Math.pow(p.burstTime - avgBurstTime, 2), 0) / processes.length;
    
    let recommendation = "<h3>AI Analysis & Recommendations</h3>\n\n";
    recommendation += "<strong>Process Characteristics:</strong>\n";
    recommendation += `• Number of Processes: ${processCount}\n`;
    recommendation += `• Average Burst Time: ${avgBurstTime.toFixed(2)}\n`;
    recommendation += `• Burst Time Variance: ${burstTimeVariance.toFixed(2)}\n`;
    recommendation += `• Maximum Burst Time: ${maxBurstTime}\n`;
    recommendation += `• Priority Levels Used: ${hasPriorities ? 'Yes' : 'No'}\n\n`;
    
    recommendation += "<strong>Recommended Algorithms:</strong>\n";
    
    if (processCount <= 3 && avgBurstTime < 10) {
        recommendation += "✅ <strong>FCFS</strong> - Suitable for small batch with low overhead\n";
        recommendation += "   • Simple implementation\n";
        recommendation += "   • Fair for similar burst times\n";
    }
    
    if (burstTimeVariance > 20 || avgBurstTime > 10) {
        recommendation += "✅ <strong>SJF</strong> - Efficient for varied burst times\n";
        recommendation += "   • Minimizes average waiting time\n";
        recommendation += "   • Best for batch processing\n";
    }
    
    if (processCount > 5 || burstTimeVariance < 10) {
        recommendation += "✅ <strong>Round Robin</strong> - Good for fair CPU distribution\n";
        recommendation += "   • Ensures responsiveness\n";
        recommendation += "   • Prevents starvation\n";
    }
    
    if (hasPriorities) {
        recommendation += "✅ <strong>Priority Scheduling</strong> - Matches your priority requirements\n";
        recommendation += "   • Handles important tasks first\n";
        recommendation += "   • Good for real-time systems\n";
    }
    
    if ((avgBurstTime > 15 && processCount > 3) || burstTimeVariance > 30) {
        recommendation += "✅ <strong>SRTF</strong> - Optimal for long-running processes\n";
        recommendation += "   • Minimizes average waiting time\n";
        recommendation += "   • Best CPU utilization\n";
    }
    
    recommendationDiv.innerHTML = recommendation.replace(/\n/g, '<br>');
} 
