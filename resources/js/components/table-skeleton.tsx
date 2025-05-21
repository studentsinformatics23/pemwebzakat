import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function TableSkeleton() {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Jenis Bantuan</TableHead>
                        <TableHead>Jumlah Beras</TableHead>
                        <TableHead>Jumlah Uang</TableHead>
                        <TableHead>Catatan</TableHead>
                        <TableHead>Tanggal Distribusi</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Kategori</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[60px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[150px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-[90px] rounded-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[80px]" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
