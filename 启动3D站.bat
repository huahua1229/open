@echo off
chcp 65001 >nul
title POLARIS 3D 站本地服务器
cd /d "%~dp0"
echo ============================================
echo   POLARIS 3D 站启动中...
echo   浏览器将自动打开 http://localhost:4173/
echo   关闭此窗口即停止服务器
echo ============================================
start "" /min cmd /c "npm run preview -- --port 4173 --strictPort"
timeout /t 5 /nobreak >nul
start "" http://localhost:4173/
echo.
echo 服务器已启动。如果浏览器没自动打开，手动访问 http://localhost:4173/
echo.
pause
