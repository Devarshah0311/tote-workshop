# Generates pastel placeholder JPGs for the tote-workshop site.
# Run once. Users can then replace the .jpg files with their own photos
# (keeping the same filenames) without editing HTML.

Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot "images"
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }

function New-Placeholder {
    param(
        [string]$Path,
        [int]$W,
        [int]$H,
        [System.Drawing.Color]$BgColor,
        [System.Drawing.Color]$AccentColor,
        [string]$Kicker,
        [string]$Title
    )
    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    # background
    $g.Clear($BgColor)

    # decorative accent circle
    $accentBrush = New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(60, $AccentColor.R, $AccentColor.G, $AccentColor.B)
    )
    $g.FillEllipse($accentBrush, [int]($W * 0.55), [int]($H * 0.15), [int]($W * 0.6), [int]($W * 0.6))

    $accentBrush2 = New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(40, $AccentColor.R, $AccentColor.G, $AccentColor.B)
    )
    $g.FillEllipse($accentBrush2, [int](-$W * 0.15), [int]($H * 0.55), [int]($W * 0.55), [int]($W * 0.55))

    # subtle tote silhouette
    $toteBrush = New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(30, 46, 58, 36)
    )
    $tx = [int]($W * 0.25); $ty = [int]($H * 0.30)
    $tw = [int]($W * 0.50); $th = [int]($H * 0.42)
    $g.FillRectangle($toteBrush, $tx, $ty, $tw, $th)
    $handlePen = New-Object System.Drawing.Pen(
        [System.Drawing.Color]::FromArgb(60, 46, 58, 36), 6
    )
    $g.DrawArc($handlePen, $tx + 8,           $ty - 24, [int]($tw * 0.35), 48, 180, 180)
    $g.DrawArc($handlePen, $tx + $tw - [int]($tw * 0.35) - 8, $ty - 24, [int]($tw * 0.35), 48, 180, 180)

    # kicker text
    $kickerFont = New-Object System.Drawing.Font("Georgia", 20, [System.Drawing.FontStyle]::Italic)
    $kickerBrush = New-Object System.Drawing.SolidBrush($AccentColor)
    $g.DrawString($Kicker, $kickerFont, $kickerBrush, [single]($W * 0.08), [single]($H * 0.08))

    # title text
    $titleFont = New-Object System.Drawing.Font("Georgia", 44, [System.Drawing.FontStyle]::Bold)
    $titleBrush = New-Object System.Drawing.SolidBrush(
        [System.Drawing.Color]::FromArgb(46, 58, 36)
    )
    $g.DrawString($Title, $titleFont, $titleBrush, [single]($W * 0.08), [single]($H * 0.78))

    # save as JPG
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $g.Dispose(); $bmp.Dispose()
    Write-Host "wrote $Path"
}

# Palette
$cream    = [System.Drawing.Color]::FromArgb(250, 243, 230)
$blush    = [System.Drawing.Color]::FromArgb(235, 199, 180)
$sageLt   = [System.Drawing.Color]::FromArgb(185, 196, 168)
$terra    = [System.Drawing.Color]::FromArgb(201, 123, 90)
$sage     = [System.Drawing.Color]::FromArgb(122, 139, 107)
$gold     = [System.Drawing.Color]::FromArgb(201, 169, 97)

# hero poster (3:4)
New-Placeholder -Path (Join-Path $out "poster.jpg") -W 900 -H 1200 -BgColor $cream    -AccentColor $terra -Kicker "5th July - 11 AM to 1 PM" -Title "TOTE PAINTING"

# 4 gallery tiles (4:5)
New-Placeholder -Path (Join-Path $out "tote-1.jpg") -W 800 -H 1000 -BgColor $blush  -AccentColor $terra -Kicker "colour without rules"  -Title "Tote 01"
New-Placeholder -Path (Join-Path $out "tote-2.jpg") -W 800 -H 1000 -BgColor $sageLt -AccentColor $sage  -Kicker "botanical, always"     -Title "Tote 02"
New-Placeholder -Path (Join-Path $out "tote-3.jpg") -W 800 -H 1000 -BgColor $cream  -AccentColor $terra -Kicker "soft and specific"     -Title "Tote 03"
New-Placeholder -Path (Join-Path $out "tote-4.jpg") -W 800 -H 1000 -BgColor $cream  -AccentColor $gold  -Kicker "better with friends"   -Title "Tote 04"

Write-Host "`nDone. Placeholders live in: $out"
