// ===== Hitung total chars =====
const fileInput = document.getElementById('importFile');
const totalCharsDiv = document.getElementById('totalChars');

function updateTotalChars(){
  let sum = 0;
  for(let i=0;i<localStorage.length;i++){
    sum += localStorage.getItem(localStorage.key(i)).length;
  }
  totalCharsDiv.textContent = `Total chars: ${sum}`;
}

// ===== Export JSON =====
function exportLocalStorage(){
  const data = {};
  for(let i=0;i<localStorage.length;i++){
    data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
  }
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'localstorage_backup.json';
  a.click();
  URL.revokeObjectURL(a.href);
  updateTotalChars();
}

// ===== Auto Import JSON saat pilih file =====
fileInput.addEventListener('change', function(){
  const file = this.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const data = JSON.parse(e.target.result);
      Object.keys(data).forEach(k => localStorage.setItem(k,data[k]));
      updateTotalChars();
    } catch(err){}
  };
  reader.readAsText(file);
});

// ===== Auto-update total chars setiap detik =====
if(typeof updateTotalChars === 'function'){
  updateTotalChars(); // pertama kali load
  setInterval(updateTotalChars, 1000); // update otomatis
}
