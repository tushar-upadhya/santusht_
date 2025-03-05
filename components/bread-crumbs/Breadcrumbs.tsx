import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    return (
        <div className="flex justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    {segments.map((segment, index) => {
                        const route = `/${segments
                            .slice(0, index + 1)
                            .join("/")}`;
                        const formattedSegment = segment.replace(/-/g, " ");

                        return (
                            <React.Fragment key={route}>
                                <BreadcrumbItem>
                                    {index === segments.length - 1 ? (
                                        <BreadcrumbPage className="font-semibold capitalize rounded-full underline underline-offset-4 dark:text-primary">
                                            {formattedSegment}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={route}>
                                            {formattedSegment}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < segments.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
