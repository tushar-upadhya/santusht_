"use client";

import { columns, Employee } from "@/components/admin/table/columns";
import { DataTable } from "@/components/admin/table/data-table";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import RaiseGrievanceForm from "@/components/forms/raise-grievance-form/RaiseGrievanceForm";
import Logo from "@/components/header/logo/Logo";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

async function fetchData(type: string): Promise<Employee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array(Math.floor(Math.random() * 20) + 1)
                .fill({
                    refNo: "EMP003",
                    location: "New York",
                    description: `${type} Task`,
                    lastUpdate: "2024-11-15",
                })
                .map((item, index) => ({
                    ...item,
                    serialNumber: index + 1,
                }));
            resolve(data);
        }, 1500);
    });
}

const DashboardPage = () => {
    const [tabData, setTabData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("new");
    const [counts, setCounts] = useState({
        new: 0,
        active: 0,
        closed: 0,
        verified: 0,
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
                        {["new", "active", "closed", "verified"].map((tab) => (
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

                    <div className="sm:mt-4 lg:mt-0 w-full sm:w-auto mt-[7rem]">
                        <DialogForm
                            title="SANTUSHT"
                            description="Your well-being is our priority."
                            formComponent={<RaiseGrievanceForm />}
                            buttonLabel="Raise Grievance"
                            logo={<Logo />}
                            location="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                        />
                    </div>
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
                        <DataTable columns={columns} data={tabData} />
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default DashboardPage;
