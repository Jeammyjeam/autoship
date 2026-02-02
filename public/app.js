// AutoShip Frontend JavaScript

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('upload-section');
const analysisSection = document.getElementById('analysis-section');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const loadingStatus = document.getElementById('loading-status');

let currentAnalysis = null;

// Drag and drop handlers
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

// File input handler
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

// Handle file upload
async function handleFileUpload(file) {
    // Validate file
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
        alert('File too large! Maximum size is 50MB');
        return;
    }

    // Show loading
    uploadSection.classList.remove('active');
    analysisSection.classList.add('active');
    loading.style.display = 'block';
    results.style.display = 'none';

    // Simulate analysis stages
    const stages = [
        'Uploading file...',
        'Extracting contents...',
        'Reading files...',
        'Detecting framework...',
        'Analyzing code with AI...',
        'Checking for issues...',
        'Generating recommendations...'
    ];

    let stageIndex = 0;
    const stageInterval = setInterval(() => {
        if (stageIndex < stages.length) {
            loadingStatus.textContent = stages[stageIndex];
            stageIndex++;
        }
    }, 1000);

    try {
        // Upload file
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        clearInterval(stageInterval);

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        currentAnalysis = data;

        // Display results
        displayResults(data);

    } catch (error) {
        clearInterval(stageInterval);
        console.error('Upload error:', error);
        alert(`Error: ${error.message}`);
        resetUpload();
    }
}

// Display analysis results
function displayResults(data) {
    loading.style.display = 'none';
    results.style.display = 'block';

    const analysis = data.analysis || {};

    // Project details
    document.getElementById('projectType').textContent = analysis.projectType || 'Unknown';
    document.getElementById('framework').textContent = analysis.framework || 'Not detected';
    document.getElementById('language').textContent = analysis.language || 'Unknown';
    document.getElementById('entryPoint').textContent = analysis.entryPoint || 'Not found';
    document.getElementById('filesCount').textContent = data.filesFound || 0;

    // Issues
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    if (analysis.issues && analysis.issues.length > 0) {
        analysis.issues.forEach(issue => {
            const issueDiv = document.createElement('div');
            issueDiv.className = `issue-item ${issue.severity || 'info'}`;
            issueDiv.innerHTML = `
                <div class="severity-badge ${issue.severity || 'info'}">${issue.severity || 'INFO'}</div>
                <div><strong>${issue.file || 'General'}</strong></div>
                <div>${issue.description}</div>
                ${issue.fix ? `<div style="margin-top: 8px; color: #059669;"><strong>Fix:</strong> ${issue.fix}</div>` : ''}
            `;
            issuesList.appendChild(issueDiv);
        });
    } else {
        issuesList.innerHTML = '<p style="color: #059669;">✓ No issues found! Code looks good.</p>';
    }

    // Deployment recommendation
    document.getElementById('platform').textContent = analysis.deploymentPlatform || 'Auto-detect';
    
    const recommendationsDiv = document.getElementById('recommendations');
    if (analysis.recommendations && analysis.recommendations.length > 0) {
        recommendationsDiv.innerHTML = '<ul style="margin-top: 10px;">' + 
            analysis.recommendations.map(rec => `<li>${rec}</li>`).join('') + 
            '</ul>';
    } else {
        recommendationsDiv.innerHTML = '<p>Ready to deploy!</p>';
    }
}

// Deploy project (placeholder)
function deployProject() {
    alert('🚀 Deployment feature coming soon!\n\nThis will:\n- Auto-configure deployment settings\n- Connect to hosting platform\n- Deploy your code\n- Provide live URL');
}

// Reset upload
function resetUpload() {
    uploadSection.classList.add('active');
    analysisSection.classList.remove('active');
    fileInput.value = '';
    currentAnalysis = null;
}

// Health check on load
window.addEventListener('load', async () => {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('AutoShip API:', data);
    } catch (error) {
        console.warn('Could not connect to API');
    }
});
