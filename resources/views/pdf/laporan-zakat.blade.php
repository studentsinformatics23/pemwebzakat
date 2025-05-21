<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Pengelolaan Zakat</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; line-height: 1.6; }
        h1, h2 { text-align: center; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px; border: 1px solid #000; text-align: left; }
        .section-title { background-color: #f2f2f2; padding: 5px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Laporan Pengelolaan Zakat</h1>
    <p>Tanggal: {{ \Carbon\Carbon::now()->translatedFormat('d F Y') }}</p>

    <div class="section-title">Data Penerimaan Zakat</div>
    <table>
        <tr><th>Jenis</th><th>Jumlah</th></tr>
        <tr><td>Total Zakat Beras</td><td>{{ $data['totalZakatBeras'] }} kg</td></tr>
        <tr><td>Total Zakat Uang</td><td>Rp {{ number_format($data['totalZakatUang'], 0, ',', '.') }}</td></tr>
    </table>

    <div class="section-title">Data Distribusi Zakat</div>
    <table>
        <tr><th>Jenis</th><th>Jumlah</th></tr>
        <tr><td>Beras ke Warga</td><td>{{ $data['totalDistribusiZakatBeras'] }} kg</td></tr>
        <tr><td>Uang ke Warga</td><td>Rp {{ number_format($data['totalDistribusiZakatUang'], 0, ',', '.') }}</td></tr>
        <tr><td>Beras ke Warga Lain</td><td>{{ $data['totalBerasDistribusiLainnya'] }} kg</td></tr>
        <tr><td>Uang ke Warga Lain</td><td>Rp {{ number_format($data['totalUangDistribusiLainnya'], 0, ',', '.') }}</td></tr>
    </table>

    <div class="section-title">Status Pembayaran Zakat</div>
    <table>
        <tr><td>Total Warga Wajib Zakat</td><td>{{ $data['wargaWajibBayar'] }}</td></tr>
        <tr><td>Sudah Bayar</td><td>{{ $data['sudahBayar'] }}</td></tr>
        <tr><td>Belum Bayar</td><td>{{ $data['belumBayar'] }}</td></tr>
    </table>

    <div class="section-title">Data Penerima</div>
    <table>
        <tr><td>Jumlah Warga Terdistribusi</td><td>{{ $data['jumlahWargaTerdistribusi'] }}</td></tr>
        <tr><td>Jumlah Penerima Lainnya</td><td>{{ $data['jumlahPenerimaLainnya'] }}</td></tr>
    </table>
</body>
</html>
