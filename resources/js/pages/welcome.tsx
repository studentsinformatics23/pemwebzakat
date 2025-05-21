import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import {
    Heart,
    BarChart3,
    Users,
    Calendar,
    Shield,
    Menu,
    ChevronRight,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Eye,
} from "lucide-react";

export default function LandingPage({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-40 border-b bg-background">
                    <div className="container flex items-center justify-between h-16 py-4">
                        <div className="flex items-center gap-2">
                            {/* <Heart className="w-6 h-6 text-primary" /> */}
                            <span className="text-xl font-bold">
                                ZakaFit
                            </span>
                        </div>

                        <nav className="items-center hidden gap-6 md:flex">
                            <Link
                                href="#features"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Fitur
                            </Link>
                            <Link
                                href="#statistics"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Statistik
                            </Link>
                            <Link
                                href="#mission"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Misi Kami
                            </Link>
                            <Link
                                href="#contact"
                                className="text-sm font-medium transition-colors hover:text-primary"
                            >
                                Kontak
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Button
                                    asChild
                                    variant="outline"
                                    className="hidden md:inline-flex"
                                >
                                    <Link href={route("dashboard")}>
                                        Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="hidden md:inline-flex"
                                    >
                                        <Link href={route("login")}>Masuk</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="hidden md:inline-flex bg-primary hover:bg-primary/90"
                                    >
                                        <Link href={route("register")}>
                                            Daftar
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="w-5 h-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </div>
                </header>

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="w-full py-12 md:pt-32">
                        <div className="container px-4 md:px-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                            Zakat Digital untuk Masa Depan yang
                                            Lebih Baik
                                        </h1>
                                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                            Platform manajemen zakat modern yang
                                            memudahkan Anda mengelola dan
                                            menyalurkan zakat dengan aman,
                                            transparan, dan efisien.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="bg-primary hover:bg-primary/90"
                                        >
                                            <Link href="#features">
                                                Pelajari Lebih Lanjut{" "}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                <img
                                    src="/hero.png"
                                    width={550}
                                    height={550}
                                    alt="Zakat Digital Illustration"
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section
                        id="features"
                        className="w-full py-12 md:pt-32 bg-muted/50"
                    >
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                                        Fitur Unggulan
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                        Solusi Lengkap untuk Zakat Anda
                                    </h2>
                                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Platform kami menyediakan berbagai fitur
                                        yang memudahkan pengelolaan zakat secara
                                        digital dengan aman dan transparan.
                                    </p>
                                </div>
                            </div>
                            <div className="grid items-center max-w-5xl gap-6 py-12 mx-auto md:grid-cols-2 lg:grid-cols-4">
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <BarChart3 className="w-12 h-12 text-primary" />
                                        <CardTitle className="text-xl">
                                            Kalkulasi Zakat
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Hitung zakat Anda dengan mudah dan
                                            akurat sesuai dengan ketentuan
                                            syariah.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <Users className="w-12 h-12 text-primary" />
                                        <CardTitle className="text-xl">
                                            Penyaluran Tepat
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Salurkan zakat Anda kepada penerima
                                            yang tepat dengan verifikasi yang
                                            ketat.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <Eye className="w-12 h-12 text-primary" />
                                        <CardTitle className="text-xl">
                                            Transparansi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Menjamin anda bisa mengetahui
                                            penggunaan zakat anda.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <Shield className="w-12 h-12 text-primary" />
                                        <CardTitle className="text-xl">
                                            Keamanan Terjamin
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Data dan transaksi Anda dilindungi
                                            dengan sistem keamanan tingkat
                                            tinggi.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Statistics Section */}
                    <section id="statistik" className="w-full py-12 md:pt-32">
                        <div className="container px-4 md:px-6">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                        Dampak Zakat Digital
                                    </h2>
                                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                        Bersama-sama kita telah membuat
                                        perbedaan yang signifikan dalam
                                        masyarakat.
                                    </p>
                                </div>
                            </div>
                            <div className="grid max-w-5xl grid-cols-1 gap-8 py-12 mx-auto md:grid-cols-2 lg:grid-cols-4">
                                <div className="flex flex-col items-center justify-center p-6 space-y-2 border rounded-lg">
                                    <span className="text-4xl font-bold text-primary">
                                        10K+
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Pengguna Aktif
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 space-y-2 border rounded-lg">
                                    <span className="text-4xl font-bold text-primary">
                                        Rp5M+
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Zakat Tersalurkan
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 space-y-2 border rounded-lg">
                                    <span className="text-4xl font-bold text-primary">
                                        100+
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Program Bantuan
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-6 space-y-2 border rounded-lg">
                                    <span className="text-4xl font-bold text-primary">
                                        25+
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        Kota Terjangkau
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section
                        id="mission"
                        className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
                    >
                        <div className="container px-4 md:px-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="space-y-2">
                                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                                            Misi Kami
                                        </div>
                                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                            Memudahkan Ibadah Zakat di Era
                                            Digital
                                        </h2>
                                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                            Kami berkomitmen untuk membangun
                                            platform zakat digital yang aman,
                                            transparan, dan sesuai syariah untuk
                                            memudahkan umat Muslim menunaikan
                                            kewajiban zakatnya.
                                        </p>
                                    </div>
                                    <ul className="grid gap-2">
                                        <li className="flex items-center gap-2">
                                            <div className="flex items-center justify-center rounded-full h-7 w-7 bg-primary/10">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <span>
                                                100% sesuai dengan prinsip
                                                syariah
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="flex items-center justify-center rounded-full h-7 w-7 bg-primary/10">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <span>
                                                Transparansi penuh dalam
                                                penyaluran zakat
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="flex items-center justify-center rounded-full h-7 w-7 bg-primary/10">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <span>
                                                Diawasi oleh dewan syariah
                                                terpercaya
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Card className="w-full border-none shadow-lg">
                                        <CardHeader>
                                            <CardTitle>
                                                Testimoni Pengguna
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            <blockquote className="pl-4 italic border-l-4 border-primary text-muted-foreground">
                                                "Platform ini sangat memudahkan
                                                saya dalam menunaikan zakat.
                                                Prosesnya cepat, aman, dan
                                                transparan. Saya bisa melihat
                                                kemana zakat saya disalurkan."
                                                <footer className="mt-2 font-medium text-foreground">
                                                    — Ahmad Fauzi, Warga Setempat
                                                </footer>
                                            </blockquote>
                                            <blockquote className="pl-4 italic border-l-4 border-primary text-muted-foreground">
                                                "Sebagai lembaga amil zakat,
                                                kami terbantu dengan adanya
                                                platform ini. Pengelolaan zakat
                                                menjadi lebih efisien dan
                                                terorganisir dengan baik."
                                                <footer className="mt-2 font-medium text-foreground">
                                                    — Yayasan Amanah Zakat,
                                                    DKM Muhazirin
                                                </footer>
                                            </blockquote>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
                        <div className="container px-4 text-center md:px-6">
                            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                                    Mulai Perjalanan Zakat Digital Anda
                                </h2>
                                <p className="max-w-[85%] leading-normal text-white/80 sm:text-lg sm:leading-7 md:text-xl">
                                    Bergabunglah dengan ribuan Muslim lainnya
                                    yang telah merasakan kemudahan berzakat
                                    melalui platform kami.
                                </p>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="bg-white text-primary hover:bg-white/90"
                                    >
                                        <Link href="#">Hubungi Kami</Link>
                                    </Button>
                                    {/* <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="text-white border-white hover:bg-white/10"
                                >
                                    <Link href="/contact">Hubungi Kami</Link>
                                </Button> */}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer
                    id="contact"
                    className="w-full py-6 border-t bg-background md:py-12"
                >
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-primary" />
                                    <span className="text-xl font-bold">
                                        ZakaFit
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Platform manajemen zakat digital yang aman,
                                    transparan, dan sesuai syariah.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Tautan</h4>
                                <nav className="flex flex-col gap-2 text-sm">
                                    <Link
                                        href="#features"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Fitur
                                    </Link>
                                    <Link
                                        href="#statistics"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Statistik
                                    </Link>
                                    <Link
                                        href="#mission"
                                        className="transition-colors hover:text-primary"
                                    >
                                        Misi Kami
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className="transition-colors hover:text-primary"
                                    >
                                        FAQ
                                    </Link>
                                </nav>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Kontak</h4>
                                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                    <p>info@ZakaFit.id</p>
                                    {/* <p>+62 21 1234 5678</p>
                                    <p>Jl. Zakat No. 123, Jakarta Pusat</p> */}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Ikuti Kami
                                </h4>
                                <div className="flex gap-4">
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Facebook className="w-5 h-5" />
                                        <span className="sr-only">
                                            Facebook
                                        </span>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Twitter className="w-5 h-5" />
                                        <span className="sr-only">Twitter</span>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Instagram className="w-5 h-5" />
                                        <span className="sr-only">
                                            Instagram
                                        </span>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Youtube className="w-5 h-5" />
                                        <span className="sr-only">YouTube</span>
                                    </Link>
                                </div>
                                <div className="mt-4">
                                    <h4 className="mb-2 text-sm font-medium">
                                        Berlangganan Newsletter
                                    </h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="Email Anda"
                                            className="flex w-full px-3 py-1 text-sm transition-colors border rounded-md shadow-sm h-9 border-input bg-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        <Button
                                            size="sm"
                                            className="bg-primary hover:bg-primary/90"
                                        >
                                            Kirim
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 mt-8 text-sm text-center border-t text-muted-foreground">
                            &copy; {new Date().getFullYear()} ZakaFit. Hak
                            Cipta Dilindungi.
                        </div>
                        <div className="pt-2 mt-2 text-sm text-center text-muted-foreground">
                            Created by Isep Hidayatulloh, Pandu Dwi, Muhamad Raihan Nurhidayat
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function Check(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
