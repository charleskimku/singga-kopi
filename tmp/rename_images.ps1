Get-ChildItem -Path "public/foto" -Filter "WhatsApp Image*" | ForEach-Object {
    $newName = $_.Name -replace "WhatsApp Image ", "whatsapp_image_" -replace " ", "_"
    Rename-Item -Path $_.FullName -NewName $newName
}
