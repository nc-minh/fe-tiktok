import { useGetPostTrends } from 'queries/post';

const useFetchPostTrends = ({ pageSize = 10, currentPage = 0 }) => {
  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetPostTrends({
      pageSize,
      currentPage,
    });

  return {
    data,
    fetchNextPage,
    isLoading: isLoading || isFetchingNextPage,
  };
};

export default useFetchPostTrends;
