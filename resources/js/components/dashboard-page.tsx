"use client";

import { useState } from "react";
import {
    AlertCircle,
    ArrowDown,
    ArrowUp,
    Calendar,
    ChevronDown,
    CreditCard,
    DollarSign,
    Filter,
    GrapeIcon as GrainIcon,
    Layers,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    PieChart,
    Search,
    Settings,
    Users,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent } from "@/components/ui/sheet";
// import {
//     AreaChart,
//     BarChart,
//     PieChart as PieChartComponent,
// } from "@/components/ui/chart";

export default function DashboardPage(props: {
    totalZakatBeras: number;
    totalZakatUang: number;
    totalDistribusiZakatUang: number;
    totalDistribusiZakatBeras: number;
    totalBerasDistribusiLainnya: number;
    totalUangDistribusiLainnya: number;
    sudahBayar: number;
    wargaWajib: number;
    belumBayar: number;
    jumlahWargaTerdistribusi: number;
    jumlahPenerimaLainnya: number;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock data for the dashboard
    const summaryData = {
        totalCollected: {
            idr: props.totalZakatUang,
            kg: props.totalZakatBeras,
        },
        totalDistributed: {
            idr: props.totalDistribusiZakatUang,
            kg: props.totalDistribusiZakatBeras,
        },
        total_warga_wajib_zakat: props.wargaWajib,
        sudah_bayar: props.sudahBayar,
        belum_bayar: props.belumBayar,
        beneficiaries: 85,
        pendingDistributions: 12,
    };

    const monthlyData = [
        { month: "Jan", collected: 3200000, distributed: 2800000 },
        { month: "Feb", collected: 2800000, distributed: 2500000 },
        { month: "Mar", collected: 3500000, distributed: 3200000 },
        { month: "Apr", collected: 4200000, distributed: 3800000 },
        { month: "May", collected: 3800000, distributed: 3500000 },
        { month: "Jun", collected: 4500000, distributed: 4100000 },
        { month: "Jul", collected: 5200000, distributed: 4800000 },
        { month: "Aug", collected: 6500000, distributed: 5800000 },
        { month: "Sep", collected: 4800000, distributed: 4200000 },
        { month: "Oct", collected: 3800000, distributed: 3500000 },
        { month: "Nov", collected: 4200000, distributed: 3800000 },
        { month: "Dec", collected: 5500000, distributed: 5000000 },
    ];

    const categoryData = [
        { name: "Fakir", value: 35 },
        { name: "Miskin", value: 25 },
        { name: "Amil", value: 10 },
        { name: "Muallaf", value: 5 },
        { name: "Riqab", value: 2 },
        { name: "Gharim", value: 8 },
        { name: "Fisabilillah", value: 10 },
        { name: "Ibnu Sabil", value: 5 },
    ];

    const typeData = [
        { name: "Beras (Kg)", value: 40 },
        { name: "Uang (IDR)", value: 60 },
    ];

    const statusData = [
        { name: "Terkirim", value: 75 },
        { name: "Belum Terkirim", value: 25 },
    ];

    const recentPayments = [
        {
            id: "ZP-2023-001",
            name: "Ahmad Fauzi",
            amount: "Rp 2,500,000",
            type: "Uang",
            date: "2023-12-01",
            status: "Diterima",
        },
        {
            id: "ZP-2023-002",
            name: "Siti Aminah",
            amount: "25 Kg",
            type: "Beras",
            date: "2023-12-02",
            status: "Diterima",
        },
        {
            id: "ZP-2023-003",
            name: "Budi Santoso",
            amount: "Rp 1,800,000",
            type: "Uang",
            date: "2023-12-03",
            status: "Diterima",
        },
        {
            id: "ZP-2023-004",
            name: "Dewi Kartika",
            amount: "15 Kg",
            type: "Beras",
            date: "2023-12-04",
            status: "Diterima",
        },
        {
            id: "ZP-2023-005",
            name: "Hasan Basri",
            amount: "Rp 3,200,000",
            type: "Uang",
            date: "2023-12-05",
            status: "Diterima",
        },
    ];

    const recentDistributions = [
        {
            id: "ZD-2023-001",
            recipient: "Yayasan Al-Ikhlas",
            amount: "Rp 5,000,000",
            category: "Fisabilillah",
            date: "2023-12-02",
            status: "Terkirim",
        },
        {
            id: "ZD-2023-002",
            recipient: "Keluarga Mahmud",
            amount: "50 Kg",
            category: "Fakir",
            date: "2023-12-03",
            status: "Terkirim",
        },
        {
            id: "ZD-2023-003",
            recipient: "Pesantren Nurul Iman",
            amount: "Rp 3,500,000",
            category: "Fisabilillah",
            date: "2023-12-04",
            status: "Belum Terkirim",
        },
        {
            id: "ZD-2023-004",
            recipient: "Ibu Fatimah",
            amount: "25 Kg",
            category: "Miskin",
            date: "2023-12-05",
            status: "Terkirim",
        },
        {
            id: "ZD-2023-005",
            recipient: "Pak Darmawan",
            amount: "Rp 1,200,000",
            category: "Gharim",
            date: "2023-12-06",
            status: "Belum Terkirim",
        },
    ];

    const pendingAlerts = [
        {
            id: "ZD-2023-003",
            recipient: "Pesantren Nurul Iman",
            amount: "Rp 3,500,000",
            category: "Fisabilillah",
            dueDate: "2023-12-10",
        },
        {
            id: "ZD-2023-005",
            recipient: "Pak Darmawan",
            amount: "Rp 1,200,000",
            category: "Gharim",
            dueDate: "2023-12-12",
        },
        {
            id: "ZD-2023-008",
            recipient: "Keluarga Anwar",
            amount: "30 Kg",
            category: "Miskin",
            dueDate: "2023-12-15",
        },
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="flex min-h-screen">
            {/* Main Dashboard Content */}
            <main className="flex-1 pt-6 overflow-auto">
                <div className="flex flex-col gap-6">
                    {/* Page Title and Filter */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold">Dashboard</h1>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button className="w-full sm:w-auto" asChild>
                                <a
                                    href={route("laporan.zakat.pdf")}
                                    className="inline-flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Export PDF
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Zakat Terkumpul
                                </CardTitle>
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(
                                        summaryData.totalCollected.idr
                                    )}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    <span className="font-medium">
                                        {summaryData.totalCollected.kg.toFixed(
                                            1
                                        )}{" "}
                                        Kg
                                    </span>{" "}
                                    Beras
                                </div>
                                {/* <div className="flex items-center mt-3 text-xs text-emerald-500">
                                        <ArrowUp className="w-3 h-3 mr-1" />
                                        <span>12.5% dari bulan lalu</span>
                                    </div> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Zakat Tersalurkan
                                </CardTitle>
                                <Package className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(
                                        summaryData.totalDistributed.idr
                                    )}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    <span className="font-medium">
                                        {summaryData.totalDistributed.kg.toFixed(
                                            1
                                        )}{" "}
                                        Kg
                                    </span>{" "}
                                    Beras
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Zakat Lainnya Tersalurkan
                                </CardTitle>
                                <Users className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(
                                        props.totalUangDistribusiLainnya
                                    )}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    <span className="font-medium">
                                        {props.totalBerasDistribusiLainnya.toFixed(
                                            1
                                        )}{" "}
                                        Kg
                                    </span>{" "}
                                    Beras
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Status Pembayaran Zakat
                                </CardTitle>
                                <Users className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {summaryData.total_warga_wajib_zakat}/
                                    {summaryData.sudah_bayar}/
                                    {summaryData.belum_bayar}
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Total warga wajib zakat / Sudah bayar /
                                    Belum bayar
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Jumlah Zakat Terdistribusi
                                </CardTitle>
                                <Users className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {props.jumlahWargaTerdistribusi} Warga
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Sudah menerima manfaat zakat
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Jumlah Zakat Lainnya Terdistribusi
                                </CardTitle>
                                <Users className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {props.jumlahPenerimaLainnya} Warga
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                    Sudah menerima manfaat zakat
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            {/* </div> */}
        </div>
    );
}
