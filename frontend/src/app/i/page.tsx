import type { Metadata } from "next";

import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Heading } from "@/components/ui/Heading";
import Statictics from "./Statictics";

export const metadata: Metadata = {
  title: 'Statictics',
  ...NO_INDEX_PAGE
};

const DashboardPage = () => {
  return (
    <div>
      <Heading title="Statistics" />
      <Statictics />
    </div>
  );
};

export default DashboardPage;
