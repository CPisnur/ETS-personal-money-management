Persona saya disini adalah sebagai seorang pedagang kecil yang kesuita dal menghitung keuntungn karena tercampurnya uang pribadi da hasil usaha. 
rancangan struktur data yang saya palai adalah :
      id: Date.now(), ---> sebagai id transaksi
      tanggal: inputTanggal.value, ---> tanggal transaksi terjadi
      deskripsi: inputDeskripsi.value, --->  perihal tentng pemasukan/pengeluaran dari/untuk apa
      jumlah: nominal, ---> nominl yang masuk/keluar
      jenis: inputJenis.value, ---> jenis dana(masuk/keluar)
      dompet: inputDompet.value ---> Dompet yang dipakai

     untuk keputusan desain yang digunakan berdasarkn gambaran yang diberi AI ketka mencari referensi, lalu saya sederhanakan untuk kepentingan tampilan yang lebih bisa diterima semua kalangan.

     ada 2 bug yang saya temukan :
     1. Kesalahan sintaks JS saat pengujian menggunakan vite, muncul error 'Failed to prse source for import analysis'
     perbaikan yang dilakukan : merapikan deklarasi fungsi dan struktur kurung kurawal.
     2. Data Transaksi yang tidak tercatat setelah menambahkan fitur kirim antar dompet.
     Perbikan yang dilakuka : memperbki kembali validasi proses pada pindah 