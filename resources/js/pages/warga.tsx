import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    FileText,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data for payments and receipts
const paymentHistory = [
    {
        id: 1,
        citizenId: 1,
        type: "Zakat",
        amount: 500000,
        period: "January 2023",
        status: "Paid",
        date: new Date("2023-01-10"),
    },
    {
        id: 2,
        citizenId: 1,
        type: "Infaq",
        amount: 200000,
        period: "February 2023",
        status: "Paid",
        date: new Date("2023-02-15"),
    },
    {
        id: 3,
        citizenId: 2,
        type: "Sedekah",
        amount: 300000,
        period: "March 2023",
        status: "Paid",
        date: new Date("2023-03-20"),
    },
];

const receiptHistory = [
    {
        id: 1,
        citizenId: 2,
        type: "Zakat",
        amount: 750000,
        period: "January 2023",
        status: "Received",
        date: new Date("2023-01-25"),
    },
    {
        id: 2,
        citizenId: 3,
        type: "Infaq",
        amount: 500000,
        period: "February 2023",
        status: "Received",
        date: new Date("2023-02-28"),
    },
];

interface Kategori {
    id: number;
    nama: string;
    deskripsi: string;
    created_at: string | null;
    updated_at: string | null;
}

interface Warga {
    id: string;
    nama: string;
    deskripsi: string;
    jumlah_tanggungan: number;
    kategori_id: string;
    keluarga_id: string;
    created_at: string;
    updated_at: string;
    kategori: Kategori;
}

interface Muzakki {
    nama: string;
    keluarga_id: string;
    kategori_id: string;
    jumlah_tanggungan: number | null;
    deskripsi?: string;
}

export default function Warga(props: { warga: Warga[]; kategori: Kategori[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCitizen, setSelectedCitizen] = useState<null | Warga>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // create warga
    const [selectedKategoriForCreate, setSelectedKategoriForCreate] =
        useState("");
    const [createMuzakki, setCreateMuzakki] = useState<Muzakki>();

    // update warga
    const [selectedKategoriForUpdate, setSelectedKategoriForUpdate] =
        useState("");
    const [updateMuzakki, setUpdateMuzakki] = useState<Muzakki>({
        nama: selectedCitizen?.nama!,
        keluarga_id: selectedCitizen?.keluarga_id!,
        kategori_id: selectedCitizen?.kategori_id!,
        jumlah_tanggungan: selectedCitizen?.jumlah_tanggungan!,
        deskripsi: selectedCitizen?.deskripsi,
    });

    // Filter citizens based on search term and category
    const filteredCitizens = props.warga.filter((citizen) => {
        const matchesSearch = citizen.nama
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" ||
            String(citizen.kategori_id) === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredCitizens.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCitizens = filteredCitizens.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleItemsPerPageChange = (newLimit: number) => {
        setItemsPerPage(newLimit);
        setCurrentPage(1); // reset ke halaman pertama
    };

    // View citizen details
    const handleViewDetails = (citizen: Warga) => {
        setSelectedCitizen(citizen);
        setIsDetailsOpen(true);
    };

    // Get payment history for a citizen
    const getCitizenPayments = (citizenId: any) => {
        return paymentHistory.filter(
            (payment) => payment.citizenId === citizenId
        );
    };

    // Get receipt history for a citizen
    const getCitizenReceipts = (citizenId: any) => {
        return receiptHistory.filter(
            (receipt) => receipt.citizenId === citizenId
        );
    };

    const validateMuzakki = (
        data: Muzakki,
        kategoriSelected: string
    ): string | null => {
        if (!data?.nama?.trim()) return "Nama lengkap wajib diisi.";
        if (
            data.jumlah_tanggungan! === undefined ||
            data.jumlah_tanggungan! === null ||
            isNaN(Number(data.jumlah_tanggungan)) ||
            Number(data.jumlah_tanggungan) < 0
        ) {
            return "Jumlah tanggungan harus berupa angka positif.";
        }
        if (!data.keluarga_id?.trim()) return "Nomor KK wajib diisi.";
        if (!kategoriSelected!) return "Kategori wajib dipilih.";

        return null;
    };

    function getBadgeClass(kategori: string) {
        switch (kategori) {
            case "Fakir":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            case "Miskin":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "Amil":
                return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
            case "Muallaf":
                return "bg-pink-100 text-pink-800 hover:bg-pink-100";
            case "Riqab":
                return "bg-purple-100 text-purple-800 hover:bg-purple-100";
            case "Gharim":
                return "bg-orange-100 text-orange-800 hover:bg-orange-100";
            case "Fisabilillah":
                return "bg-teal-100 text-teal-800 hover:bg-teal-100";
            case "Ibnu Sabil":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    }

    // create muzakki
    const handleCreateMuzakki = () => {
        const error = validateMuzakki(
            createMuzakki!,
            selectedKategoriForCreate
        );
        if (error) {
            toast.error(error);
            return;
        }

        const data = {
            ...createMuzakki,
            kategori_id: selectedKategoriForCreate,
        };

        router.post("/muzakki", data, {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                setCreateMuzakki({
                    jumlah_tanggungan: null,
                    kategori_id: "",
                    keluarga_id: "",
                    nama: "",
                    deskripsi: "",
                });
                setSelectedKategoriForCreate("");
                toast.success("Data Berhasil Ditambahkan", {
                    id: "create-muzakki",
                });
            },
            onError: (errors) => {
                console.error(errors);
            },
            onStart: () => {
                toast.loading("Data Sedang Diproses", {
                    id: "create-muzakki",
                });
            },
        });
    };

    // update muzakki
    useEffect(() => {
        if (selectedCitizen?.kategori_id) {
            setSelectedKategoriForUpdate(String(selectedCitizen.kategori_id));
        }
    }, [selectedCitizen, setSelectedKategoriForUpdate]);

    useEffect(() => {
        if (selectedCitizen) {
            setUpdateMuzakki({
                nama: selectedCitizen.nama || "",
                keluarga_id: selectedCitizen?.keluarga_id! || "",
                kategori_id: selectedCitizen?.kategori_id! || "",
                jumlah_tanggungan: selectedCitizen?.jumlah_tanggungan!,
                deskripsi: selectedCitizen?.deskripsi || "",
            });
        }
    }, [selectedCitizen, setSelectedKategoriForUpdate]);

    const handleUpdateMuzakki = () => {
        const error = validateMuzakki(updateMuzakki, selectedKategoriForUpdate);
        if (error) {
            toast.error(error);
            return;
        }

        const data = {
            ...updateMuzakki,
            kategori_id: selectedKategoriForUpdate,
        };

        router.patch(`/muzakki/${selectedCitizen?.id}`, data, {
            onSuccess: () => {
                setIsEditDialogOpen(false);

                setUpdateMuzakki({
                    jumlah_tanggungan: null,
                    kategori_id: "",
                    keluarga_id: "",
                    nama: "",
                    deskripsi: "",
                });
                setSelectedKategoriForUpdate("");
                toast.success("Data berhasil diperbarui", {
                    id: "edit-muzakki",
                });
            },
            onError: (errors) => {
                toast.error(
                    "Terjadi Kesalahan Tolong Ulangi setelah beberapa saat",
                    {
                        id: "edit-muzakki",
                    }
                );
                console.error(errors);
            },
            onStart: () => {
                toast.loading("Data Sedang Diproses", {
                    id: "edit-muzakki",
                });
            },
        });
    };

    // delete muzakki
    const handleDelete = (id: string) => {
        console.log(id);
        router.delete(`/muzakki/${selectedCitizen?.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                toast.success("Data berhasil dihapus", {
                    id: "delete-muzakki",
                });
            },
            onError: (errors) => {
                toast.error(
                    "Terjadi Kesalahan Tolong Ulangi setelah beberapa saat",
                    {
                        id: "delete-muzakki",
                    }
                );
                console.error(errors);
            },
            onStart: () => {
                toast.loading("Data Sedang Diproses", {
                    id: "delete-muzakki",
                });
            },
        });
    };

    return (
        <>
            <AuthenticatedLayout header="Dashboard">
                <Head title="Dashboard" />
                <div className="min-h-screen mx-0 md:flex md:mx-6">
                    <div className="mx-auto md:flex-1 md:max-w-full max-w-96 md:mx-0">
                        <header className="flex items-center h-16 gap-4 border-b bg-background">
                            <h1 className="text-2xl font-bold md:text-3xl">
                                Manajemen Kelola Warga
                            </h1>
                        </header>

                        <main className="py-6">
                            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center flex-1 gap-4">
                                    <div className="flex-1 sm:max-w-sm">
                                        <Input
                                            type="search"
                                            placeholder="Cari warga..."
                                            className=""
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={setSelectedCategory}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {props.kategori.map(
                                                (category: Kategori) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={String(
                                                            category?.id
                                                        )}
                                                    >
                                                        {category.nama}
                                                    </SelectItem>
                                                )
                                            )}
                                            <SelectItem value={"All"}>
                                                All
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* UI Tambah Warga */}
                                <Dialog
                                    open={isAddDialogOpen}
                                    onOpenChange={setIsAddDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="gap-1">
                                            <Plus className="w-4 h-4" />
                                            Tambah
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Muzakki Baru
                                            </DialogTitle>
                                            <DialogDescription>
                                                Masukkan rincian muzakki baru di
                                                bawah ini.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="fullName">
                                                    Nama lengkap
                                                </Label>
                                                <Input
                                                    onChange={(e) => {
                                                        setCreateMuzakki(
                                                            (prev: any) => {
                                                                return {
                                                                    ...prev,
                                                                    nama: e
                                                                        .target
                                                                        .value,
                                                                };
                                                            }
                                                        );
                                                    }}
                                                    id="fullName"
                                                    placeholder="Masukan nama lengkap"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="jumlah_tanggungan">
                                                    Jumlah tanggungan
                                                </Label>
                                                <Input
                                                    onChange={(e) => {
                                                        setCreateMuzakki(
                                                            (prev: any) => {
                                                                return {
                                                                    ...prev,
                                                                    jumlah_tanggungan:
                                                                        e.target
                                                                            .value,
                                                                };
                                                            }
                                                        );
                                                    }}
                                                    type="number"
                                                    id="jumlah_tanggungan"
                                                    placeholder="Masukan jumlah tanggungan"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="description">
                                                    Deskripsi/Keterangan
                                                </Label>
                                                <Textarea
                                                    onChange={(e) => {
                                                        setCreateMuzakki(
                                                            (prev: any) => {
                                                                return {
                                                                    ...prev,
                                                                    deskripsi:
                                                                        e.target
                                                                            .value,
                                                                };
                                                            }
                                                        );
                                                    }}
                                                    id="description"
                                                    placeholder="Masukan deskripsi atau keterangan"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="familyId">
                                                        Nomer KK
                                                    </Label>
                                                    <Input
                                                        onChange={(e) => {
                                                            setCreateMuzakki(
                                                                (prev: any) => {
                                                                    return {
                                                                        ...prev,
                                                                        keluarga_id:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                        id="familyId"
                                                        placeholder="e.g. F-001"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="category">
                                                        Kategori
                                                    </Label>
                                                    <Select
                                                        value={
                                                            selectedKategoriForCreate
                                                        }
                                                        onValueChange={
                                                            setSelectedKategoriForCreate
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Kategori" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {props.kategori.map(
                                                                (
                                                                    value,
                                                                    index
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={String(
                                                                            value.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            value.nama
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    setIsAddDialogOpen(false)
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={handleCreateMuzakki}
                                            >
                                                Save Citizen
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="overflow-x-auto border rounded-md">
                                <div className="min-w-full">
                                    <Table className="min-w-full whitespace-nowrap">
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nama</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Nomer KK
                                                </TableHead>
                                                <TableHead>
                                                    Tanggungan
                                                </TableHead>
                                                <TableHead>Kategori</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Ditambahkan
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Aksi
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedCitizens.map(
                                                (citizen, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="font-medium">
                                                            {citizen.nama}
                                                        </TableCell>
                                                        <TableCell className="hidden max-w-xs truncate md:table-cell">
                                                            {
                                                                citizen.keluarga_id
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                citizen.jumlah_tanggungan
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant="outline"
                                                                className={getBadgeClass(
                                                                    citizen
                                                                        .kategori
                                                                        .nama
                                                                )}
                                                            >
                                                                {
                                                                    citizen
                                                                        .kategori
                                                                        .nama
                                                                }
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="hidden md:table-cell">
                                                            {format(
                                                                citizen.created_at,
                                                                "PPP"
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() =>
                                                                        handleViewDetails(
                                                                            citizen
                                                                        )
                                                                    }
                                                                    title="View Details"
                                                                >
                                                                    <FileText className="w-4 h-4" />
                                                                    <span className="sr-only">
                                                                        View
                                                                        Details
                                                                    </span>
                                                                </Button>

                                                                <Dialog
                                                                    open={
                                                                        isEditDialogOpen
                                                                    }
                                                                    onOpenChange={
                                                                        setIsEditDialogOpen
                                                                    }
                                                                >
                                                                    <DialogTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() =>
                                                                                setSelectedCitizen(
                                                                                    citizen
                                                                                )
                                                                            }
                                                                            title="Edit"
                                                                        >
                                                                            <Pencil className="w-4 h-4" />
                                                                            <span className="sr-only">
                                                                                Edit
                                                                            </span>
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>
                                                                                Edit
                                                                                Warga
                                                                            </DialogTitle>
                                                                            <DialogDescription>
                                                                                Lakukan
                                                                                perubahan
                                                                                pada
                                                                                informasi
                                                                                warga
                                                                                di
                                                                                bawah
                                                                                ini.
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        {selectedCitizen && (
                                                                            <div className="grid gap-4 py-4">
                                                                                <div className="grid gap-2">
                                                                                    <Label htmlFor="edit-fullName">
                                                                                        Nama
                                                                                        lengkap
                                                                                    </Label>
                                                                                    <Input
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setUpdateMuzakki(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        nama: e
                                                                                                            .target
                                                                                                            .value,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                        id="edit-fullName"
                                                                                        defaultValue={
                                                                                            selectedCitizen.nama
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="grid gap-2">
                                                                                    <Label htmlFor="edit-jumlah-tanggungan">
                                                                                        Jumlah
                                                                                        tanggungan
                                                                                    </Label>
                                                                                    <Input
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setUpdateMuzakki(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        jumlah_tanggungan:
                                                                                                            e
                                                                                                                .target
                                                                                                                .value,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                        type="number"
                                                                                        id="edit-jumlah-tanggungan"
                                                                                        defaultValue={
                                                                                            selectedCitizen.jumlah_tanggungan
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="grid gap-2">
                                                                                    <Label htmlFor="edit-description">
                                                                                        Deskripsi
                                                                                    </Label>
                                                                                    <Textarea
                                                                                        onChange={(
                                                                                            e
                                                                                        ) => {
                                                                                            setUpdateMuzakki(
                                                                                                (
                                                                                                    prev: any
                                                                                                ) => {
                                                                                                    return {
                                                                                                        ...prev,
                                                                                                        deskripsi:
                                                                                                            e
                                                                                                                .target
                                                                                                                .value,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                        id="edit-description"
                                                                                        defaultValue={
                                                                                            selectedCitizen.deskripsi
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                    <div className="grid gap-2">
                                                                                        <Label htmlFor="edit-familyId">
                                                                                            Nomor
                                                                                            KK
                                                                                        </Label>
                                                                                        <Input
                                                                                            onChange={(
                                                                                                e
                                                                                            ) => {
                                                                                                setUpdateMuzakki(
                                                                                                    (
                                                                                                        prev: any
                                                                                                    ) => {
                                                                                                        return {
                                                                                                            ...prev,
                                                                                                            keluarga_id:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value,
                                                                                                        };
                                                                                                    }
                                                                                                );
                                                                                            }}
                                                                                            id="edit-familyId"
                                                                                            defaultValue={
                                                                                                selectedCitizen.keluarga_id
                                                                                            }
                                                                                        />
                                                                                    </div>
                                                                                    <div className="grid gap-2">
                                                                                        <Label htmlFor="edit-category">
                                                                                            Kategori{" "}
                                                                                            {
                                                                                                selectedCitizen
                                                                                                    .kategori
                                                                                                    .nama
                                                                                            }
                                                                                        </Label>
                                                                                        <Select
                                                                                            value={
                                                                                                selectedKategoriForUpdate
                                                                                            }
                                                                                            onValueChange={
                                                                                                setSelectedKategoriForUpdate
                                                                                            }
                                                                                        >
                                                                                            <SelectTrigger>
                                                                                                <SelectValue placeholder="Pilih Kategori" />
                                                                                            </SelectTrigger>
                                                                                            <SelectContent>
                                                                                                {props.kategori.map(
                                                                                                    (
                                                                                                        value,
                                                                                                        index
                                                                                                    ) => (
                                                                                                        <SelectItem
                                                                                                            key={
                                                                                                                index
                                                                                                            }
                                                                                                            value={String(
                                                                                                                value.id
                                                                                                            )}
                                                                                                        >
                                                                                                            {
                                                                                                                value.nama
                                                                                                            }
                                                                                                        </SelectItem>
                                                                                                    )
                                                                                                )}
                                                                                            </SelectContent>
                                                                                        </Select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        <DialogFooter>
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    setIsEditDialogOpen(
                                                                                        false
                                                                                    )
                                                                                }
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                            <Button
                                                                                onClick={
                                                                                    handleUpdateMuzakki
                                                                                }
                                                                            >
                                                                                Simpan
                                                                            </Button>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>

                                                                <Dialog
                                                                    open={
                                                                        isDeleteDialogOpen
                                                                    }
                                                                    onOpenChange={
                                                                        setIsDeleteDialogOpen
                                                                    }
                                                                >
                                                                    <DialogTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="text-red-500 hover:text-red-600"
                                                                            onClick={() =>
                                                                                setSelectedCitizen(
                                                                                    citizen
                                                                                )
                                                                            }
                                                                            title="Delete"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                            <span className="sr-only">
                                                                                Delete
                                                                            </span>
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>
                                                                                Konfirmasi
                                                                                Penghapusan
                                                                            </DialogTitle>
                                                                            <DialogDescription>
                                                                                Apakah
                                                                                Anda
                                                                                yakin
                                                                                ingin
                                                                                menghapus
                                                                                warga
                                                                                ini?
                                                                                Tindakan
                                                                                ini
                                                                                tidak
                                                                                dapat
                                                                                dibatalkan.
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        <DialogFooter>
                                                                            <Button
                                                                                variant="outline"
                                                                                onClick={() =>
                                                                                    setIsDeleteDialogOpen(
                                                                                        false
                                                                                    )
                                                                                }
                                                                            >
                                                                                Batal
                                                                            </Button>
                                                                            <Button
                                                                                variant="destructive"
                                                                                onClick={() =>
                                                                                    handleDelete(
                                                                                        selectedCitizen?.id!
                                                                                    )
                                                                                }
                                                                            >
                                                                                Hapus
                                                                            </Button>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex flex-col items-center justify-between gap-4 mt-4 md:flex-row">
                                    {/* Info bar */}
                                    <div className="text-sm text-muted-foreground">
                                        Menampilkan {startIndex + 1} sampai{" "}
                                        {Math.min(
                                            startIndex + itemsPerPage,
                                            filteredCitizens.length
                                        )}{" "}
                                        dari {filteredCitizens.length} Warga
                                    </div>

                                    {/* Pagination & Dropdown */}
                                    <div className="flex items-center space-x-4">
                                        {/* Pagination Controls */}
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1
                                                    )
                                                }
                                                disabled={currentPage === 1}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                <span className="sr-only">
                                                    Previous
                                                </span>
                                            </Button>

                                            <div className="px-2 text-sm font-medium">
                                                Page {currentPage} of{" "}
                                                {totalPages}
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage + 1
                                                    )
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                                <span className="sr-only">
                                                    Next
                                                </span>
                                            </Button>
                                        </div>

                                        {/* Dropdown using ShadCN Select */}
                                        <div className="flex items-center space-x-2">
                                            <label
                                                htmlFor="itemsPerPage"
                                                className="text-sm"
                                            >
                                                Rows per page:
                                            </label>
                                            <Select
                                                value={String(itemsPerPage)}
                                                onValueChange={(value) =>
                                                    handleItemsPerPageChange(
                                                        Number(value)
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="w-[80px]">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="5">
                                                        5
                                                    </SelectItem>
                                                    <SelectItem value="10">
                                                        10
                                                    </SelectItem>
                                                    <SelectItem value="25">
                                                        25
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>

                {/* Citizen Details Sheet */}
                <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <SheetContent className="sm:max-w-md">
                        <SheetHeader>
                            <SheetTitle>Citizen Details</SheetTitle>
                            <SheetDescription>
                                View detailed information about this citizen.
                            </SheetDescription>
                        </SheetHeader>

                        {selectedCitizen && (
                            <div className="mt-6 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div className="font-medium">
                                            Full Name:
                                        </div>
                                        <div>{selectedCitizen.nama}</div>
                                        <div className="font-medium">
                                            Family ID:
                                        </div>
                                        <div>{selectedCitizen.keluarga_id}</div>
                                        <div className="font-medium">
                                            Category:
                                        </div>
                                        <div>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    selectedCitizen.kategori
                                                        .nama === "Priority"
                                                        ? "bg-amber-100 text-amber-800"
                                                        : selectedCitizen
                                                              .kategori.nama ===
                                                          "Senior"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : selectedCitizen
                                                              .kategori.nama ===
                                                          "Youth"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }
                                            >
                                                {/* {selectedCitizen.category} */}
                                            </Badge>
                                        </div>
                                        <div className="font-medium">
                                            Created At:
                                        </div>
                                        <div>
                                            {/* {format(
                                                selectedCitizen.createdAt,
                                                "PPP"
                                            )} */}
                                        </div>
                                    </div>
                                    <div className="pt-2 text-sm">
                                        <div className="font-medium">
                                            Description:
                                        </div>
                                        <div className="mt-1">
                                            {/* {selectedCitizen.description} */}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment History */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">
                                        Payment History
                                    </h3>
                                    {getCitizenPayments(selectedCitizen.id)
                                        .length > 0 ? (
                                        <div className="border rounded-md">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Type
                                                        </TableHead>
                                                        <TableHead>
                                                            Amount
                                                        </TableHead>
                                                        <TableHead>
                                                            Period
                                                        </TableHead>
                                                        <TableHead>
                                                            Status
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {getCitizenPayments(
                                                        selectedCitizen.id
                                                    ).map((payment) => (
                                                        <TableRow
                                                            key={payment.id}
                                                        >
                                                            <TableCell>
                                                                {payment.type}
                                                            </TableCell>
                                                            <TableCell>
                                                                {new Intl.NumberFormat(
                                                                    "id-ID",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "IDR",
                                                                        minimumFractionDigits: 0,
                                                                    }
                                                                ).format(
                                                                    payment.amount
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {payment.period}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-green-800 bg-green-100"
                                                                >
                                                                    {
                                                                        payment.status
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No payment history available.
                                        </p>
                                    )}
                                </div>

                                {/* Receipt History */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">
                                        Receipt History
                                    </h3>
                                    {getCitizenReceipts(selectedCitizen.id)
                                        .length > 0 ? (
                                        <div className="border rounded-md">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>
                                                            Type
                                                        </TableHead>
                                                        <TableHead>
                                                            Amount
                                                        </TableHead>
                                                        <TableHead>
                                                            Period
                                                        </TableHead>
                                                        <TableHead>
                                                            Status
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {getCitizenReceipts(
                                                        selectedCitizen.id
                                                    ).map((receipt) => (
                                                        <TableRow
                                                            key={receipt.id}
                                                        >
                                                            <TableCell>
                                                                {receipt.type}
                                                            </TableCell>
                                                            <TableCell>
                                                                {new Intl.NumberFormat(
                                                                    "id-ID",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "IDR",
                                                                        minimumFractionDigits: 0,
                                                                    }
                                                                ).format(
                                                                    receipt.amount
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {receipt.period}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="text-blue-800 bg-blue-100"
                                                                >
                                                                    {
                                                                        receipt.status
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            No receipt history available.
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </AuthenticatedLayout>
        </>
    );
}
