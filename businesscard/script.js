lucide.createIcons();

function downloadVCard() {
    const vcard = "BEGIN:VCARD\n" +
                  "VERSION:3.0\n" +
                  "FN:Rimak United\n" +
                  "ORG:Rimak United\n" +
                  "TEL;TYPE=WORK,VOICE:+966506800175\n" +
                  "EMAIL:info@rimakltv.com\n" +
                  "URL:https://rimakltv.com\n" +
                  "ADR;TYPE=WORK:;;Riyadh;Saudi Arabia;;\n" +
                  "END:VCARD";
    
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Rimak_United_Contact.vcf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}