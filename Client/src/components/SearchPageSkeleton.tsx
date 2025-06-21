
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from './ui/aspect-ratio';


function SearchPageSkeleton() {
    return (
        <Card className="w-[300px] overflow-hidden rounded-md shadow-2xl pt-6 pb-0 animate-pulse">
            <div className="relative">
                <AspectRatio ratio={16 / 9}>
                    <div className="size-full bg-gray-300 rounded-md" />
                </AspectRatio>
                <div className="absolute top-1 left-1 bg-white/65 rounded-md px-2 py-1 text-sm text-gray-500">
                    <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
            </div>

            <CardContent className="flex flex-col gap-2">
                <div className="h-6 bg-gray-300 rounded w-3/4" />

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>

                <div className="flex gap-2 flex-wrap mt-1">
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="h-6 w-16 bg-gray-300 rounded-md" />
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
                <div className="h-10 w-24 bg-gray-300 rounded-full" />
            </CardFooter>
        </Card>

    )
}

export default SearchPageSkeleton
