import { Skeleton } from "@nextui-org/react";

export default function PostSkeleton() {
  return (
    <div className="w-[100%] flex gap-y-4 bg-white shadow-xl px-2 py-2 rounded-md flex-col">
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>

      <Skeleton className="rounded">
        <div className="h-[200px] rounded-md bg-slate-800"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-md">
          <div className="h-3 w-3/5 rounded-md bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-md">
          <div className="h-3 w-4/5 rounded-md bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-md">
          <div className="h-3 w-2/5 rounded-md bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}
