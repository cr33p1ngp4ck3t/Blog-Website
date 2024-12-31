import Link from "next/link";

export default function Header() {
    return (
        <div className="p-5 px-20 w-full bg-slate-800 text-white">
            <div className="flex justify-between items-center ">
                <div className="text-2xl font-bold"><Link href="/">Blog</Link></div>
                <div>
                    <div className="flex gap-5 ">
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}