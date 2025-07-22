import type { QueryObserverResult } from "@tanstack/react-query";

type RefetchOptions = {
  throwOnError?: boolean;
  cancelRefetch?: boolean;
};

export type RefetchFunction<TQueryFnData, TError> = (
  options?: RefetchOptions
) => Promise<QueryObserverResult<TQueryFnData, TError>>;
