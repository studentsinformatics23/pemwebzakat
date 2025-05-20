import type React from "react";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import type { ZakatRecord } from "@/lib/types";

import DataTable from "./data-table";

export default function ZakatDashboard(props: { bayarZakat: ZakatRecord[] }) {
    const [data, setData] = useState<ZakatRecord[]>(props.bayarZakat);
    const [filteredData, setFilteredData] =
        useState<ZakatRecord[]>(props.bayarZakat);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentTypeFilter, setPaymentTypeFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        let result = [...data];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (item) =>
                    item.nama_KK.toLowerCase().includes(query) ||
                    item.nomor_KK.toLowerCase().includes(query) ||
                    item.jenis_bayar.toLowerCase().includes(query)
            );
        }

        // Apply status filter
        if (statusFilter !== "all") {
            result = result.filter((item) => item.status === statusFilter);
        }

        // Apply payment type filter
        if (paymentTypeFilter !== "all") {
            result = result.filter(
                (item) => item.jenis_bayar === paymentTypeFilter
            );
        }

        setFilteredData(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchQuery, statusFilter, paymentTypeFilter, data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
    };

    const handlePaymentTypeFilterChange = (value: string) => {
        setPaymentTypeFilter(value);
    };

    const handleRowsPerPageChange = (value: string) => {
        setRowsPerPage(Number.parseInt(value));
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const updateRecord = (updatedRecord: ZakatRecord) => {
        const updatedData = data.map((record) =>
            record.id === updatedRecord.id ? updatedRecord : record
        );
        setData(updatedData);
    };

    return (
        <div className="">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
                Manajemen Pembayaran Zakat
            </h1>

            <Card>
                <CardHeader className="pb-2">
                    {/* <CardTitle className="text-xl font-semibold text-gray-700">Zakat Payment Records</CardTitle> */}
                    <div className="flex flex-col items-start justify-between gap-4 mt-4 md:flex-row md:items-center">
                        <div className="flex flex-col w-full gap-2 sm:flex-row md:w-auto">
                            {/* <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <Select
                                    value={paymentTypeFilter}
                                    onValueChange={
                                        handlePaymentTypeFilterChange
                                    }
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Payment Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Jenis
                                        </SelectItem>
                                        <SelectItem value="beras">
                                            Beras
                                        </SelectItem>
                                        <SelectItem value="uang">
                                            Uang
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div> */}

                            <div className="flex items-center gap-2">
                                {/* <Filter className="w-4 h-4 text-gray-500" /> */}
                                <Select
                                    value={statusFilter}
                                    onValueChange={handleStatusFilterChange}
                                >
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="lunas">
                                            Lunas
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="relative w-full md:w-auto">
                            <Search className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
                            <Input
                                placeholder="Cari berdasarkan Nama, Nomor KK..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="pl-9 w-full md:w-[300px]"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        data={filteredData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={handleRowsPerPageChange}
                        updateRecord={updateRecord}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
