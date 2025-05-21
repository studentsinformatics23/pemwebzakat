export interface ZakatPayment {
    id: string;
    nama_KK: string;
    nomor_KK: string;
    jumlah_tanggungan: number;
    jenis_bayar: "beras" | "uang";
    bayar_beras: number;
    bayar_uang: number;
    total_zakat: number;
    status: "pending" | "lunas" | "batal";
}

export interface ZakatRecord {
  id: number
  nama_KK: string
  nomor_KK: string
  jumlah_tanggungan: number
  jenis_bayar: "beras" | "uang"
  status: "pending" | "lunas" | "batal"
  bayar_beras?: number
  bayar_uang?: number
  total_zakat: number
  created_at: string
  updated_at: string
}
