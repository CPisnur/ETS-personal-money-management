// Kunci Penyimpanan di localStorage
const STORAGE_KEY = "kaskita_data";

// Elemen DOM - Form Tambah Transaksi
const form = document.getElementById("transaksiForm");
const inputTanggal = document.getElementById("tanggal");
const inputDeskripsi = document.getElementById("deskripsi");
const inputJumlah = document.getElementById("jumlah");
const inputJenis = document.getElementById("jenis");
const inputDompet = document.getElementById("dompet");

// Elemen DOM - Form Pindah Dompet
const formPindah = document.getElementById("pindahDompetForm");
const inputJumlahPindah = document.getElementById("jumlahPindah");
const inputDariDompet = document.getElementById("dariDompet");
const inputKeDompet = document.getElementById("keDompet");

// Elemen DOM - Ringkasan Saldo Usaha
const saldoDompetUsaha = document.getElementById("saldoDompet");
const saldoMasukUsaha = document.getElementById("saldoMasukUsaha");
const saldoKeluarUsaha = document.getElementById("saldoKeluarUsaha");

// Elemen DOM - Ringkasan Saldo Pribadi
const saldoDompetPribadi = document.getElementById("saldoPribadi");
const saldoMasukPribadi = document.getElementById("saldoMasukPribadi");
const saldoKeluarPribadi = document.getElementById("saldoKeluarPribadi");

// Elemen DOM - Tabel
const tableBody = document.getElementById("transaksiTableBody");

// Array Penyimpan Data Transaksi
let transactions = [];

// Fungsi Format Angka ke Rupiah
function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

// 1. Muat Data dari localStorage (W4)
function muatData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    transactions = JSON.parse(data);
  }
  render();
}

// 2. Simpan Data ke localStorage (W4)
function simpanData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// 3. Hitung Ringkasan Saldo Usaha & Pribadi (W5 & Fitur Khas Pedagang)
function hitungRingkasan() {
  let masukUsaha = 0, keluarUsaha = 0;
  let masukPribadi = 0, keluarPribadi = 0;

  transactions.forEach(function (t) {
    if (t.dompet === "usaha") {
      if (t.jenis === "masuk") masukUsaha += t.jumlah;
      else if (t.jenis === "keluar") keluarUsaha += t.jumlah;
    } else if (t.dompet === "pribadi") {
      if (t.jenis === "masuk") masukPribadi += t.jumlah;
      else if (t.jenis === "keluar") keluarPribadi += t.jumlah;
    }
  });

  // Tampilkan Ringkasan Usaha
  if (saldoMasukUsaha) saldoMasukUsaha.textContent = formatRupiah(masukUsaha);
  if (saldoKeluarUsaha) saldoKeluarUsaha.textContent = formatRupiah(keluarUsaha);
  if (saldoDompetUsaha) saldoDompetUsaha.textContent = formatRupiah(masukUsaha - keluarUsaha);

  // Tampilkan Ringkasan Pribadi
  if (saldoMasukPribadi) saldoMasukPribadi.textContent = formatRupiah(masukPribadi);
  if (saldoKeluarPribadi) saldoKeluarPribadi.textContent = formatRupiah(keluarPribadi);
  if (saldoDompetPribadi) saldoDompetPribadi.textContent = formatRupiah(masukPribadi - keluarPribadi);
}

// 4. Render Tabel Transaksi (W2)
function renderTabel() {
  if (!tableBody) return;
  tableBody.innerHTML = "";

  if (transactions.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Belum ada transaksi</td></tr>';
    return;
  }

  transactions.forEach(function (t) {
    const tr = document.createElement("tr");

    const tanda = t.jenis === "masuk" ? "+" : "-";
    const warna = t.jenis === "masuk" ? "text-masuk" : "text-keluar";
    const teksDompet = t.dompet === "usaha" ? "Usaha" : "Pribadi";

    tr.innerHTML = `
      <td>${t.tanggal}</td>
      <td>${t.deskripsi} (${teksDompet})</td>
      <td class="${warna}">${tanda}${formatRupiah(t.jumlah)}</td>
      <td>
        ${t.jenis === "masuk" ? "Masuk" : "Keluar"} 
        <button class="btn-hapus" onclick="hapusTransaksi(${t.id})" style="margin-left: 10px;">Hapus</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

// 5. Hapus Transaksi (W3)
function hapusTransaksi(id) {
  if (confirm("Hapus transaksi ini?")) {
    transactions = transactions.filter(function (t) {
      return t.id !== id;
    });
    simpanData();
    render();
  }
}

// 6. Form Tambah Transaksi Biasa (W1 & W6)
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nominal = Number(inputJumlah.value);

    // Validasi Input
    if (!inputTanggal.value || !inputDeskripsi.value || nominal <= 0) {
      alert("Mohon isi data dengan benar! Jumlah harus lebih dari 0.");
      return;
    }

    const transaksiBaru = {
      id: Date.now(),
      tanggal: inputTanggal.value,
      jenis: inputJenis.value,
      kategori: inputDeskripsi.value,
      nominal: nominal,
      dompet: inputDompet.value
    };

    transactions.unshift(transaksiBaru);
    simpanData();
    render();

    // Reset Input Form
    inputDeskripsi.value = "";
    inputJumlah.value = "";
  });
}

