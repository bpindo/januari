// localstorage.js
const fileInput = document.getElementById('importFile');
const totalCharsDiv = document.getElementById('totalChars');

// ===== Hitung total chars =====
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
  for(let i=0;i<localStorage.length;i++){ data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i)); }
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'localstorage_backup.json';
  a.click();
  URL.revokeObjectURL(a.href);
  updateTotalChars(); // update nempel
}

// ===== Auto Import JSON saat pilih file =====
fileInput.addEventListener('change', function(){
  const file = this.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const data = JSON.parse(e.target.result);
      Object.keys(data).forEach(k=>localStorage.setItem(k,data[k]));
      updateTotalChars(); // update nempel
    }catch(err){}
  };
  reader.readAsText(file);
});
