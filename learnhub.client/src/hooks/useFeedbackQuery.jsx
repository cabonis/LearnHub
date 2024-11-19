import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import useAlertSnack from "./useAlertSnack";

const useFeedbackQuery = () => {

    const navigate = useNavigate();
    const [AlertSnack, showAlert] = useAlertSnack();

    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                // Not Found
                if (error.status === 404) {
                    navigate('/notfound');
                }
                else {
                    showAlert(`API Error: ${error}`);
                }
            },
        }),
        mutationCache: new MutationCache({
            onError: (error, _, __, mutation) => {
                const { mutationKey } = mutation.options;
                showAlert(`API Mutation Error ${error} ${mutationKey ? `: ${mutation}` : ""}`)
            },
        }),
    });

    return { QueryFeedback: AlertSnack, queryClient };
};

export default useFeedbackQuery;