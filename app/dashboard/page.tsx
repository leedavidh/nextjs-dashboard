// import { Card } from "@/app/ui/dashboard/cards";
import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";

// Page is an async component. This allows you to use await to fetch data.
export default async function Page() {
  // issue: request waterfall. revenue -> latestInvoices -> cardData
  // (streaming the whole page)

  // Fix: stream the <RevenueChart /> and <LatestInvoices /> components
  //   more granular and stream specific components using React Suspense
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  // // In general, it's good practice to move your data fetches down to the components that need it,
  //  and then wrap those components in Suspense.
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}

/*

By moving data fetching down to the components that need it, you can create more granular Suspense boundaries. 
This allows you to stream specific components and prevent the UI from blocking.

*/
