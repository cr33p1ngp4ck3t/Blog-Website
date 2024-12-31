import Card from "./card";

export default function Content() {
    return (
        <div className="p-5 px-20 w-full">
            <div className="flex justify-center items-center h-full">
                <div className="w-4/5 h-full flex flex-col gap-5">
                    <div className="p-6 rounded-lg w-full bg-slate-700/30 text-white">
                        <div className="text-2xl font-bold">Posts</div>
                    </div>
                    <div className="flex justify-center items-center p-6 rounded-lg w-full bg-slate-700/30">

                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
}