const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 8080;

// 파일 저장을 위한 multer 설정
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// recovery.js에서 recoverFile 함수 가져오기
const { recoverFile } = require('./recovery');

// CORS 미들웨어를 사용하여 모든 도메인의 요청을 허용
app.use(cors());

// 정적 파일 제공을 위한 설정
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로에 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 파일 업로드 및 복구 처리 라우트
app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;
    const recoveryTool = req.body.recoveryTool;

    recoverFile(filePath, recoveryTool, (error, result) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Failed to recover file');
        }
        console.log(`stdout: ${result.stdout}`);
        console.error(`stderr: ${result.stderr}`);
        res.send('File recovery process completed');
    });
});

// 폴더 복구를 위한 라우트
app.post('/recover', (req, res) => {
    const folderPath = req.body.folderPath;

    // 폴더 복구 로직 수행
    // folderPath를 이용하여 해당 폴더 내의 파일들을 복구하는 작업을 수행합니다.

    // 예시로 폴더 경로를 로그에 출력하는 것으로 대체
    console.log('Folder path for recovery:', folderPath);

    res.send('Folder recovery process started');
});

// 서버 리스닝 시작
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
