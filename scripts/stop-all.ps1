$ports = @(3000, 4000, 5173, 8080)
$killedPids = @()

foreach ($port in $ports) {
    Write-Host "Checking port $port..."

    $portPids = @()

    if (Get-Command Get-NetTCPConnection -ErrorAction SilentlyContinue) {
        $portPids += Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue |
            Select-Object -ExpandProperty OwningProcess
    }

    if (-not $portPids -or $portPids.Count -eq 0) {
        $matches = netstat -ano -p tcp | Select-String ":$port"
        foreach ($match in $matches) {
            $line = $match.Line.Trim()
            $parts = $line -split '\s+'
            if ($parts.Length -ge 5) {
                $pid = $parts[-1]
                if ($pid -match '^\d+$') {
                    $portPids += [int]$pid
                }
            }
        }
    }

    $uniquePortPids = $portPids | Where-Object { $_ -and $_ -gt 4 } | Select-Object -Unique

    if (-not $uniquePortPids -or $uniquePortPids.Count -eq 0) {
        Write-Host "No process found on port $port"
        continue
    }

    foreach ($procId in $uniquePortPids) {
        try {
            $processName = (Get-Process -Id $procId -ErrorAction Stop).ProcessName
            Stop-Process -Id $procId -Force -ErrorAction Stop
            $killedPids += $procId
            Write-Host "Stopped PID $procId ($processName) on port $port"
        }
        catch {
            Write-Host "Could not stop PID $procId on port ${port}: $($_.Exception.Message)"
        }
    }
}

$totalKilled = ($killedPids | Select-Object -Unique).Count
Write-Host "Done. Stopped $totalKilled process(es)."
