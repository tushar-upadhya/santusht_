"use client";

import { ContactRequestColumns } from "@/components/admin/contact-request/ContactRequestColumns";
import { DataTable } from "@/components/admin/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRType } from "@/lib/types/qrType";
import { useEffect, useState } from "react";

async function fetchData(type: string): Promise<QRType[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array(Math.floor(Math.random() * 20) + 1)
                .fill({
                    userDetails: "John Doe",
                    contact: "john.doe@example.com",
                    requestedOn: "2024-11-15",
                    concern: `${type} Request`,
                    remarks: "Pending review",
                    refNO: "123456",
                })
                .map((item, index) => ({
                    ...item,
                    serialNumber: index + 1,
                }));
            resolve(data);
        }, 1500);
    });
}

const ContactRequestPage = () => {
    const [tabData, setTabData] = useState<QRType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("new");
    const [counts, setCounts] = useState({
        new: 0,
        closed: 0,
    });

    useEffect(() => {
        handleTabChange("new");
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setLoading(true);

        fetchData(tab).then((data) => {
            setTabData(data);
            setLoading(false);
            setCounts((prev) => ({ ...prev, [tab]: data.length }));
        });
    };

    return (
        <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 container mx-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <TabsList className="flex flex-wrap gap-2 mb-4 sm:mb-0 sm:flex-row sm:gap-4">
                        {["new", "closed"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="w-full sm:w-auto px-6 bg-primary/20"
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {loading ? (
                                    <Skeleton className="ml-1 h-4 w-6 rounded-full" />
                                ) : (
                                    <Badge className="ml-1 rounded-full px-3">
                                        {counts[tab as keyof typeof counts]}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="mt-10 overflow-x-auto">
                    {loading ? (
                        <div className="space-y-2">
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-12 w-full rounded-md mt-auto"
                                    />
                                ))}
                        </div>
                    ) : (
                        <DataTable
                            columns={ContactRequestColumns}
                            data={tabData}
                        />
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default ContactRequestPage;
