import '../../src/styles/pages/ResultPage.scss'
import React, { useContext, useEffect, useMemo } from 'react'
import Loading from '../components/Loading';
import Message from '../components/Message';
import { AppContext } from '../stores/App';
import { actions, context } from '../stores/ResultPage';
import { helper } from '../utils/helper';
import ResultTable from '../components/ResultTable'
import CommentPerStock from '../components/CommentPerStock'
import ComparisonChart from '../components/ComparisonChart';

export default function ResultPage() {
    const { state, dispatch } = useContext(context);
    const { resultData, selectedStock, loading, error } = state
    const { state: AppState } = useContext(AppContext);
    const { user } = AppState;

    useEffect(() => {
        if (user.id) {
            const fetchPlanPageData = async () => {
                const fetchedResult = await helper.fetchData(`/api/fetch_result`, dispatch, actions, {
                    user_id: user.id
                })
                if (fetchedResult?.length > 0) {
                    dispatch({ type: actions.SET_RESULT, payload: fetchedResult });
                    dispatch({ type: actions.SET_SELECTED_STOCK, payload: fetchedResult[0] })
                }
            }
            fetchPlanPageData()
        }
    }, [user.id]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedStock) {
                const fetchedStocks = await helper.fetchData(`/api/fetch_one_latest_stock`, dispatch, actions, { code: selectedStock.code })
                if (fetchedStocks) dispatch({ type: actions.SET_INDICATORS, payload: fetchedStocks });
            }
        }
        fetchData()
    }, [selectedStock])

    const profitResult = useMemo(() => {
        return resultData
            .map((result) => { return result.total_profit_loss })
            .reduce((a, x) => a += x, 0);
    }, [resultData])


    if (loading) return <Loading />
    if (error) return <Message variant="error">{error}</Message>
    return (
        <div className="result_page">
            <div className="main">
                <div className="profit_result">
                    <ul><li>今日の損益額 {profitResult}円</li></ul>
                </div>
                <div className="dashboard_container">
                    {resultData.length > 0 && <ResultTable />}
                    <div className="left_col">
                        {selectedStock && (<ComparisonChart />)}
                    </div>
                    <div className="right_col">
                        <CommentPerStock />
                    </div>
                </div>
            </div>
        </div>
    )
}
