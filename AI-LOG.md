1. "buatkan gambar tampilan gambar dari file soal ini untuk referensi".
hasil : gambar contoh
2. bantu aku untuk menyesuaikan Ui sederhana seperti contoh tanpa menambah fitur apapun.
Implementasi code CSS dan JS
3. bantu aku menambahkan logika untuk CSS dan JS
membuat semua fungsi untuk css dan js
4. menambahkan validasi js untuk fitur pindah dompet
if (formPindah) {
  formPindah.addEventListener("submit", function (e) {
    e.preventDefault();

    const nominal = Number(inputJumlahPindah.value);
    const dari = inputDariDompet.value;
    const ke = inputKeDompet.value;

    if (nominal <= 0) {
      alert("Jumlah pemindahan harus lebih dari 0!");
      return;
    }

    if (dari === ke) {
      alert("Dompet asal dan dompet tujuan tidak boleh sama!");
      return;
    }

    // HITUNG SALDO DOMPET ASAL SAAT INI
    let saldoDari = 0;
    transactions.forEach(function (t) {
      if (t.dompet === dari) {
        if (t.jenis === "masuk") saldoDari += t.jumlah;
        else if (t.jenis === "keluar") saldoDari -= t.jumlah;
      }
    });

    // Validasi Saldo Cukup
    if (saldoDari < nominal) {
      const namaDompet = dari === "usaha" ? "Usaha" : "Pribadi";
      alert(`Pindah dompet gagal! Saldo Dompet ${namaDompet} saat ini tidak mencukupi (${formatRupiah(saldoDari)}).`);
      return;
    }

    // JIKA SALDO CUKUP, BUAT 2 TRANSAKSI
    const today = new Date().toISOString().split("T")[0];
    const now = Date.now();

    const teksDari = dari === "usaha" ? "Usaha" : "Pribadi";
    const teksKe = ke === "usaha" ? "Usaha" : "Pribadi";

    untuk CSS dan JS saya memakai AI dan untuk HTML saya buat dan dibantu VS code 