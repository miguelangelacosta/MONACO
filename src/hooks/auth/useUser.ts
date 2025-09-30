import { useQuery } from '@tanstack/react-query';
import { getSession } from '../../actions';

export const useUser = () => {
	const { data, isLoading: queryLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getSession,
		retry: false,
		refetchOnWindowFocus: true,
	});

	// Mientras la consulta no haya respondido, consideramos que está cargando
	const isLoading = queryLoading || data === undefined;

	return {
		session: data?.session ?? null,
		isLoading,
	};
};
