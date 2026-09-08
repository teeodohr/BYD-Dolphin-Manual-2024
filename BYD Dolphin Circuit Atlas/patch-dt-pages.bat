@echo off
REM Patch all DT*.html files in the current folder to enable pan/zoom (file:// friendly)
REM Usage: put this BAT in the SAME folder as your DTxxxx.html files, svg-pan-zoom.js, and panzoom-init.js
REM Then run: patch-dt-pages.bat

setlocal enabledelayedexpansion

for %%F in (DT*.html) do (
  echo Patching %%F
  REM Insert before </body> if possible, else before </html>
  powershell -NoProfile -Command "
    $p='%%F';
    $t=Get-Content -Raw -Encoding UTF8 $p;
    if($t -match 'panzoom-init\.js') { exit }
    $ins='`r`n<script src=\"svg-pan-zoom.js\"></script>`r`n<script src=\"panzoom-init.js\"></script>`r`n';
    if($t -match '</body>'){
      $t=$t -replace '</body>', ($ins + '</body>');
    } elseif($t -match '</html>'){
      $t=$t -replace '</html>', ($ins + '</html>');
    } else {
      $t=$t + $ins;
    }
    Set-Content -Encoding UTF8 $p $t;
  "
)

echo Done.
pause
