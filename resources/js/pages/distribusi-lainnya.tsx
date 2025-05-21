import {
    Distribution,
    ZakatDistributionAdmin,
} from "@/components/zakat-distribution-admin";
import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";

export default function DistribusiLainnya(props: {
    distribusiZakatLainnya: Distribution[];
}) {

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard Zakat" />

            <div className="pt-6 ">
                <h1 className="mb-6 text-3xl font-bold">
                    Manajemen Distribusi Zakat Lainnya
                </h1>
                <ZakatDistributionAdmin
                    distribusiZakatLainnya={props.distribusiZakatLainnya}
                />
            </div>
        </AuthenticatedLayout>
    );
}
