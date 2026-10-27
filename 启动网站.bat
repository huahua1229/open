@echo off
title POLARIS 3D 个人站 - 本地服务器（关闭此窗口即停止服务）
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 未检测到 Node.js 运行环境，请先安装 Node.js。
  pause
  exit /b 1
)

if not exist "dist\index.html" (
  echo 首次启动，未发现构建产物 dist，正在执行 npm run build ...
  call npm run build
  if errorlevel 1 (
    echo.
    echo [错误] 构建失败，请把窗口里的报错截图发我排查。
    pause
    exit /b 1
  )
)

echo.
echo ================================================
echo    POLARIS 3D 个人站正在启动
echo    访问地址: http://localhost:4173/open/
echo    关闭本黑色窗口即停止网站服务
echo ================================================
echo.

rem 4 秒后自动用默认浏览器打开网站（辅助窗口最小化，不挡视线）
start "" /min cmd /c "timeout /t 4 /nobreak >nul && start """" http://localhost:4173/open/"

rem 前台运行预览服务器，端口固定 4173，被占用时直接报错而不是换端口
call npm run preview -- --port 4173 --strictPort

echo.
echo 服务已停止，按任意键关闭窗口。
pause >nul
