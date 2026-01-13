# Full-Stack E-Commerce Platform Setup
# Run this script to set up both backend and frontend

Write-Host "🚀 Setting up MW Full-Stack E-Commerce Platform..." -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is installed
Write-Host "Checking MongoDB installation..." -ForegroundColor Yellow
$mongoCheck = Get-Command mongod -ErrorAction SilentlyContinue

if (-not $mongoCheck) {
    Write-Host "❌ MongoDB not found. Please install MongoDB:" -ForegroundColor Red
    Write-Host "   Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    Write-Host "   Or use: choco install mongodb" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ MongoDB found" -ForegroundColor Green

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue

if (-not $nodeCheck) {
    Write-Host "❌ Node.js not found. Please install Node.js from: https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js found: $(node -v)" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Cyan
cd server
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
cd ..
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "⚙️ Creating environment files..." -ForegroundColor Cyan

# Create backend .env if not exists
if (-not (Test-Path "server\.env")) {
    Copy-Item "server\.env.example" "server\.env"
    Write-Host "✅ Created server/.env (please update with your Stripe keys)" -ForegroundColor Green
} else {
    Write-Host "ℹ️ server/.env already exists" -ForegroundColor Yellow
}

# Create frontend .env if not exists
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env" -ForegroundColor Green
} else {
    Write-Host "ℹ️ .env already exists" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🗄️ Starting MongoDB..." -ForegroundColor Cyan
Write-Host "Note: MongoDB should be running before seeding the database" -ForegroundColor Yellow
Write-Host "Run: mongod --dbpath C:\data\db" -ForegroundColor Yellow
Write-Host ""

$response = Read-Host "Is MongoDB running? (Y/N)"
if ($response -eq 'Y' -or $response -eq 'y') {
    Write-Host ""
    Write-Host "🌱 Seeding Database..." -ForegroundColor Cyan
    cd server
    npm run seed
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database seeded successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Database seeding failed. Make sure MongoDB is running." -ForegroundColor Red
    }
    cd ..
} else {
    Write-Host "⚠️ Skipping database seeding. Run 'cd server && npm run seed' after starting MongoDB" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ Setup Complete! ✨" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure MongoDB is running: mongod --dbpath C:\data\db" -ForegroundColor White
Write-Host "2. Update server/.env with your Stripe API keys" -ForegroundColor White
Write-Host "3. Start Backend:  cd server && npm run dev" -ForegroundColor White
Write-Host "4. Start Frontend: npm run dev (in new terminal)" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Test Accounts:" -ForegroundColor Cyan
Write-Host "   Admin:    admin@mw.com / admin123" -ForegroundColor White
Write-Host "   Customer: customer@test.com / customer123" -ForegroundColor White
Write-Host ""
Write-Host "📚 See README_FULLSTACK.md for detailed documentation" -ForegroundColor Cyan
