document.getElementById('file-input').addEventListener('change', handleFileSelect);
document.getElementById('folder-input').addEventListener('change', handleFolderSelect);
document.getElementById('select-folder').addEventListener('click', selectFolder);
document.getElementById('submit-button').addEventListener('click', uploadFiles);

function handleFileSelect(event) {
    const files = event.target.files;
    previewFiles(files);
}

function handleFolderSelect(event) {
    const folderPath = event.target.files[0].webkitRelativePath.split('/')[0]; // 폴더 경로 추출
    document.getElementById('folder-path').value = folderPath; // 폴더 경로를 hidden input에 설정
    document.getElementById('selected-folder').textContent = "선택한 폴더: " + event.target.files[0].webkitRelativePath; // 전체 경로를 표시
}

function previewFiles(files) {
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px';
            img.style.maxHeight = '200px';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function selectFolder() {
    document.getElementById('folder-input').click();
}

function uploadFiles() {
    const files = document.getElementById('file-input').files;
    const formData = new FormData();
    const recoveryTool = document.getElementById('recoveryTool').value;

    for (const file of files) {
        formData.append('file', file);
    }
    // 폴더 경로를 FormData에 추가
    const folderPath = document.getElementById('folder-path').value;
    formData.append('folderPath', folderPath);
    formData.append('recoveryTool', recoveryTool);

    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Error:', error));
}
