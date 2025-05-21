import DashboardPage from "@/components/dashboard-page";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";

export default function Dashboard(props: {
    totalZakatUang: any;
    totalZakatBeras: any;
    totalDistribusiZakatUang: any;
    totalDistribusiZakatBeras: any;
    totalBerasDistribusiLainnya: any;
    totalUangDistribusiLainnya: any;
    belumBayar: any;
    wargaWajibBayar: any;
    sudahBayar: any;
    jumlahWargaTerdistribusi: any;
    jumlahPenerimaLainnya: any;
}) {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard Zakat" />

            <DashboardPage
                totalZakatUang={props.totalZakatUang}
                totalZakatBeras={props.totalZakatBeras}
                totalDistribusiZakatBeras={props.totalDistribusiZakatBeras}
                totalDistribusiZakatUang={props.totalDistribusiZakatUang}
                totalBerasDistribusiLainnya={props.totalBerasDistribusiLainnya}
                totalUangDistribusiLainnya={props.totalUangDistribusiLainnya}
                belumBayar={props.belumBayar}
                wargaWajib={props.wargaWajibBayar}
                sudahBayar={props.sudahBayar}
                jumlahWargaTerdistribusi={props.jumlahWargaTerdistribusi}
                jumlahPenerimaLainnya={props.jumlahPenerimaLainnya}
            />
        </AuthenticatedLayout>
    );
}
