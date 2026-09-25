// יצירת 14 קודים חדשים (ישנים יפסיקו לעבוד): npm i qrcode && node tools/generate-qr.js
// אחרי ההרצה יש ליצור מחדש את print.html.
const QR=require('qrcode'),fs=require('fs'),crypto=require('crypto');
const out=require('path').join(__dirname,'..');
const A='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const used=new Set(),map=[];
for(let s=1;s<=14;s++){let t;do{t=[...crypto.randomBytes(6)].map(b=>A[b%32]).join('')}while(used.has(t));used.add(t);map.push({seat:s,code:'CINEMA-SEAT:'+t});}
(async()=>{
 for(const m of map){fs.writeFileSync(`${out}/qr/seat-${String(m.seat).padStart(2,'0')}.svg`,await QR.toString(m.code,{type:'svg',errorCorrectionLevel:'M',margin:2}));
  await QR.toFile(`${out}/qr/seat-${String(m.seat).padStart(2,'0')}.png`,m.code,{errorCorrectionLevel:'M',margin:2,width:600});}
 fs.writeFileSync(`${out}/seats.js`,'// מיפוי תוכן קוד QR -> מספר כיסא (1-14). נוצר ע"י generate-qr.\nwindow.SEAT_CODES = '+JSON.stringify(Object.fromEntries(map.map(m=>[m.code,m.seat])),null,2)+';\n');
 console.log(map);
})();
