
# Set execution policy
Write-Host "Setting execution policy..."
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
Write-Host "Execution policy set successfully."

# Install Scoop
Write-Host "Installing Scoop..."
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
Write-Host "Scoop installed successfully."

# Install Allure
Write-Host "Installing Allure..."
scoop install allure
Write-Host "Allure installed successfully."
