<#
  check-links.ps1
  Scans all .html files in the workspace and verifies each <script src="..."> target exists.
  Usage: Open PowerShell in the repo root and run:
    .\tools\check-links.ps1

  Exits with code 0 if all script targets exist, otherwise prints missing files and exits 1.
#>

Set-StrictMode -Version Latest
$root = Split-Path -Path $MyInvocation.MyCommand.Path -Parent
Push-Location $root\..\

$htmlFiles = Get-ChildItem -Path . -Recurse -Include *.html | Where-Object { -not $_.PSIsContainer }
$missing = @()

foreach ($f in $htmlFiles) {
  $content = Get-Content $f.FullName -Raw
  # Use a single-quoted here-string for the pattern to avoid escaping issues
  $pattern = @'
<script\s+[^>]*src=["']([^"']+)["'][^>]*>
'@
  $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  foreach ($m in $matches) {
    $src = $m.Groups[1].Value
    if ($src -match '^(https?:)?//') { continue } # skip absolute/remote URLs
    $targetPath = Join-Path -Path (Split-Path $f.FullName -Parent) -ChildPath $src
    $norm = [IO.Path]::GetFullPath($targetPath)
    if (-not (Test-Path $norm)) {
      $missing += [PSCustomObject]@{ Html = $f.FullName; Script = $src; Resolved = $norm }
    }
  }
}

if ($missing.Count -eq 0) {
  Write-Host "All script targets found." -ForegroundColor Green
  Pop-Location
  exit 0
} else {
  Write-Host "Missing script targets:" -ForegroundColor Red
  $missing | ForEach-Object { Write-Host "HTML: $($_.Html)  ->  src: $($_.Script)   resolved: $($_.Resolved)" }
  Pop-Location
  exit 1
}
