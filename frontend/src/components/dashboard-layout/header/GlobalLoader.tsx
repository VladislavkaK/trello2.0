'use client'

import { useIsMutating, useIsFetching } from "@tanstack/react-query";
import Loader from "@/components/ui/Loader";

export function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return isFetching || isMutating ? (
    <div className="fixed top-layout right-layout z-50">
      <Loader />
    </div>
  ) : null;
};
