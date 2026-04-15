# ============================================================
# Nirman Project - One-Click Startup Script
# Run this from the Nirman-Project folder:
#   .\start.ps1
# ============================================================

$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$BACKEND = Join-Path $ROOT "backend"
$FRONTEND = Join-Path $ROOT "frontend"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   NIRMAN PROJECT - Starting Services   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ----------------------------------------------------------
# 1. Kill anything already using port 8000 or 3000
# ----------------------------------------------------------
Write-Host "[1/4] Cleaning up old processes on ports 8000 and 3000..." -ForegroundColor Yellow

function Kill-Port {
    param([int]$Port)
    $pids = netstat -ano | Select-String ":$Port " | ForEach-Object {
        ($_ -split '\s+')[-1]
    } | Sort-Object -Unique
    foreach ($p in $pids) {
        if ($p -match '^\d+$' -and $p -ne '0') {
            try { Stop-Process -Id $p -Force -ErrorAction SilentlyContinue } catch {}
        }
    }
}

Kill-Port 8000
Kill-Port 3000
Start-Sleep -Seconds 1
Write-Host "   Done." -ForegroundColor Green

# ----------------------------------------------------------
# 2. Check backend venv exists
# ----------------------------------------------------------
Write-Host ""
Write-Host "[2/4] Checking backend virtual environment..." -ForegroundColor Yellow

$UVICORN = Join-Path $BACKEND "venv\Scripts\uvicorn.exe"
if (-not (Test-Path $UVICORN)) {
    Write-Host "   ERROR: venv not found at $BACKEND\venv" -ForegroundColor Red
    Write-Host "   Please run: cd backend && python -m venv venv && venv\Scripts\pip install -r requirements.txt" -ForegroundColor Red
    exit 1
}
Write-Host "   Found venv." -ForegroundColor Green

# ----------------------------------------------------------
# 3. Start Backend in a new terminal window
# ----------------------------------------------------------
Write-Host ""
Write-Host "[3/4] Starting Backend  ->  http://localhost:8000" -ForegroundColor Yellow
Write-Host "       API Docs         ->  http://localhost:8000/docs" -ForegroundColor DarkGray

$backendCmd = "Set-Location '$BACKEND'; Write-Host 'Backend starting...' -ForegroundColor Cyan; .\venv\Scripts\uvicorn.exe app.main:app --reload --host 0.0.0.0 --port 8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd -WindowStyle Normal

Start-Sleep -Seconds 2

# ----------------------------------------------------------
# 4. Start Frontend in a new terminal window
# ----------------------------------------------------------
Write-Host "[4/4] Starting Frontend ->  http://localhost:3000" -ForegroundColor Yellow

$frontendCmd = "Set-Location '$FRONTEND'; Write-Host 'Frontend starting...' -ForegroundColor Green; npm run dev -- --port 3000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd -WindowStyle Normal

Start-Sleep -Seconds 3

# ----------------------------------------------------------
# 5. Open browser
# ----------------------------------------------------------
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Both servers launched!" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend : http://localhost:3000" -ForegroundColor White
Write-Host "  Backend  : http://localhost:8000" -ForegroundColor White
Write-Host "  API Docs : http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "  Login credentials:" -ForegroundColor Yellow
Write-Host "  Admin   -> swaraj@orchestrator.ai  / admin123" -ForegroundColor White
Write-Host "  Employee-> amira.khan@orchestrator.ai / team123456" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Open browser after a short delay
Start-Sleep -Seconds 2
Start-Process "http://localhost:3000"
