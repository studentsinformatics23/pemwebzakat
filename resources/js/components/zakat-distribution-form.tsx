import type React from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { type ZakatDistribution, wargaList, zakatCategories } from "@/lib/data";
import { DistribusiZakat } from "@/pages/distribusi";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface ZakatDistributionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<DistribusiZakat>) => void;
    initialData: Partial<DistribusiZakat>;
    isEditing: boolean;
}

export default function DistribusiZakatForm({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEditing,
}: ZakatDistributionFormProps) {
    const [mustahikData, setMustahikData] = useState<any[]>([]);
    const [formData, setFormData] =
        useState<Partial<DistribusiZakat>>(initialData);

    // More reliable initialization when initialData or isOpen changes
    useEffect(() => {
        if (isOpen && initialData) {
            // Ensure we preserve jenis_bantuan and other fields
            setFormData({
                ...initialData,
                jenis_bantuan: initialData.jenis_bantuan || undefined,
            });

            // Debug log
            console.log("Form opened with initialData:", initialData);
        }
    }, [initialData, isOpen]);

    const handleChange = (field: keyof DistribusiZakat, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (formData.jenis_bantuan == "beras" && formData.kategori_id == 9) {
            setFormData((prev) => ({
                ...prev,
                jumlah_beras: 2.5,
                jumlah_uang: 0,
            }));
        }

        if (formData.jenis_bantuan == "uang" && formData.kategori_id == 9) {
            setFormData((prev) => ({
                ...prev,
                jumlah_beras: 0,
                jumlah_uang: 50000,
            }));
        }
    }, [formData.jenis_bantuan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        console.log(formData);
        // Remove non-primitive fields before sending
        const { warga, kategori, ...payload } = formData;
        router.patch(
            `/distribusi/${formData.id}`,
            { ...payload },
            {
                onSuccess: () => {
                    toast.success("Zakar Berhasil Terdistribusi", {
                        id: "distribusi",
                    });
                },
                onStart: () => {
                    toast.loading("Proses sedang dilakukan", {
                        id: "distribusi",
                    });
                },
                onError: () => {
                    toast.error("Gagal melakukan prosess", {
                        id: "distribusi",
                    });
                },
            }
        );
    };

    useEffect(() => {
        const getMustahik = async () => {
            try {
                const response = await fetch(`/mustahik`);
                const data = await response.json();
                setMustahikData(data);
            } catch (error) {
                console.error("Error fetching mustahik data:", error);
            }
        };
        getMustahik();
    }, []);

    // Console log to help debug
    // useEffect(() => {
    //     console.log("Current form data:", formData);
    //     console.log("Initial Data", initialData);
    // }, [formData]);

    // Effect to automatically set values when a category is selected
    // Modified to not override jenis_bantuan if it's already set
    useEffect(() => {
        if (formData.kategori_id) {
            const selectedCategory = mustahikData.find(
                (cat: any) => cat.id === formData.kategori_id
            );

            if (selectedCategory) {
                // Don't override jenis_bantuan if it's already set from initialData
                if (!formData.jenis_bantuan) {
                    // Get the jenis_bantuan directly from the selected category
                    const jenis = selectedCategory.jenis_bantuan;
                    const jumlah = selectedCategory.jumlah ?? 0;

                    // Set the jenis_bantuan value
                    handleChange("jenis_bantuan", jenis);

                    // Update the appropriate amount field based on the jenis_bantuan
                    if (jenis === "beras") {
                        handleChange("jumlah_beras", jumlah);
                        handleChange("jumlah_uang", null);
                    } else if (jenis === "uang") {
                        handleChange("jumlah_uang", jumlah);
                        handleChange("jumlah_beras", null);
                    }
                }
            }
        }
    }, [formData.kategori_id, mustahikData]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogDescription></DialogDescription>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing
                            ? "Konfirmasi Distribusi Zakat"
                            : "Distribute Zakat"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-3 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="recipient" className="font-medium">
                                Nama Kepala Keluarga{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                defaultValue={formData?.warga?.nama}
                                disabled
                                className="w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="category" className="font-medium">
                                Kategori Penerima{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={formData.kategori_id?.toString() ?? ""}
                                onValueChange={(value) => {
                                    const selectedId = Number(value);
                                    handleChange("kategori_id", selectedId);

                                    // Only change jenis_bantuan if we're not editing
                                    // or if jenis_bantuan is not already set
                                    if (!isEditing || !formData.jenis_bantuan) {
                                        // Directly set jenis_bantuan based on selected category
                                        const selectedCategory =
                                            mustahikData.find(
                                                (cat: any) =>
                                                    cat.id === selectedId
                                            );

                                        if (selectedCategory) {
                                            const jenis =
                                                selectedCategory.jenis_bantuan;
                                            const jumlah =
                                                selectedCategory.jumlah ?? 0;

                                            // Set the form data
                                            handleChange(
                                                "jenis_bantuan",
                                                jenis
                                            );

                                            if (jenis === "beras") {
                                                handleChange(
                                                    "jumlah_beras",
                                                    jumlah
                                                );
                                                handleChange(
                                                    "jumlah_uang",
                                                    null
                                                );
                                            } else if (jenis === "uang") {
                                                handleChange(
                                                    "jumlah_uang",
                                                    jumlah
                                                );
                                                handleChange(
                                                    "jumlah_beras",
                                                    null
                                                );
                                            }
                                        }
                                    }
                                }}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mustahikData?.map(
                                        (category: any, index: number) => (
                                            <SelectItem
                                                key={index}
                                                value={category?.id.toString()}
                                            >
                                                {category?.nama}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="jenis_bantuan"
                                className="font-medium"
                            >
                                Jenis Bantuan{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={formData.jenis_bantuan || ""}
                                onValueChange={(value) => {
                                    const jenisBantuan = value as
                                        | "beras"
                                        | "uang";
                                    handleChange("jenis_bantuan", jenisBantuan);

                                    if (jenisBantuan === "beras") {
                                        // Set default value for beras if needed
                                        const selectedCategory =
                                            mustahikData.find(
                                                (cat: any) =>
                                                    cat.id ===
                                                    formData.kategori_id
                                            );
                                        const jumlah =
                                            selectedCategory?.jumlah ?? 0;
                                        handleChange("jumlah_beras", jumlah);
                                        handleChange("jumlah_uang", null);
                                    } else if (jenisBantuan === "uang") {
                                        // Set default value for uang if needed
                                        const selectedCategory =
                                            mustahikData.find(
                                                (cat: any) =>
                                                    cat.id ===
                                                    formData.kategori_id
                                            );
                                        const jumlah =
                                            selectedCategory?.jumlah ?? 0;
                                        handleChange("jumlah_uang", jumlah);
                                        handleChange("jumlah_beras", null);
                                    }
                                }}
                            >
                                <SelectTrigger id="jenis_bantuan">
                                    <SelectValue placeholder="Pilih jenis bantuan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beras">Beras</SelectItem>
                                    <SelectItem value="uang">Uang</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-between gap-6">
                            <div className="w-full gap-2">
                                <Label
                                    htmlFor="jumlah_beras"
                                    className="font-medium"
                                >
                                    Jumlah Beras (Kg)
                                </Label>
                                <Input
                                    id="jumlah_beras"
                                    type="number"
                                    placeholder="Contoh: 10"
                                    value={formData.jumlah_beras ?? ""}
                                    onChange={(e) =>
                                        handleChange(
                                            "jumlah_beras",
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={
                                        formData.jenis_bantuan !== "beras" ||
                                        formData.kategori_id === 9
                                    }
                                />
                            </div>

                            <div className="w-full gap-2">
                                <Label
                                    htmlFor="jumlah_uang"
                                    className="font-medium"
                                >
                                    Jumlah Uang (Rp)
                                </Label>
                                <Input
                                    id="jumlah_uang"
                                    type="number"
                                    placeholder="Contoh: 50000"
                                    value={formData.jumlah_uang ?? ""}
                                    onChange={(e) =>
                                        handleChange(
                                            "jumlah_uang",
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={
                                        formData.jenis_bantuan !== "uang" ||
                                        formData.kategori_id === 9
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status" className="font-medium">
                                Status
                            </Label>
                            <Select
                                value={formData.status || ""}
                                onValueChange={(value) =>
                                    handleChange("status", value)
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="terkirim">
                                        Terkirim
                                    </SelectItem>
                                    <SelectItem value="belum_terkirim">
                                        Belum Terima
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isEditing ? "Save Changes" : "Save Record"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
