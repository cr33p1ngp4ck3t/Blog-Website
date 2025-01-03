import Card from "./card";

export default function Content() {
    return (
        <div className="p-5 lg:px-[5%] md:w-full ">
            <div className="flex justify-center items-center h-full">
                <div className="max-w-5xl h-full flex flex-col gap-5">
                    <div className="flex flex-col p-6 rounded-lg w-full bg-[#dfeff930] dark:bg-[#10131830]">
                        <div className="text-2xl font-bold dark:text-[#dfeff9]">Posts</div>
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
}