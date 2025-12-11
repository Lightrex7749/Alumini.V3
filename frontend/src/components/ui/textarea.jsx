import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 dark:text-white shadow-sm transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 dark:focus-visible:ring-blue-400/30 focus-visible:border-blue-500 dark:focus-visible:border-blue-400 focus-visible:shadow-lg focus-visible:shadow-blue-500/10 dark:focus-visible:shadow-blue-400/20 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 resize-none transform focus-visible:scale-[1.01]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };