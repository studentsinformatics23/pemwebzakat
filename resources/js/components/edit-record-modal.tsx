import { useState, useEffect } from "react";
import type { ZakatRecord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
// import { useToast } from "@/components/ui/use-toast"

interface EditRecordModalProps {
    record: ZakatRecord;
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: ZakatRecord) => void;
}

export default function EditRecordModal({
    record,
    isOpen,
    onClose,
    onSave,
}: EditRecordModalProps) {
    const BERAS = 2.5;
    const UANG = 15000 * BERAS; // 15000 harga per kilo

    const [editedRecord, setEditedRecord] = useState<ZakatRecord>({
        ...record,
    });

    useEffect(() => {
        setEditedRecord({ ...record });
    }, [record]);

    const handleChange = (field: keyof ZakatRecord, value: any) => {
        setEditedRecord((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Reset payment fields when jenis_bayar changes
        if (field === "jenis_bayar") {
            if (value === "beras") {
                setEditedRecord((prev) => ({
                    ...prev,
                    bayar_beras: (prev.jumlah_tanggungan + 1) * BERAS || 0,
                    bayar_uang: 0,
                }));
            } else {
                setEditedRecord((prev) => ({
                    ...prev,
                    bayar_uang: (prev.jumlah_tanggungan + 1) * UANG || 0,
                    bayar_beras: 0,
                }));
            }
        }
    };

    const handleSave = () => {
        const data = editedRecord;

        if (!data.jenis_bayar) {
            toast.error("Jenis bayar harus diisi");
            return;
        }

        router.patch(
            `/bayar-zakat/${data.id}`,
            { ...data },
            {
                onSuccess: () => {
                    toast.success("Pembayaran Berhasil Dilakukan", {
                        id: "bayar-zakat",
                    });
                    onClose();
                    router.reload({ only: ["bayarZakat"] });
                    onSave(data);
                    // end undo
                },
                onStart: () => {
                    toast.loading("Proses Sedang Berjalan", {
                        id: "bayar-zakat",
                    });
                },
                onError: () => {
                    toast.error("Pembayaran Gagal Dilakukan", {
                        id: "bayar-zakat",
                    });
                },
            }
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Edit Catatan Pembayaran Zakat
                    </DialogTitle>
                    <DialogDescription>
                        Perbarui detail pembayaran zakat untuk {record.nama_KK}.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="nama_KK" className="text-right">
                            Nama KK
                        </Label>
                        <Input
                            id="nama_KK"
                            value={editedRecord.nama_KK}
                            className="col-span-3"
                            disabled
                        />
                    </div>

                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="nomor_KK" className="text-right">
                            Nomor KK
                        </Label>
                        <Input
                            id="nomor_KK"
                            value={editedRecord.nomor_KK}
                            className="col-span-3"
                            disabled
                        />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label
                            htmlFor="jumlah_tanggungan"
                            className="text-right"
                        >
                            Jumlah Tanggungan
                        </Label>
                        <Input
                            id="jumlah_tanggungan"
                            value={editedRecord.jumlah_tanggungan}
                            className="col-span-3"
                            disabled
                        />
                    </div>

                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="jenis_bayar" className="text-right">
                            Jenis Bayar
                        </Label>
                        <Select
                            value={editedRecord.jenis_bayar}
                            onValueChange={(value) =>
                                handleChange("jenis_bayar", value)
                            }
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beras">Beras</SelectItem>
                                <SelectItem value="uang">Uang</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {editedRecord.jenis_bayar === "beras" ? (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="bayar_beras" className="text-right">
                                Bayar Beras (kg)
                            </Label>
                            <Input
                                disabled
                                id="bayar_beras"
                                type="number"
                                value={editedRecord.bayar_beras || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "bayar_beras",
                                        Number.parseFloat(e.target.value) || 0
                                    )
                                }
                                className="col-span-3"
                            />
                        </div>
                    ) : (
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="bayar_uang" className="text-right">
                                Bayar Uang (Rp)
                            </Label>
                            <Input
                                disabled
                                id="bayar_uang"
                                type="number"
                                value={editedRecord.bayar_uang || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "bayar_uang",
                                        Number.parseFloat(e.target.value) || 0
                                    )
                                }
                                className="col-span-3"
                            />
                        </div>
                    )}

                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
                        <Select
                            value={editedRecord.status}
                            onValueChange={(value) =>
                                handleChange("status", value)
                            }
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="lunas">Lunas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-[#EC407A] hover:bg-[#D81B60]"
                    >
                        Simpan Perubahan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
