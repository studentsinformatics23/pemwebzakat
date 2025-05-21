import ZakatDistributionManagement from "@/components/zakat-distribution-management";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";

// Untuk Warga
export interface Warga {
    id: number;
    keluarga_id: string;
    nama: string;
    jumlah_tanggungan: number;
    deskripsi: string | null;
    kategori_id: string | null;
    created_at: string;
    updated_at: string;
}

type Kategori = {
  id: number;
  nama: string;
  deskripsi: string;
  created_at: string | null;
};


// Untuk Distribusi Zakat
export interface DistribusiZakat {
    id: number;
    warga_id?: number | null; // Jika warga_id disertakan
    kategori_id: number | null;
    jenis_bantuan: "beras" | "uang" | null;
    jumlah_beras: number | null;
    jumlah_uang: number | null;
    catatan: string | null;
    tanggal_distribusi: string;
    status: "terkirim" | "belum_terkirim";
    created_at: string;
    updated_at: string;
    warga: Warga; // Relasi ke Warga
    kategori: Kategori
}

export default function Distribusi(props: {
    distribusiZakat: DistribusiZakat[];
}) {

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard bayar" />

            <main className="mx-auto">
                <ZakatDistributionManagement
                    distribusiZakat={props.distribusiZakat}
                />
            </main>
        </AuthenticatedLayout>
    );
}
