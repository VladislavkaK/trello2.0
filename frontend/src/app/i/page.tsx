import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
  title: 'Dashboard',
  ...NO_INDEX_PAGE
};

const DashboardPage = () => {
  return (
    <div>DashboardPage</div>
  );
};

export default DashboardPage;
